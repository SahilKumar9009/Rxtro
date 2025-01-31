import React, {useEffect, useState} from 'react';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useWindowDimensions} from 'react-native';
import ClinicDetailCard from '../../components/ClinicDetailCard';
import CommonHeader from '../../components/CommonHeader';
import ParticipantDoctorCard from '../../components/ParticipantDoctorCard';
import ReUsableButton from '../../components/ReUsableButton';
import {blueColor, FONT_SIZE, isTablet, USER_ID} from '../../constants';
import {
  MyTerritoryDetailMainContainer,
  MyTerritoryHeadingWrapper,
  MyTerritoryDetailHeading,
  NotificationIconWrapper,
  NotifiationIconText,
  MyTerritoryDetailText,
  MyTerritoryDetailBoldText,
  MyTerritoryDetailInfoWrapper,
  MyTerritoryDetailButtonWrapper,
  MyTerritoryDetailBottomContainer,
} from './styled';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert, Platform, ScrollView, View} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import ManageNotificationModal from '../../components/ManageNotificationModal';
import {
  getAvailableAppointments,
  getAvailableAppointmentsLoading,
} from '../../actions';
import LoadingIndicator from '../../components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

type Props = {
  onPress?: () => void;
  route: any;
};

const MyTerritoryDetailScreen: React.FC<Props> = props => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch<TypedDispatch>();
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const detailsObject = useSelector(
    (state: any) => state.getSurgeryDetailReducer,
  );
  const details = detailsObject.surgeryDetail;
  const detailsFailed = detailsObject.failed;
  const requireBack = props.route.params.requireBack;
  // ! have to get this from redux
  const territoryId = useSelector(
    (state: any) => state.storeIdReducer.territoryId,
  );
  const globalLoading = useSelector(
    (state: any) => state.storeIdReducer.globalLoading,
  );

  const handleOnPress = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const isEmpty = Object.keys(details)?.length;
    if (isEmpty === 0 || !Array.isArray(details.participants)) {
      return;
    }
  }, [details]);

  const onViewAvailability = async () => {
    if (details?.participants.length === 0) {
      Alert.alert('No Appointments', 'There are no appointments available.');
      return;
    }
    const userId = await AsyncStorage.getItem(USER_ID);
    dispatch(
      getAvailableAppointments({territoryId: territoryId, drugRepId: userId}),
    );
    dispatch(getAvailableAppointmentsLoading());
    navigation.navigate('ViewAvailabilityScreen', {
      title: details?.surgeryName,
    });
  };

  if (detailsFailed) {
    Platform.OS === 'ios'
      ? Platform.isPad
        ? null
        : navigation.goBack()
      : isTablet
      ? null
      : navigation.goBack();
    // navigation.goBack();
    // ! issue in this
    // Alert.alert('Message', 'Sorry, unexpected error!');
    return null;
  }

  if (globalLoading) {
    return (
      <View
        style={{
          flex: 1,
          marginBottom:
            Platform.OS === 'ios'
              ? Platform.isPad
                ? requireBack
                  ? 0
                  : 250
                : 0
              : isTablet
              ? requireBack
                ? 0
                : 250
              : 0,
        }}>
        <LoadingIndicator />
      </View>
    );
  }
  return (
    <>
      {Platform.OS === 'ios' ? (
        Platform.isPad ? (
          requireBack ? (
            <CommonHeader
              clinicName={details?.surgeryName}
              clinicAddress={details['surgery-address-street1']}
            />
          ) : null
        ) : (
          <CommonHeader
            clinicName={details?.surgeryName}
            clinicAddress={details['surgery-address-street1']}
          />
        )
      ) : isTablet ? (
        requireBack ? (
          <CommonHeader
            clinicName={details?.surgeryName}
            clinicAddress={details['surgery-address-street1']}
          />
        ) : null
      ) : (
        <CommonHeader
          clinicName={details?.surgeryName}
          clinicAddress={details['surgery-address-street1']}
        />
      )}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{height: height}}>
        <MyTerritoryDetailMainContainer>
          <MyTerritoryHeadingWrapper>
            <MyTerritoryDetailHeading>
              {'Clinic Confirmation\nInformation'}
            </MyTerritoryDetailHeading>
            <NotificationIconWrapper
              onPress={handleOnPress}
              activeOpacity={0.7}>
              <Material
                name="bell-outline"
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f10
                      : FONT_SIZE.f16
                    : isTablet
                    ? FONT_SIZE.f10
                    : FONT_SIZE.f16
                }
                color={blueColor}
              />
              <NotifiationIconText>Notifications</NotifiationIconText>
            </NotificationIconWrapper>
          </MyTerritoryHeadingWrapper>
          <MyTerritoryDetailText>
            {details['surgery-comments']}
          </MyTerritoryDetailText>
          <MyTerritoryDetailInfoWrapper>
            <MyTerritoryDetailBoldText>Place</MyTerritoryDetailBoldText>
            <ClinicDetailCard
              clinicName={details.surgeryName}
              clinicAddress={details['surgery-address-street1']}
              clinicPhoneNumber={details['surgery-phone']}
            />
          </MyTerritoryDetailInfoWrapper>
          <MyTerritoryDetailBoldText>Participants</MyTerritoryDetailBoldText>
          <MyTerritoryDetailInfoWrapper>
            {details &&
              details?.participants.map(item => (
                <View key={item.doctorId}>
                  <ParticipantDoctorCard
                    doctorName={item.doctorName}
                    desgination={item.diet_data}
                    contribution={item.contribution}
                  />
                </View>
              ))}
            <MyTerritoryDetailButtonWrapper
              onPress={onViewAvailability}
              activeOpacity={0.7}>
              <ReUsableButton title="View Availability" />
            </MyTerritoryDetailButtonWrapper>
          </MyTerritoryDetailInfoWrapper>
        </MyTerritoryDetailMainContainer>
      </ScrollView>
      {/* <MyTerritoryDetailBottomContainer
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}>
        <MyTerritoryDetailButtonWrapper
          onPress={onViewAvailability}
          activeOpacity={0.7}>
          <ReUsableButton title="View Availability" />
        </MyTerritoryDetailButtonWrapper>
      </MyTerritoryDetailBottomContainer> */}
      <ManageNotificationModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        territoryId={territoryId}
      />
    </>
  );
};

export default MyTerritoryDetailScreen;

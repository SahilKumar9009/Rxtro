import React, {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  View,
  Linking,
  Alert,
} from 'react-native';
import ClinicDetailCard from '../../components/ClinicDetailCard';
import CommonHeader from '../../components/CommonHeader';
import ParticipantDoctorCard from '../../components/ParticipantDoctorCard';
import ReUsableButton from '../../components/ReUsableButton';
import TouchableCard from '../../components/TouchableCard';
import {
  AppointmentDetailScreenCardContainer,
  AppointmentScreenInfoContainer,
  AppointmentDetailHeading,
  AppointmentDetailInfoText,
  AppointmentDetailParticipantWrapper,
  AppointmentDetailParticipantHeading,
  AppointmentDetailPlaceWrapper,
  AppointmentDetailPlaceHeading,
  AppointmentDetailBottomContainer,
  AppointmentDetailButtonWrapper,
} from './styled';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import SwapModal from '../../components/SwapModal';
import TransferModal from '../../components/TransferModal';
import {REDUCER, isTablet} from '../../constants';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {
  getAppointmentInfo,
  postCancelAppointment,
  postCancelAppointmentLoading,
  postConfirmAppointment,
  postConfirmAppointmentLoading,
  postShowSwapAppointment,
} from '../../actions';
import LoadingIndicator from '../../components/LoadingIndicator';
import postCancelApp from '../../apiActions/AppointmentScreen/postCancelApp';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

type Props = {
  route?: any;
};

const AppointmentDetailScreen: React.FC<Props> = props => {
  const {height, width} = useWindowDimensions();
  const dispatch = useDispatch<TypedDispatch>();
  const details = useSelector(
    (state: any) => state.getAppointmentInfoReducer.appointmentInfo,
  );
  // ! will have to replace these with redux variables /////////////
  const appointmentDetails = useSelector(
    (state: any) => state.storeIdReducer.appointmentDetails,
  );
  // ! /////////////////////////////////////////////////////////////
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [isSwapModalVisible, setSwapModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);
  const cancelAppResponse = useSelector(
    (state: any) => state.postCancelAppointmentReducer.response,
  );
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const [pressed, setPressed] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (appointmentDetails?.id) {
      setLoading(true);
      dispatch(getAppointmentInfo({appId: appointmentDetails?.id}));
      dispatch(
        postShowSwapAppointment({
          appId: appointmentDetails?.id,
          sizeResult: 10,
        }),
      );
    }
  }, [appointmentDetails?.id]);

  useEffect(() => {
    setLoading(false);
  }, [details.surgeryName]);

  const onCallPress = () => {
    Linking.openURL(`tel:${details['surgery-phone']}`);
  };

  const toggleSwapModal = () => {
    setSwapModalVisible(true);
  };

  // Display Push Notification
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
  }

  const cancelAppointment = async () => {
    setPressed(true);
    dispatch(
      postCancelAppointment({
        appId: appointmentDetails?.id,
        appointmentDetails,
      }),
    );

    dispatch(postCancelApp( userData?.userId,appointmentDetails?.id))
    // dispatch(postCancelAppointmentLoading());
  };

  const onCancel = () => {
    Alert.alert(
      'Cancel Apppointment',
      'Are you sure you want to cancel this Appointment?',
      [
        {
          text: 'YES',
          onPress: () => {
            cancelAppointment();
          },
        },
        {
          text: 'NO',
          style: 'cancel',
        },
      ],
    );
  };

  useEffect(() => {
    if (cancelAppResponse['internal-code'] === 400 && pressed) {
      setPressed(false);
      Alert.alert('Message', 'Appointment cannot be canceled', [
        {
          text: 'OK',
          onPress: () => {
            setPressed(false);
            Platform.OS === 'ios'
              ? Platform.isPad
                ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                : navigation.goBack()
              : isTablet
              ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
              : navigation.goBack();
          },
        },
      ]);
    } else if (cancelAppResponse['internal-code'] === 200 && pressed) {
      setPressed(false);
      Alert.alert('Message', 'Appointment is canceled', [
        {
          text: 'OK',
          onPress: () => {
            setCancelled(true);
            if (!cancelled) {
              onDisplayNotification();
            }
            Platform.OS === 'ios'
              ? Platform.isPad
                ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                : navigation.navigate('AppointmentScreen', {
                    screen: 'Appointment',
                  })
              : isTablet
              ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
              : navigation.navigate('AppointmentScreen', {
                  screen: 'Appointment',
                });
          },
        },
      ]);
    }
    dispatch({type: 'POST_CANCEL_APPOINTMENT_CLEAR'});
  }, [Object.keys(cancelAppResponse).length]);

  useEffect(() => {
    const isEmpty = Object.keys(details).length;
    if (isEmpty === 0) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [details]);

  const onConfirm = () => {
    Alert.alert('Message', 'Appointment Confirmed', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(
            postConfirmAppointment({
              appId: appointmentDetails?.id,
              appointmentDetails,
            }),
          );
          // dispatch(postConfirmAppointmentLoading());
          Platform.OS === 'ios'
            ? Platform.isPad
              ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
              : navigation.navigate('AppointmentScreen')
            : isTablet
            ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
            : navigation.navigate('AppointmentScreen');
        },
      },
    ]);
  };

  if (loading || pressed) {
    return (
      <>
        {(Platform.OS === 'ios' && Platform.isPad) || isTablet ? null : (
          <CommonHeader
            time={appointmentDetails?.time}
            clinicName={details.surgeryName}
            clinicAddress={details['surgery-address-street1']}
            suburb={details['surgery-address-suburb']}
          />
        )}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      {Platform.OS === 'ios' ? (
        Platform.isPad ? null : (
          <CommonHeader
            appointmentStatus={
              appointmentDetails?.status === 1
                ? 'Made'
                : appointmentDetails?.status === 2 ||
                  appointmentDetails?.status === 3 ||
                  appointmentDetails?.status === 4
                ? 'Confirmed'
                : 'Confirming'
            }
            time={appointmentDetails?.time}
            clinicName={details.surgeryName}
            clinicAddress={details['surgery-address-street1']}
            suburb={details['surgery-address-suburb']}
          />
        )
      ) : isTablet ? null : (
        <CommonHeader
          appointmentStatus={
            appointmentDetails?.status === 1
              ? 'Made'
              : appointmentDetails?.status === 2 ||
                appointmentDetails?.status === 3 ||
                appointmentDetails?.status === 4
              ? 'Confirmed'
              : 'Confirming'
          }
          time={appointmentDetails?.time}
          clinicName={details.surgeryName}
          clinicAddress={details['surgery-address-street1']}
          suburb={details['surgery-address-suburb']}
        />
      )}
      {appointmentDetails?.buttonTitle && (
        <AppointmentDetailScreenCardContainer
          style={{
            shadowColor: '#171717',
            shadowOffset: {height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 10,
          }}>
          <TouchableOpacity
            style={{width: '33%'}}
            onPress={onCallPress}
            activeOpacity={0.7}>
            <TouchableCard title="Call" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleSwapModal}
            style={{width: '33%'}}
            activeOpacity={0.7}>
            <TouchableCard title="Swap" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '34%'}}
            onPress={onCancel}
            activeOpacity={0.7}>
            <TouchableCard title="Cancel" />
          </TouchableOpacity>
        </AppointmentDetailScreenCardContainer>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white', height: height}}>
        <AppointmentScreenInfoContainer>
          {/* {cancelAppLoading && <LoadingIndicator />} */}
          <AppointmentDetailHeading>
            Clinic Confirmation Information
          </AppointmentDetailHeading>
          <AppointmentDetailInfoText>
            {details['surgery-comments']}
          </AppointmentDetailInfoText>
        </AppointmentScreenInfoContainer>
        <AppointmentDetailParticipantWrapper>
          <AppointmentDetailParticipantHeading>
            Participants
          </AppointmentDetailParticipantHeading>
          {details.participants?.map(item => (
            <View key={item.doctorName}>
              <ParticipantDoctorCard
                doctorName={item.doctorName}
                contribution={item.percent}
                desgination={item.diet_date}
              />
            </View>
          ))}
        </AppointmentDetailParticipantWrapper>
        <AppointmentDetailPlaceWrapper>
          <AppointmentDetailPlaceHeading>Place</AppointmentDetailPlaceHeading>
          <ClinicDetailCard
            suburb={details['surgery-address-suburb']}
            clinicAddress={details['surgery-address-street1']}
            clinicName={details.surgeryName}
            clinicPhoneNumber={details['surgery-phone']}
          />
        </AppointmentDetailPlaceWrapper>
      </ScrollView>
      <SwapModal
        isVisible={isSwapModalVisible}
        dateTime={new Date().toLocaleString()}
        onBackdropPress={() => setSwapModalVisible(false)}
        appId={appointmentDetails?.id}
      />
      <TransferModal
        isVisible={isTransferModalVisible}
        onBackdropPress={() => setTransferModalVisible(false)}
      />
      {appointmentDetails?.buttonTitle && (
        <AppointmentDetailBottomContainer>
          <AppointmentDetailButtonWrapper
            onPress={onConfirm}
            activeOpacity={0.7}>
            <ReUsableButton title={appointmentDetails?.buttonTitle} />
          </AppointmentDetailButtonWrapper>
        </AppointmentDetailBottomContainer>
      )}
    </>
  );
};

export default AppointmentDetailScreen;

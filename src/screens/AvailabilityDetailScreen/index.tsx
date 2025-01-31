import React, {useEffect, useState} from 'react';
import {
  AvailabilityDetailScreenMainContainer,
  AvailabilityDetailInnerContainer,
  AvailabilityDetailScreenPrimaryText,
  AvailabiltyDetailTouchableWrapper,
  AvailabiltyDetailBottomContainer,
  AvailabiltyDetailTouchableText,
} from './styled';
import ParticipantDoctorCard from '../../components/ParticipantDoctorCard';
import CommonHeader from '../../components/CommonHeader';
import {Alert, ScrollView, View} from 'react-native';
import ConfirmSwapModal from '../../components/ConfirmSwapModal';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import LoadingIndicator from '../../components/LoadingIndicator';
import {getAvailableAppointmentInfo, postTakeAppointment} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ID} from '../../constants';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const AvailabilityDetailScreen = props => {
  const dispatch = useDispatch<TypedDispatch>();
  const unformattedDate = props.route.params.unformattedDate;
  const scheduleId = props.route.params.scheduleId;
  const isSwappable = props.route.params.isSwappable;
  const surgeryId = props.route.params.surgeryId;
  const clinicName = props.route.params.clinicName;
  const location = props.route.params.location;
  const currentAppId = props.route.params.currentAppId;
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const appointmentDetail = useSelector(
    (state: any) => state.getAvailableAppointmentInfoReducer.appointmentDetail,
  );
  const [loading, setLoading] = useState(true);
  const [isConfirmSwapModalVisible, setConfirmSwapModalVisible] =
    useState(false);

  // takeApp reducer
  const takeAppResponseObject = useSelector(
    (state: any) => state.postTakeAppointmentReducer,
  );
  const takeAppResponse = takeAppResponseObject.response;
  const takeAppResponseLoading = takeAppResponseObject.loading;

  // swapApp reducer
  const swapAppResponseObject = useSelector(
    (state: any) => state.postSwapAppointmentReducer,
  );
  const swapAppResponse = swapAppResponseObject.swapResponse;
  const [pressed, setPressed] = useState(false);
  const dateTimeSeprator = (dateTimeString: string) => {
    const indexOfSpace = dateTimeString?.indexOf(' ');
    const date = dateTimeString?.slice(0, indexOfSpace);
    const time = dateTimeString?.slice(indexOfSpace, dateTimeString?.length);
    const [day, month, year] = date.split('/');
    const formatedDate = new Date(+year, Number(month) - 1, +day);
    const strFormatedDate = formatedDate.toDateString();
    const [weekDay, monthName, dayNumber, yearNumber] =
      strFormatedDate.split(' ');
    return {
      weekDay: weekDay,
      day: dayNumber,
      month: monthName,
      year: yearNumber,
      time: time,
      formatedDate: formatedDate,
    };
  };

  const toggleConfirmSwapModal = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    setPressed(true);
    setConfirmSwapModalVisible(true);
    if (!isSwappable) {
      dispatch(
        postTakeAppointment({
          appDate: unformattedDate,
          surgeryId: surgeryId.toString(),
          scheduleId: scheduleId.toString(),
          drugRepId: userId,
        }),
      );
      return;
    }
  };

  useEffect(() => {
    if (
      takeAppResponse['internal-code'] === 200 &&
      !takeAppResponseLoading &&
      pressed
    ) {
      Alert.alert('Great', 'You took the appointment', [
        {
          text: 'OK',
          onPress: () => {
            setPressed(false);
            navigation.navigate('AppointmentScreen', {screen: 'Appointment'});
          },
        },
      ]);
    } else if (takeAppResponse['internal-code'] === 400 && pressed) {
      Alert.alert(
        'Appointment Not Taken',
        'You already have a appointment within half an hour',
        [
          {
            text: 'OK',
            onPress: () => {
              setPressed(false);
              navigation.navigate('AppointmentScreen', {screen: 'Appointment'});
            },
          },
        ],
      );
    } else if (swapAppResponse['internal-code'] === 200 && pressed) {
      Alert.alert('Great', 'Appointment is swapped', [
        {
          text: 'OK',
          onPress: () => {
            setPressed(false);
            navigation.navigate('AppointmentScreen', {screen: 'Appointment'});
          },
        },
      ]);
    } else if (swapAppResponse['internal-code'] === 400 && pressed) {
      Alert.alert('Sorry', 'Appointment cannot be swapped', [
        {
          text: 'OK',
          onPress: () => {
            setPressed(false);
            navigation.navigate('AppointmentScreen', {screen: 'Appointment'});
          },
        },
      ]);
    }
  }, [takeAppResponse, swapAppResponse]);

  useEffect(() => {
    if (takeAppResponseLoading) {
      return;
    }
  }, [takeAppResponseLoading]);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem(USER_ID);
      dispatch(
        getAvailableAppointmentInfo({
          scheduleId: scheduleId,
          appDate: unformattedDate,
          drugRepId: userId,
          isSwappable: isSwappable,
        }),
      );
    })();
  }, []);

  const formmatedDate = dateTimeSeprator(unformattedDate);

  useEffect(() => {
    const isEmpty = Object.keys(appointmentDetail)?.length;
    if (isEmpty === 0 || !Array.isArray(appointmentDetail.participants)) {
      return;
    }
    setLoading(false);
  }, [appointmentDetail]);

  if (loading || takeAppResponseLoading) {
    return (
      <>
        <CommonHeader
          date={`${formmatedDate.day} ${formmatedDate.month} ${formmatedDate.year}`}
          time={formmatedDate.time}
          clinicName={clinicName}
          clinicAddress={location}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }
  const currentAppDate =
    isSwappable && dateTimeSeprator(appointmentDetail['current-appointment']);

  return (
    <>
      <CommonHeader
        date={`${formmatedDate.day} ${formmatedDate.month} ${formmatedDate.year}`}
        time={formmatedDate.time}
        clinicName={clinicName}
        clinicAddress={location}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <AvailabilityDetailScreenMainContainer
          style={{
            shadowColor: '#171717',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}>
          <AvailabilityDetailScreenPrimaryText>
            Participants
          </AvailabilityDetailScreenPrimaryText>
          <AvailabilityDetailInnerContainer>
            {appointmentDetail.participants.map(item => (
              <View key={item.doctorName}>
                <ParticipantDoctorCard
                  doctorName={item.doctorName}
                  desgination={item.diet_data}
                  contribution={item.percent}
                />
              </View>
            ))}
          </AvailabilityDetailInnerContainer>
        </AvailabilityDetailScreenMainContainer>
      </ScrollView>
      <AvailabiltyDetailBottomContainer
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}>
        <AvailabiltyDetailTouchableWrapper
          onPress={toggleConfirmSwapModal}
          activeOpacity={0.7}>
          <AvailabiltyDetailTouchableText>
            {isSwappable ? 'Swap' : 'Take'}
          </AvailabiltyDetailTouchableText>
        </AvailabiltyDetailTouchableWrapper>
      </AvailabiltyDetailBottomContainer>
      {isSwappable ? (
        <ConfirmSwapModal
          isVisible={isConfirmSwapModalVisible}
          onBackdropPress={() => setConfirmSwapModalVisible(false)}
          currentAppId={currentAppId}
          surgeryName={appointmentDetail.surgeryName}
          surgeryAddress={appointmentDetail['surgery-address-street1']}
          currentAppDay={currentAppDate.day}
          currentAppMonth={currentAppDate.month}
          currentAppTime={currentAppDate.time}
          selectedDay={formmatedDate.day}
          selectedMonth={formmatedDate.month}
          selectedTime={formmatedDate.time}
          selectedDate={unformattedDate}
        />
      ) : null}
    </>
  );
};

export default AvailabilityDetailScreen;

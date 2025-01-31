import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Alert, Platform} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONT_SIZE, REDUCER, isTablet} from '../../constants';
import AvailabilityCard from '../AvailabilityCard';
import LoadingIndicator from '../LoadingIndicator';
import ReUsableButton from '../ReUsableButton';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  SwapModalMainContainer,
  SwapModalInnerContainer,
  SwapModalHeader,
  SwapModalHeadingText,
  SwapModalSubHeadingContainer,
  SwapModalSubHeadingText,
  SwapModalBodyWrapper,
  SwapModalButtonWrapper,
} from './styled';
import {postSwapAppointment} from '../../actions';

type Props = {
  isVisible: boolean;
  dateTime: string;
  onBackdropPress: () => void;
  appId: string;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const SwapModal: React.FC<Props> = ({
  isVisible,
  dateTime,
  onBackdropPress,
  appId,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<TypedDispatch>();
  const swapableAppointmentsObject = useSelector(
    (state: any) => state.postShowSwapAppointmentReducer,
  );
  const swapableAppointments = swapableAppointmentsObject.appointments.result;
  const [loading, setLoading] = useState(
    !Array.isArray(swapableAppointments) ? true : false,
  );
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const swapAppointmentObject = useSelector(
    (state: any) => state.postSwapAppointmentReducer,
  );
  const swapAppointmentResponse = swapAppointmentObject.swapResponse;
  const [swapPressed, setSwapPressed] = useState(false);

  const onSwap = () => {
    setSwapPressed(true);
    dispatch(
      postSwapAppointment({appDateSelected: selectedDate, appId: appId}),
    );
    onBackdropPress();
  };

  useEffect(() => {
    if (Object.keys(swapAppointmentResponse).length > 0) {
      if (swapAppointmentResponse['internal-code'] === 200 && swapPressed) {
        Alert.alert('Great', 'Appointment is swapped', [
          {
            text: 'OK',
            onPress: () =>
              Platform.OS === 'ios'
                ? Platform.isPad
                  ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                  : navigation.goBack()
                : isTablet
                ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                : navigation.goBack(),
          },
        ]);
        setSwapPressed(false);
      } else if (
        swapAppointmentResponse['internal-code'] === 400 &&
        swapPressed
      ) {
        Alert.alert('Sorry', 'Appointment cannot be swapped', [
          {
            text: 'OK',
            onPress: () =>
              Platform.OS === 'ios'
                ? Platform.isPad
                  ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                  : navigation.goBack()
                : isTablet
                ? dispatch({type: REDUCER.CLEAR_APPOINTMENT_DETAILS})
                : navigation.goBack(),
          },
        ]);
        setSwapPressed(false);
      }
    }
  }, [swapAppointmentResponse]);

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

  useEffect(() => {
    if (!Array.isArray(swapableAppointments)) {
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [swapableAppointments]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <LoadingIndicator /> */}
      </View>
    );
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.6}
        onBackdropPress={onBackdropPress}>
        <SwapModalMainContainer>
          <SwapModalInnerContainer>
            <SwapModalHeader
              style={{
                shadowColor: '#171717',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}>
              <SwapModalHeadingText>
                Swap appointment with...
              </SwapModalHeadingText>
              <TouchableOpacity onPress={onBackdropPress}>
                <Icon
                  name="close-circle-outline"
                  size={FONT_SIZE.f18}
                  color="black"
                />
              </TouchableOpacity>
            </SwapModalHeader>
          </SwapModalInnerContainer>
          <SwapModalSubHeadingContainer>
            <SwapModalSubHeadingText>
              Current Appointment Date: {dateTime}
            </SwapModalSubHeadingText>
          </SwapModalSubHeadingContainer>
          <SwapModalBodyWrapper showsVerticalScrollIndicator={false}>
            {swapableAppointments &&
              swapableAppointments?.map(item => {
                const formattedDate = dateTimeSeprator(item.date);
                return (
                  <TouchableOpacity style={{marginBottom: 20}} key={item.date}>
                    <AvailabilityCard
                      clinicName={item.surgeryName}
                      location={item['surgery-address-suburb']}
                      time={`${formattedDate.day} ${formattedDate.month} - ${formattedDate.time}`}
                      needCheck={checked}
                      isModal={true}
                      scheduleId={''}
                      unformattedDate={''}
                      isSwappable={false}
                      currentAppId={0}
                      forSwapModal={true}
                      selectCard={() => setSelectedDate(item.date)}
                    />
                  </TouchableOpacity>
                );
              })}
          </SwapModalBodyWrapper>
          <SwapModalButtonWrapper onPress={onSwap}>
            <ReUsableButton title="Swap" />
          </SwapModalButtonWrapper>
        </SwapModalMainContainer>
      </Modal>
    </>
  );
};

export default SwapModal;

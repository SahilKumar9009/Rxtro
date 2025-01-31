import React, {useEffect, useState} from 'react';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import ReUsableButton from '../ReUsableButton';
import {
  AppointmentCardMainContainer,
  AppointmentCardPrimaryText,
  AppointmentCardDetailContainer,
  AppointmentCardLocationContainer,
  AppointmentCardSecondaryText,
  AppointmentCardStatusText,
} from './styled';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {FONT_SIZE, isTablet, REDUCER, USER_ID} from '../../constants';
import {Alert, Platform, TouchableOpacity} from 'react-native';
import CompletAppointmentModal from '../CompleteAppointmentModal';
import {
  getCompleteAppointment,
  getFutureAppointments,
  getPreviousLastAppointments,
} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  day?: string;
  month?: string;
  year?: string;
  time: string;
  clinicName: string;
  location: string;
  isRequired?: boolean;
  status?: number;
  showButton?: boolean;
  onPress?: () => void;
  buttonTitle?: string;
  id?: string | undefined;
  fromPrev: boolean;
  isCompletable?: boolean;
  showStatus?: boolean;
  isTarget: boolean;
  forFilter?: boolean;
  forSwap?: boolean;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const AppointmentCard: React.FC<Props> = ({
  time,
  clinicName,
  location,
  status,
  showButton,
  buttonTitle,
  id,
  fromPrev,
  isCompletable,
  showStatus,
  isTarget,
  forFilter,
  forSwap,
  month,
  day,
  year,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<TypedDispatch>();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOnPress = () => {
    setModalVisible(true);
    setPressed(true);
    dispatch(getCompleteAppointment({appId: id}));
  };
  const [pressed, setPressed] = React.useState(false);
  const completeAppointmentReducer =
    useSelector(
      (state: any) => state.postCompleteAppointmentReducer.response,
    ) || {};

  useEffect(() => {
    if (Object.keys(completeAppointmentReducer)?.length === 0) return;
    if (completeAppointmentReducer['internal-code'] === 400 && pressed) {
      setPressed(false);
      Alert.alert('Message', 'Appointment cannot be completed', [
        {
          text: 'OK',
        },
      ]);
    } else if (completeAppointmentReducer['internal-code'] === 200 && pressed) {
      setPressed(false);
      Alert.alert('Message', 'Appointment is completed', [
        {
          text: 'OK',
        },
      ]);
      AsyncStorage.getItem(USER_ID).then(userId => {
        if (!userId) return;
        dispatch(getFutureAppointments({drugRepId: userId}));
        dispatch(getPreviousLastAppointments({drugRepId: userId}));
      });
    }
    dispatch({type: REDUCER.POST_COMPLETE_APPOINTMENT_CLEAR});
  }, [Object.keys(completeAppointmentReducer)?.length]);

  return (
    <>
      <AppointmentCardMainContainer
        activeOpacity={fromPrev || isCompletable ? 1 : 0.7}
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
        onPress={
          isCompletable
            ? null
            : () => {
                // ! instead of passing navigation pros, dispatch an action
                dispatch({
                  type: REDUCER.STORE_APPOINTMENT_DETAILS,
                  payload: {
                    id,
                    buttonTitle,
                    time,
                    status,
                    month,
                    day,
                    year,
                  },
                });
                Platform.OS === 'ios'
                  ? Platform.isPad
                    ? null
                    : navigation.navigate('AppointmentDetailScreen')
                  : isTablet
                  ? null
                  : navigation.navigate('AppointmentDetailScreen');
              }
        }
        isGreen={isTarget}
        isBlue={forFilter}>
        <AppointmentCardDetailContainer>
          <AppointmentCardPrimaryText
            isBlue={forFilter}
            isGreen={isTarget}
            numberOfLines={1}>
            {time} - {clinicName}
          </AppointmentCardPrimaryText>
          {!forSwap ? (
            showStatus && status === 1 ? (
              <AppointmentCardStatusText isBlue={forFilter} isGreen={isTarget}>
                Made
              </AppointmentCardStatusText>
            ) : status === 2 || status === 3 || status === 4 ? (
              <AppointmentCardStatusText isBlue={forFilter} isGreen={isTarget}>
                Confirmed
              </AppointmentCardStatusText>
            ) : (
              <AppointmentCardStatusText isBlue={forFilter} isGreen={isTarget}>
                Confirming
              </AppointmentCardStatusText>
            )
          ) : null}
        </AppointmentCardDetailContainer>
        <AppointmentCardLocationContainer>
          <FontIcon
            name="map-pin"
            size={
              Platform.OS === 'ios'
                ? Platform.isPad
                  ? FONT_SIZE.f10
                  : FONT_SIZE.f12
                : isTablet
                ? FONT_SIZE.f10
                : FONT_SIZE.f12
            }
            color="skyblue"
          />
          <AppointmentCardSecondaryText isBlue={forFilter} isGreen={isTarget}>
            {location}
          </AppointmentCardSecondaryText>
        </AppointmentCardLocationContainer>
        {isCompletable ? (
          <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
            <ReUsableButton title={buttonTitle} />
          </TouchableOpacity>
        ) : null}
      </AppointmentCardMainContainer>
      {id ? (
        <CompletAppointmentModal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          appId={id}
        />
      ) : null}
    </>
  );
};

export default AppointmentCard;

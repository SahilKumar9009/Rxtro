import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { blueColor, FONT_SIZE, SPACING } from '../../constants';
import AppointmentCard from '../AppointmentCard';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import ReUsableButton from '../ReUsableButton';
import {ConfirmSwapModalMainContainer, ConfirmSwapModalInnerContainer, ConfirmSwapModalHeader, ConfirmSwapModalHeadingText, ConfirmSwapModalBodyWrapper, ConfirmSwapModalPrimaryText, ConfirmSwapModalButtonWrapper} from './styled';
import { postSwapAppointment, postSwapAppointmentLoading } from '../../actions';


type Props = {
  fromPush?: boolean,
  swappAbleDate?: string | undefined,
  currentDate?: string | undefined
  isVisible: boolean,
  onBackdropPress: () => void
  currentAppId?: number,
  surgeryName: string,
  surgeryAddress: string,
  surgeryAddressSuburb?: string,
  currentAppDay?: string,
  currentAppMonth?: string,
  currentAppTime?: string,
  selectedDay?: string,
  selectedTime?: string,
  selectedMonth?: string,
  selectedDate?: string
}

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const ConfirmSwapModal:React.FC<Props> = ({
  fromPush,
  swappAbleDate,
  currentDate,
  isVisible, 
  onBackdropPress,
  currentAppId,
  surgeryName,
  surgeryAddress,
  surgeryAddressSuburb,
  currentAppDay,
  currentAppMonth, 
  currentAppTime,
  selectedDay,
  selectedMonth,
  selectedTime,
  selectedDate
}) => {
  const dispatch = useDispatch<TypedDispatch>();
  
  const onConfirmSwap = () => {
    console.log("Swap Confirmed");
    
    dispatch(postSwapAppointmentLoading());
    dispatch(postSwapAppointment({appId: currentAppId, appDateSelected: swappAbleDate || selectedDate}))
    onBackdropPress()
  }

  return (
    <>
      <Modal isVisible={isVisible} backdropOpacity={0.6} onBackdropPress={onBackdropPress} style={{zIndex:1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 40}}>
          <ConfirmSwapModalMainContainer>
            <ConfirmSwapModalInnerContainer>
              <ConfirmSwapModalHeader style={{
                  shadowColor: '#171717',
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                }}>
                <ConfirmSwapModalHeadingText>Swap this appointments with</ConfirmSwapModalHeadingText>
                <TouchableOpacity onPress={onBackdropPress} activeOpacity={0.7}>
                  <Icon name="close-circle-outline" size={FONT_SIZE.f18} color='black' />
                </TouchableOpacity>
              </ConfirmSwapModalHeader>
            </ConfirmSwapModalInnerContainer>
            <ConfirmSwapModalBodyWrapper>
              <ConfirmSwapModalPrimaryText style={{marginBottom: SPACING.h15}}>You're going to swap your existing appointment</ConfirmSwapModalPrimaryText>
              <TouchableOpacity style={{marginBottom: 20}} onPress={onBackdropPress} activeOpacity={0.7}>
                {fromPush ?
                <AppointmentCard time={currentDate} clinicName={surgeryName} location={surgeryAddress + " " + surgeryAddressSuburb } fromPrev={false} showStatus={false} isTarget={false} forSwap={true} /> :
                <AppointmentCard time={currentAppDay + " " + currentAppMonth + "-" + currentAppTime} clinicName={surgeryName} location={surgeryAddress} fromPrev={false} showStatus={false} isTarget={false} forSwap={true} />
                }
              </TouchableOpacity>
              <ConfirmSwapModalPrimaryText style={{marginBottom: SPACING.h15}}>with</ConfirmSwapModalPrimaryText>
              <TouchableOpacity style={{marginBottom: 20}} onPress={onBackdropPress} activeOpacity={0.7}>
                {fromPush ? 
                  <AppointmentCard time={swappAbleDate} clinicName={surgeryName} location={surgeryAddress + " " + surgeryAddressSuburb} fromPrev={false} isTarget={false} forSwap={true} />
                  :
                  <AppointmentCard time={selectedDay + " " + selectedMonth + "-" + selectedTime} clinicName={surgeryName} location={surgeryAddress} fromPrev={false} isTarget={false} forSwap={true} />
                }
                
              </TouchableOpacity>
              <ConfirmSwapModalPrimaryText>is that correct?</ConfirmSwapModalPrimaryText>
            </ConfirmSwapModalBodyWrapper>
            <ConfirmSwapModalButtonWrapper onPress={onConfirmSwap} activeOpacity={0.7}>
              <ReUsableButton title='Confirm' />
            </ConfirmSwapModalButtonWrapper>
            <ConfirmSwapModalButtonWrapper onPress={onBackdropPress} activeOpacity={0.7}>
              <ConfirmSwapModalPrimaryText style={{color: blueColor}}>Cancel</ConfirmSwapModalPrimaryText>
            </ConfirmSwapModalButtonWrapper>
          </ConfirmSwapModalMainContainer>
        </ScrollView>
      </Modal>
    </>
  )
}

export default ConfirmSwapModal
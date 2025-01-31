import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { FONT_SIZE } from '../../constants';
import DoctorCard from '../DoctorCard';
import ReUsableButton from '../ReUsableButton';
import {TransferModalMainContainer, TransferModalInnerContainer, TransferModalHeader, TransferModalHeadingText, TransferModalBody, TransferModalButtonWrapper} from './styled';

type Props= {
  isVisible: boolean,
  onBackdropPress?: () => void
}

const TransferModal:React.FC<Props> = ({isVisible, onBackdropPress}) => {
  return (
    <>
      <Modal isVisible={isVisible} backdropOpacity={0.6} onBackdropPress={onBackdropPress}>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
          <TransferModalMainContainer>
            <TransferModalInnerContainer style={{
              shadowColor: '#171717',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
              <TransferModalHeader style={{
                shadowColor: '#171717',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}>
                <TransferModalHeadingText>Transfer an Appointment</TransferModalHeadingText>
                <TouchableOpacity onPress={onBackdropPress}>
                  <Icon name="close-circle-outline" size={FONT_SIZE.f18} color='black' />
                </TouchableOpacity>
              </TransferModalHeader>
              <TransferModalBody showsVerticalScrollIndicator={false}>
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
                <DoctorCard name='Abagail Libbie' companyName='GSK' desgination='Drug Representative' />
              </TransferModalBody>
              <TransferModalButtonWrapper onPress={onBackdropPress}>
                <ReUsableButton title='Transfer' />
              </TransferModalButtonWrapper>
            </TransferModalInnerContainer>
          </TransferModalMainContainer>
        </ScrollView>
      </Modal>
    </>
  )
}

export default TransferModal
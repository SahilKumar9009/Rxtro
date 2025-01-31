import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

import CustomRadioButton from '../CustomRadioButton';
import ConfirmModal from '../ConfirmModal';
import {
  CenteredView,
  ModalView,
  ModalTitle,
  MeetingTypeText,
  RequisitionMessageContainer,
  CharCount,
  ButtonContainer,
  ButtonText,
  CancelButton,
  RequisitionMessage,
  SubmitButton,
  Line,
  Input,
} from './styled';
import approvalRequest from '../../apiActions/approvalRequest';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import combineReducer from '../../reducers';
import { SPACING } from '../../constants';


type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const RequestApprovalModal = ({visible, onClose, Item,clinicId}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const [meetingType, setMeetingType] = useState('');
  console.log("in the meeting type", meetingType)
  const [otherText, setOtherText] = useState('');
  const [requisitionMessage, setRequisitionMessage] = useState('');
  console.log('in the requisitionMessage', requisitionMessage)
  const [confirmmodal, setconfirmModal] = useState(false);
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );
  const userId = userData?.userId;
  // const clinicId = Item?.clinic?.clinicId;

  console.log("in teh clinincid", Item);

  const meetingTypeMapping = {
    specialist: 1,
    new_product: 2,
    urgent: 3,
    education: 4,
    other: 5,
  };

  const handleOutsidePress = () => {
    onClose();
  };
  

  const HandleSubmitRequest = () => {
    const meetingTypeNumber = meetingTypeMapping[meetingType] || 0; 
    const body = {
      "ask-for-id" :meetingTypeNumber,
      "ask-for-text": requisitionMessage
    }
    dispatch(approvalRequest(userId,clinicId,body));
    onClose();
    setconfirmModal(false);
  }

  const handleConfirm = () => {
    setconfirmModal(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <CenteredView>
          <TouchableWithoutFeedback>
            <ModalView>
              <ModalTitle>Request Approval</ModalTitle>
              <Line />
              <MeetingTypeText>Meeting Type</MeetingTypeText>
              <CustomRadioButton
                label="Specialist Available For The Day That Can Come"
                selected={meetingType === 'specialist'}
                onPress={() => {
                  console.log("in the specialist")
                  setMeetingType('specialist')}}
              />
              <CustomRadioButton
                label="New Indication/Product"
                selected={meetingType === 'new_product'}
                onPress={() => setMeetingType('new_product')}
              />
              <CustomRadioButton
                label="Urgent Indication"
                selected={meetingType === 'urgent'}
                onPress={() => setMeetingType('urgent')}
              />
              <CustomRadioButton
                label="Education material Following face-to-face meeting/Conference"
                selected={meetingType === 'education'}
                onPress={() => setMeetingType('education')}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CustomRadioButton
                  label="Other"
                  selected={meetingType === 'other'}
                  onPress={() => setMeetingType('other')}
                />
                {meetingType === 'other' && (
                  <Input
                    style={{
                      marginStart: SPACING.h8,
                      width: 210,
                      height: 40,
                      marginEnd: 13,
                      padding: 5,
                      fontSize: 10,
                    }}
                    placeholder="Specify Other"
                    value={otherText}
                    onChangeText={text => setOtherText(text)}
                  />
                )}
              </View>

              <RequisitionMessageContainer>
                <RequisitionMessage>Requisition Message</RequisitionMessage>
                <Text>{requisitionMessage.length}/555</Text>
              </RequisitionMessageContainer>

              <Input
                style={{
                  height: 80,
                  textAlignVertical: 'top',
                  fontSize: 10,
                }}
                multiline={true}
                maxLength={555}
                value={requisitionMessage}
                onChangeText={text => setRequisitionMessage(text)}
                placeholder="Requisition Message"
              />

              <CharCount>
                {555 - requisitionMessage.length} characters remaining
              </CharCount>
              <ButtonContainer>
                <SubmitButton onPress={HandleSubmitRequest} >
                  <ButtonText>Submit Request</ButtonText>
                </SubmitButton>
                <CancelButton onPress={onClose}>
                  <ButtonText style={{color: '#666666'}}>Cancel</ButtonText>
                </CancelButton>
              </ButtonContainer>
            </ModalView>
          </TouchableWithoutFeedback>
        </CenteredView>
      </TouchableWithoutFeedback>
      {confirmmodal && (
        <ConfirmModal
          visible={confirmmodal}
          message="Are you sure you want to"
          onConfirm={handleConfirm}
          onCancel={() => setconfirmModal(false)}
          Item={Item}
        />
      )}
    </Modal>
  );
};

export default RequestApprovalModal;

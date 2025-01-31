import React, {useState} from 'react';
import {Modal, FlatList, Pressable, Text, View} from 'react-native';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {takeClinicAppointmentApiGroup} from '../../api2/takeClinicAppointmenApi';
import {takeIndividualAppointment} from '../../api2/postTakeIndividualApp';
import AppointmentTable from '../TableCard';
import ConfirmModal from '../ConfirmModal';
import {
  Overlay,
  ModalContainer,
  Title,
  Line,
  Subtitle,
  ConfirmationText,
  ButtonContainer,
  SubmitButton,
  SubmitText,
  CancelButton,
  CancelText,
  StatusContainer,
} from './styled';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const RetainSlotModal = ({visible, onClose, Item, action}) => {
  const currentAppId = Item.current_app_id;
  const appDate = Item.app_date;
  const scheduleId = Item.scheduleId;
  const clinicId = Item.clinicId;

  const individualId = useSelector(
    (state: any) => state.storeIdReducer.surgeryId,
  );
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const data = [
    {
      day: 'Monday, 10:00 AM ',
      location: 'Auburn-Blacksville, NSW',
      with: 'AA Chestwick Road Medical Superheroes & Occasional Ultravillains who are too OP to refuse treatment to.',
      name: 'Saul Goodman',
      status: 'No Conflict',
    },
    {
      day: 'Monday, 10:00 AM ',
      location: 'Auburn-Blacksville, NSW',
      with: 'AA Chestwick Road Medical Superheroes & Occasional Ultravillains who are too OP to refuse treatment to.',
      name: 'Saul Goodman',
      status: 'No Conflict',
    },
    {
      day: 'Monday, 10:00 AM ',
      location: 'Auburn-Blacksville, NSW',
      with: 'AA Chestwick Road Medical Superheroes & Occasional Ultravillains who are too OP to refuse treatment to.',
      name: 'Saul Goodman',
      status: 'No Conflict',
    },
  ];

  const handleConfirm = () => {
    const GroupData = {
      appDate: appDate,
      takenFrom: 2,
      scheduleId: scheduleId,
      clinicId: clinicId,
      userId: userData?.userId,
    };

    const individaulData = {
      appDate: currentAppId,
      individualId: individualId,
      takenFrom: 1,
      scheduleId: scheduleId,
      clinicId: clinicId,
    };

    if (individualId > 0) {
      dispatch(takeIndividualAppointment(individaulData));
    } else {
      dispatch(takeClinicAppointmentApiGroup(GroupData));
    }
    setConfirmModal(false);
    onClose();
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}>
        <Overlay onPress={onClose} />

        <View style={{flexDirection: 'row'}}>
          <Overlay onPress={onClose} style={{width: '5%', height: '100%'}} />
          <ModalContainer>
            <Title>
              {action === 0 ? 'Retain Same Slot' : 'Confirm Booking ?'}
            </Title>
            <Line />
            <StatusContainer>
              <Subtitle>Your Schedule During This Appointment</Subtitle>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 10, fontWeight: '400'}}>Status: </Text>
                <Text style={{color: '#2E7D32', fontSize: 10}}>
                  No Conflict
                </Text>
              </View>
            </StatusContainer>

            <FlatList
              data={data}
              renderItem={({item}) => <AppointmentTable item={item} />}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              style={{maxHeight: 400}}
            />

            <ConfirmationText>
              Your schedule is clear for this appointment without any conflicts.
              Do you want to confirm the booking?
            </ConfirmationText>

            <ButtonContainer>
              <SubmitButton onPress={() => setConfirmModal(true)}>
                <SubmitText>
                  {action === 0 ? 'Submit Request' : 'Confirm Booking'}
                </SubmitText>
              </SubmitButton>
              <CancelButton onPress={onClose}>
                <CancelText>CANCEL</CancelText>
              </CancelButton>
            </ButtonContainer>
          </ModalContainer>
          <Overlay onPress={onClose} style={{width: '5%', height: '100%'}} />
        </View>
        <Overlay onPress={onClose} style={{height: '20%'}} />

        {confirmModal && (
          <ConfirmModal
            visible={confirmModal}
            message={action === 0 ? 'Retain Same Slot?' : 'Are you Sure?'}
            onConfirm={handleConfirm}
            onCancel={() => setConfirmModal(false)}
          />
        )}
      </Modal>
    </>
  );
};

export default RetainSlotModal;

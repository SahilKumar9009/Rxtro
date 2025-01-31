import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Colors} from '../../constants';
import ConfirmModal from '../ConfirmModal';
import RNText from '../RNText';
import {store} from '../../../App';
import getCustomerSchedules from '../../apiActions/getCustomerSchedules';
import ConfirmedIcon from '../../assets/Svg/ConfirmedIcon';
import DeniedIcon from '../../assets/Svg/DeniedIcon';
import {
  CancelButton,
  CancelText,
  Card,
  Label,
  ModalBackground,
  ModalContainer,
  ModalView,
  Row,
  StatusContainer,
  StatusText,
  Title,
  Value,
  VerticalLine,
} from './styled';
import { useSelector } from 'react-redux';

const SlotFrequenciesModal = ({isvisible, onClose, teritoryId, title}) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [scheduleData, setScheduleData] = useState();
  const [loading, setLoading] = useState(true);


  console.log("in the title", title)

  const getschedules = async teritoryId => {
    setLoading(true);
    const resp = await store.dispatch(getCustomerSchedules(teritoryId));
    setLoading(false);
    if (resp && resp.length > 0) {
      setScheduleData(resp);
    } else {
      onClose();
      Alert.alert('No Schedules Available', 'There are no schedules to display.', [
        {text: 'OK', onPress: onClose}, // Close the modal on pressing OK
      ]);
    }
  };

  useEffect(() => {
    getschedules(teritoryId);
  }, [teritoryId]);

  const handleConfirm = () => {
    setConfirmModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isvisible}
      onRequestClose={onClose}>
      <ModalBackground>
        <Pressable style={{height: '10%', width: '100%'}} onPress={onClose} />
        <ModalContainer>
          <Pressable style={{width: '5%'}} onPress={onClose} />
          <ModalView>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <ScrollView
                contentContainerStyle={{paddingVertical: 10}}
                keyboardShouldPersistTaps="handled">
                <Title>{title}</Title>
                {scheduleData?.map((slot, index) => (
                  <>
                  <Card key={index} style={{marginBottom: 20}}>
                    <Row>
                      <Label>Frequency:</Label>
                      <VerticalLine style={{height: '180%'}} />
                      <Value style={{fontWeight: '600'}}>
                        {slot.frequency}
                      </Value>
                    </Row>
                    <Row>
                      <Label>Day:</Label>
                      <VerticalLine />
                      <Value style={{fontWeight: '600'}}>{slot.day}</Value>
                    </Row>
                    <Row>
                      <Label>Hour:</Label>
                      <VerticalLine />
                      <Value>{slot.hour}</Value>
                    </Row>
                    <Row>
                      <Label>Type of Meeting:</Label>
                      <VerticalLine />
                      <Value>{slot.meeting_type}</Value>
                    </Row>
                    <Row>
                      <Label>Approval Required?</Label>
                      <VerticalLine />
                      <Value>{slot.approval_required ? 'true' : 'false'}</Value>
                    </Row>
                    <Row style={{borderBottomWidth: 0}}>
                      <Label>Available For You:</Label>
                      <VerticalLine
                        style={{
                          height: Platform.OS === 'ios' ? '150%' : '160%',
                        }}
                      />
                      <StatusContainer>
                        {slot.available ? <ConfirmedIcon /> : <DeniedIcon />}
                        <StatusText onPress={() => setConfirmModal(true)}>
                          <RNText
                            style={{
                              color: slot.available ? '#43A047' : '#E53935',
                            }}>
                            {slot.available ? 'YES' : 'NO'}
                          </RNText>
                        </StatusText>
                      </StatusContainer>
                    </Row>
                  </Card>
                  </>
                ))}
                <CancelButton onPress={onClose}>
                  <CancelText>CANCEL</CancelText>
                </CancelButton>
              </ScrollView>
            )}
          </ModalView>
          <Pressable style={{width: '20%'}} onPress={onClose} />
        </ModalContainer>
        <Pressable style={{height: '13%', width: '100%'}} onPress={onClose} />
        {confirmModal && (
          <ConfirmModal
            visible={confirmModal}
            message="Are You sure?"
            onConfirm={handleConfirm}
            onCancel={() => setConfirmModal(false)}
          />
        )}
        
      </ModalBackground>
    </Modal>
  );
};

export default SlotFrequenciesModal;

import React, {useEffect, useState} from 'react';
import {AddClinicMainContainer, AddClinicButtonWrapper} from './styled';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/MainScreenHeader';
import Input from '../../components/Input';
import ReUsableButton from '../../components/ReUsableButton';
import DateTimePickerComponent from '../../components/DatePickerComponent';
import TimePicker from '../../components/TimePicker';
import {Alert, Linking} from 'react-native';
import { mainBackgroundColor } from '../../constants';

const AddClinicScreen = () => {
  const [clinicName, setClinicName] = useState('');
  const [clinicEmail, setClinicEmail] = useState('');
  const [clinicContactName, setClinicContactName] = useState('');
  const [clinicContactNo, setClinicContactNo] = useState('');
  const [clinicDate, setClinicDate] = useState<Date>(new Date());
  const [clinicTime, setClinicTime] = useState<Date>(new Date());
  const [clinicComments, setClinicComments] = useState('');

  const emailBody = `Hi RxTro,\nThis clinic seems like it would be an ideal fit for RxTro, you should reach out to them.\n\n`;
  let timeHour = clinicTime?.getHours();
  let timeMinutes = clinicTime?.getMinutes();

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const onSave = () => {
    if (
      clinicName.trim() === '' ||
      clinicEmail.trim() === '' ||
      clinicContactName.trim() === '' ||
      clinicContactNo.trim() === '' ||
      clinicComments.trim() === ''
    ) {
      Alert.alert('Message', 'Please fill all the fields.');
    } else if (!validateEmail(clinicEmail)) {
      Alert.alert('Message', 'Please provide valid email address.');
    } else {
      Linking.openURL(
        `mailto:support@rxtro.com?subject=RXTRO: Suggestion to add new clinic&body=${emailBody}1. Clinic Name: ${clinicName}\n 2. Clinic Email: ${clinicEmail}\n 3. Contact No.: ${clinicContactNo}\n 4. Contact Name: ${clinicContactName}\n 5. Date: ${clinicDate.toLocaleDateString()}\n 6. Time: ${`${timeHour}:${timeMinutes}`}\n 7. Comments: ${clinicComments}`,
      );
    }
  };

 

  return (
    <>
      <Header title="Add Clinic" />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <AddClinicMainContainer
          style={{
            shadowColor: '#171717',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}>
          <Input
            alignment="left"
            title="Clinic Name"
            onChange={setClinicName}
          />
          <Input
            alignment="left"
            title="Clinic Email"
            onChange={setClinicEmail}
          />
          <Input
            alignment="left"
            title="Contact Name"
            onChange={setClinicContactName}
          />
          <Input
            alignment="left"
            title="Contact Number"
            onChange={setClinicContactNo}
          />
          <DateTimePickerComponent onSetDate={setClinicDate} />
          <TimePicker onSetTime={setClinicTime} />
          <Input
            alignment="left"
            title="How did you hear about us?"
            multiline={true}
            numberOfline={4}
            textArea={true}
            onChange={setClinicComments}
          />
        </AddClinicMainContainer>
        <AddClinicButtonWrapper activeOpacity={0.7} onPress={onSave}>
          <ReUsableButton title="Save" color={mainBackgroundColor} />
        </AddClinicButtonWrapper>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddClinicScreen;

import React, { Dispatch, SetStateAction, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerMainContainer, DateTimePickerTouchableWrapper, DateTimePickerText} from './styled';
import { Platform, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZE, mainBackgroundColor } from '../../constants';

type Props = {
  onSetDate: Dispatch<SetStateAction<Date>>
}

const DatePickerComponent:React.FC<Props> = ({onSetDate}) => {
  const scheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = Platform.OS === 'android' ? useState(false) : useState(true);
  const [mode, setMode] = useState('date');
  const [displayPicker, setDisplayPicker] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onSetDate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatePicker = () => {
    showMode('date');
    setDisplayPicker(!displayPicker);
  };

  return (
    <DateTimePickerMainContainer>
      <DateTimePickerTouchableWrapper onPress={showDatePicker}>
        <DateTimePickerText>{date.toLocaleDateString()}</DateTimePickerText>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          onChange={onChange}
          textColor={scheme === 'dark' ? 'black' : 'black'}
          display='spinner'
          style={{
            backgroundColor: '#F6F6F6', 
            display: displayPicker ? 'flex' : 'none',
            flex: 1,
            flexDirection: 'row'
          }}

        />
      )}
      <Icon name="calendar" size={FONT_SIZE.f18} color={mainBackgroundColor} style={{marginLeft: 'auto'}} />
      </DateTimePickerTouchableWrapper>
    </DateTimePickerMainContainer>
  )
}

export default DatePickerComponent;
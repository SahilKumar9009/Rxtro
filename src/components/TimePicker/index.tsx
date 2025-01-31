import React, { Dispatch, SetStateAction, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TimePickerMainContainer, TimePickerTouchableWrapper, TimePickerText} from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZE, mainBackgroundColor } from '../../constants';

type Props = {
  onSetTime: Dispatch<SetStateAction<Date>>
}

const TimePicker:React.FC<Props> = ({onSetTime}) => {
  const scheme = useColorScheme();
  const [time, setTime] = useState(new Date());
  const [show, setShow] = Platform.OS === 'android' ? useState(false) : useState(true);
  const [mode, setMode] = useState('time');
  const [displayPicker, setDisplayPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
    onSetTime(currentTime)
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimePicker = () => {
    showMode('time');
    setDisplayPicker(!displayPicker);
  };

  return (
    <TimePickerMainContainer>
      <TimePickerTouchableWrapper onPress={showTimePicker}>
        <TimePickerText>{time.toLocaleTimeString()}</TimePickerText>
        {show && (
        <DateTimePicker
          dateFormat="dayofweek day month"
          testID="dateTimePicker"
          value={time}
          display={Platform.OS === 'ios' ? "spinner" : 'spinner'}
          mode='time'
          textColor={scheme === 'dark' ? 'black' : 'black'}
          is24Hour={true}
          onChange={onChange}
          themeVariant= 'light'
          style={{
            backgroundColor: '#F6F6F6', 
            display: displayPicker ? 'flex' : 'none',
            flex: 1, 
            flexDirection: 'row'}}
        />
      )}
      <Icon name="timer" size={FONT_SIZE.f18} color={mainBackgroundColor} style={{marginLeft: 'auto'}} />
      </TimePickerTouchableWrapper>
    </TimePickerMainContainer>
  )
}

export default TimePicker;
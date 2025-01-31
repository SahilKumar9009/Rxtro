import React from 'react';
import {
  Label,
  RadioButton,
  RadioButtonContainer,
  RadioButtonSelected,
} from './styled';

const CustomRadioButton = ({selected, onPress, label}) => {
  return (
    <RadioButtonContainer onPress={onPress}>
      <RadioButton>{selected ? <RadioButtonSelected /> : null}</RadioButton>
      <Label>{label}</Label>
    </RadioButtonContainer>
  );
};

export default CustomRadioButton;

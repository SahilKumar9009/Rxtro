import { Platform, TouchableOpacity } from 'react-native';
import {FONT_SIZE, SPACING, isTablet} from './../../constants/constants';
import styled from 'styled-components/native';

const RadioButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10;
  margin-right: ${SPACING.h10}px;
`;

const RadioButton = styled.View`
  height: 14;
  width: 14;
  border-radius: 7;
  border-width: 1;
  border-color: #444;
  align-items: center;
  justify-content: center;
  margin-right: 10;
`;

const RadioButtonSelected = styled.View`
  height: 12;
  width: 12;
  border-radius: 6;
  background-color: #444;
`;
const Label = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
`;

export {RadioButtonContainer, RadioButton, RadioButtonSelected, Label};

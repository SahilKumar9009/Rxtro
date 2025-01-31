import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {commonBorderColor, FONT_SIZE, isTablet, SPACING} from '../../constants';

const TextInput = styled.TextInput`
  margin: ${SPACING.h10}px 0px;
  padding: ${SPACING.h15}px ${SPACING.h10}px;
  background-color: #f6f6f6;
  border-width: 1px;
  border-color: ${commonBorderColor};
  border-radius: ${SPACING.h10}px;
  width: 100%;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
`;

export default TextInput;

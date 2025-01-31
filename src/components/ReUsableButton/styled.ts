import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  FONT_SIZE,
  isTablet,
  SPACING,
  successButtonBorderColor,
  successButtonColor,
} from '../../constants';

type Props = {
  color?: string;
};

const ReUsableButtonWrapper = styled.View<Props>`
  background-color: ${props =>
    props.color ? props.color : successButtonColor};
  padding: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? SPACING.h5
      : SPACING.h15
    : isTablet
    ? SPACING.h5
    : SPACING.h15}px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props =>
    props.color ? props.color : successButtonBorderColor};
  margin-top: ${SPACING.h10}px;
`;

const ReUsableButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f14
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f14}px;
  color: white;
  text-align: center;
`;

export {ReUsableButtonWrapper, ReUsableButtonText};

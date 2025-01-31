import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {commonBorderColor, FONT_SIZE, isTablet, SPACING} from '../../constants';

const ForgotPasswordScreenMainContainer = styled.View`
  background-color: white;
  padding: ${SPACING.h15}px;
  border-radius: ${SPACING.h5}px;
  margin: ${SPACING.h15}px;
  elevation: 4;
  align-items: center;
`;

const ForgotPasswordScreenHeadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${commonBorderColor};
  padding-bottom: ${SPACING.h10}px;
`;

const ForgotPasswordScreenHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const ForgotPasswordScreenTouchableWrapper = styled.TouchableOpacity`
  margin: ${SPACING.h5}px 0px;
`;

const ForgotPasswordScreenInnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ForgotPasswordScreenForgotPasswordCard = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${SPACING.h15}px ${SPACING.h10}px;
`;

const ForgotPasswordScreenLabelText = styled.Text`
  font-size: ${FONT_SIZE.f11}px;
  color: black;
  margin: ${SPACING.h5}px 0px;
`;

export {
  ForgotPasswordScreenMainContainer,
  ForgotPasswordScreenHeadingContainer,
  ForgotPasswordScreenHeadingText,
  ForgotPasswordScreenTouchableWrapper,
  ForgotPasswordScreenInnerContainer,
  ForgotPasswordScreenForgotPasswordCard,
  ForgotPasswordScreenLabelText,
};

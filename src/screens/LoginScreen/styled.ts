import styled from 'styled-components/native';
import {FONT_SIZE, isTablet, SPACING} from '../../constants';
import {Platform} from 'react-native';

const LoginScreenMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${SPACING.h15}px;
  border-radius: ${SPACING.h5}px;
  elevation: 4;
`;

const LoginScreenHeadingContainer = styled.View`
  padding-bottom: ${SPACING.h10}px;
  width: 100%;
  margin: 0 auto;
`;

const LoginScreenLogo = styled.Image`
  align-self: center;
  resize-mode: contain;
`;

const LoginScreenInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginScreenLoginCard = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${SPACING.h15}px ${SPACING.h10}px;
`;

const LoginScreenTouchableWrapper = styled.TouchableOpacity`
  margin: ${SPACING.h5}px 0px;
`;

const LoginScreenLabelText = styled.Text`
position: relative;
margin-top: ${SPACING.h20}px;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f12}px;
  
  color: black;
  margin: ${SPACING.h5}px 0px;
`;

export {
  LoginScreenMainContainer,
  LoginScreenHeadingContainer,
  LoginScreenLogo,
  LoginScreenInnerContainer,
  LoginScreenLoginCard,
  LoginScreenLabelText,
  LoginScreenTouchableWrapper,
};

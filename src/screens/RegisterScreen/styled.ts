import { Platform } from "react-native";
import styled from "styled-components/native";
import { blueColor, commonBorderColor, FONT_SIZE, isTablet, SPACING } from "../../constants";


const SignUpScreenMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${SPACING.h15}px;
  border-radius: ${SPACING.h5}px;
  margin: ${SPACING.h15}px;
  elevation: 4;
  align-items: center;
  justify-content: center;
  margin-top: ${SPACING.h150}px;
`;

const InfoText = styled.Text`
   font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f16}px;
  color: black;
  text-align: center;
  margin: ${SPACING.h10}px 0px;
  `;

const SignUpScreenHeadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${commonBorderColor};
  padding-bottom: ${SPACING.h10}px;
`;

const SignUpScreenHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const SignUpScreenInnerContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SignUpScreenSignUpCard = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: ${SPACING.h15}px ${SPACING.h10}px;
`;

const SignUpScreenLabelText = styled.Text`
  font-size: ${FONT_SIZE.f11}px;
  color: black;
  margin: ${SPACING.h5}px 0px;
`;

const SignUpScreenMessageText = styled.Text`
  font-size: ${FONT_SIZE.f9}px;
  color: ${blueColor};
`;

const SignUpScreenTouchableWrapper = styled.TouchableOpacity`
  margin: ${SPACING.h5}px 0px ;
`;

const LoginScreenLabelText = styled.Text`
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


const StyledInputContainer = styled.View`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 5px;
`;

const StyledLabel = styled.Text`
position: absolute;
margin: ${SPACING.h20}px 0px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StyledInput = styled.TextInput`
  border-bottom: 1px solid lightgray;
`;

export {SignUpScreenMainContainer, SignUpScreenHeadingContainer, SignUpScreenHeadingText, SignUpScreenInnerContainer, SignUpScreenSignUpCard, SignUpScreenLabelText, SignUpScreenMessageText, SignUpScreenTouchableWrapper,InfoText,StyledLabel,StyledInput,StyledInputContainer,LoginScreenLabelText};
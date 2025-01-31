import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, isTablet, SPACING } from "../../constants";

const SecureInputMainContainer = styled.View`
  display: flex;
  backgroundColor: white;
  align-items: center;
  justify-content: center;
`;

const SecureInputInnerContainer = styled.View`
  margin: ${SPACING.h10}px 0px;
  background-color: #F6F6F6;
  width: 100%;
  borderRadius: ${SPACING.h10}px;
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${commonBorderColor};
`;

const SecureInputField = styled.TextInput`
  padding: ${SPACING.h15}px ${SPACING.h10}px;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  width: 90%;
`;

export {SecureInputMainContainer, SecureInputInnerContainer, SecureInputField}
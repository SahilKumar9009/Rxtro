import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, isTablet, SPACING } from "../../constants";

const TimePickerMainContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const TimePickerTouchableWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${SPACING.h15}px 0px;
  padding: ${Platform.OS === 'ios' ? SPACING.v6 : SPACING.h15}px;
  background-color: #F6F6F6;
  border-width: 1px;
  border-color: ${commonBorderColor};
  border-radius: 10px;
`;

const TimePickerText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  font-weight: bold;
  color: black;
`;


export {TimePickerMainContainer, TimePickerTouchableWrapper, TimePickerText};
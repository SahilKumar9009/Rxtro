import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, SPACING, blueColor, isTablet } from "../../constants";


const TouchableCardContainer = styled.View`
  border-left-width: 1px;
  border-left-color: ${commonBorderColor};
  background-color: white;
  // height: ${Platform.OS === 'ios' ? Platform.isPad ? '70' : '45' : isTablet ? '70' : '40'}px;
`;

const TouchableCardText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  color: ${blueColor};
  align-self: center;
  padding: ${Platform.OS === 'ios' ? Platform.isPad ? SPACING.h10 : SPACING.h15 : isTablet ? SPACING.h10 : SPACING.h15}px 0px;
`;

export {TouchableCardContainer, TouchableCardText}
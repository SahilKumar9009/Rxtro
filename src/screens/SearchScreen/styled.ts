import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, mainBackgroundColor, SPACING } from "../../constants";


const SearchScreenBody = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px ${SPACING.h15}px;
`;

const SearchScreenPrimaryText = styled.Text`
  margin-top: ${SPACING.h150}px;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f15}px;
  color: black;
  text-align: center;
`;

export {SearchScreenBody, SearchScreenPrimaryText};
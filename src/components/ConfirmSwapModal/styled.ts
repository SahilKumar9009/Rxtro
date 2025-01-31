import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, isTablet, SPACING, whiteBackgroundcolor } from "../../constants";


const ConfirmSwapModalMainContainer = styled.View`
  background-color: ${whiteBackgroundcolor};
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const ConfirmSwapModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  elevation: 4;
`;

const ConfirmSwapModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${SPACING.h10}px;
  background-color: white;
  border-top-right-radius: ${SPACING.h10}px;
  border-top-left-radius: ${SPACING.h10}px;
  padding: ${SPACING.h20}px;
  elevation: 4;
`;

const ConfirmSwapModalHeadingText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const ConfirmSwapModalBodyWrapper = styled.ScrollView`
  margin: ${SPACING.h10}px ${SPACING.h15}px;
  padding: ${SPACING.h10}px;
  margin: 0 auto;
  width: 100%;
`;

const ConfirmSwapModalPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f13}px;
  text-align: center;
  margin: ${SPACING.h10}px auto;
  width: 50%;
  color: black;
  font-weight: bold;
`;

const ConfirmSwapModalButtonWrapper = styled.TouchableOpacity`
  align-self: center
  width: 90%;
`;

export {ConfirmSwapModalMainContainer, ConfirmSwapModalInnerContainer, ConfirmSwapModalHeader, ConfirmSwapModalHeadingText, ConfirmSwapModalBodyWrapper, ConfirmSwapModalPrimaryText, ConfirmSwapModalButtonWrapper};
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, SPACING, whiteBackgroundcolor } from "../../constants";
import { Platform } from "react-native";


const SwapModalMainContainer = styled.View`
  background-color: white;
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
  height: 75%;
`;

const SwapModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwapModalSubHeadingContainer = styled.View`
  background-color: #bfbfbf;
  display: flex;
  flex-direction: row;
  padding: ${SPACING.h10}px;
`;

const SwapModalHeader = styled.View`
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

const SwapModalHeadingText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const SwapModalSubHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  color: black;
  margin: 0 auto;
`;

const SwapModalBodyWrapper = styled.ScrollView`
  background-color: ${whiteBackgroundcolor};
  margin: ${SPACING.h10}px ${SPACING.h15}px;
  padding: ${SPACING.h10}px;
  margin: 0 auto;
  width: 100%;
  border-radius: ${SPACING.h10}px;
`;

const SwapModalButtonWrapper = styled.TouchableOpacity`
  align-self: center
  width: 90%;
`;


export {SwapModalMainContainer, SwapModalInnerContainer, SwapModalHeader, SwapModalHeadingText, SwapModalSubHeadingContainer, SwapModalSubHeadingText, SwapModalBodyWrapper, SwapModalButtonWrapper};
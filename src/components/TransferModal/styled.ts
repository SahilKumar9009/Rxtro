import styled from "styled-components/native";
import { FONT_SIZE, isTablet, SPACING, whiteBackgroundcolor } from "../../constants";
import { Platform } from "react-native";


const TransferModalMainContainer = styled.View`
  background-color: ${whiteBackgroundcolor};
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const TransferModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransferModalHeader = styled.View`
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

const TransferModalHeadingText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const TransferModalBody = styled.ScrollView`
  background-color: white;
  margin: ${SPACING.h15}px;
  padding: ${SPACING.h10}px;
  elevation: 4;
  width: 90%;
  border-radius: ${SPACING.h10}px;
  max-height: 70%;
`;

const TransferModalButtonWrapper = styled.TouchableOpacity`
  margin-top: ${SPACING.h10}px;
  width: 80%;
`;


export {TransferModalMainContainer, TransferModalInnerContainer, TransferModalHeader, TransferModalHeadingText, TransferModalBody, TransferModalButtonWrapper};
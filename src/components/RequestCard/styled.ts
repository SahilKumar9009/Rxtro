import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, isTablet, mainBackgroundColor, secondaryFontColor, SPACING, successButtonBorderColor, WIDTH } from "../../constants";


const RequestCardMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: ${SPACING.h5}px;
  elevation: 4;
  margin: ${SPACING.h10}px;
`;

const RequestCardInnerContainerOne = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${commonBorderColor};
  padding: ${SPACING.h15}px ${SPACING.h10}px;
`;

const RequestCardCheckBoxWrapper = styled.View`
  right: ${SPACING.h5}px;
  border-width: ${Platform.OS === 'ios' ? 2 : 0}px;
  border-color: ${Platform.OS === 'ios' ? mainBackgroundColor : ""};
  border-radius: 500px;
  align-self: center;
  margin-bottom: ${SPACING.h10}px;
  margin-right: ${SPACING.h5}px;
`;

const RequestCardDetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const RequestCardProductName = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f14 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f14}px;
  color: black;
  font-weight: bold;
  margin-bottom: ${SPACING.h10}px;
`;

const RequestCardAddressWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const RequestCardClinicText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f13}px;
  color: black;
  margin-bottom: ${SPACING.h5}px;
`;

const RequestCardAddressText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  color: ${secondaryFontColor};
  margin-left: ${SPACING.h5}px;
`;

const RequestCardStatusWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`; 

const RequestCardStatusText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f11 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f11}px;
  font-weight: bold;
`;


export {RequestCardMainContainer, RequestCardInnerContainerOne, RequestCardCheckBoxWrapper, RequestCardDetailWrapper, RequestCardProductName, RequestCardAddressWrapper, RequestCardClinicText, RequestCardAddressText, RequestCardStatusWrapper, RequestCardStatusText};
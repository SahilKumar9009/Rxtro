import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, SPACING } from "../../constants";


const AvailabilityCardMainContainer = styled.TouchableOpacity`
  display: flex;
  background-color: white;
  flex-direction: column;
  elevation: 3;
  border-radius: ${SPACING.h5}px;
  padding: ${SPACING.h10}px ${SPACING.h15}px;
  min-width: 99%;
`;

const AvailabilityCardDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const AvailabilityCardPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  color: black;
  margin: ${SPACING.h10}px 0px;
  font-weight: bold;
  width: 90%;
`;

const AvailabilityCardLocationContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const AvailabilityCardSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  color: black;
  align-self: center;
  padding-left: ${SPACING.h10}px;
`;

export {AvailabilityCardMainContainer, AvailabilityCardDetailContainer, AvailabilityCardPrimaryText, AvailabilityCardLocationContainer, AvailabilityCardSecondaryText};
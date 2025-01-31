import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, SPACING } from "../../constants";


const AvailabilityDetailScreenMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  elevation: 4;
  padding-bottom: 120px;
`;

const AvailabilityDetailInnerContainer = styled.View`
  margin: ${SPACING.h10}px;
  border-radius: ${SPACING.h5}px;
`;

const AvailabilityDetailScreenPrimaryText = styled.Text`
  margin: ${SPACING.h15}px ${SPACING.h10}px;;
  font-size: ${FONT_SIZE.f13}px;
  color: black;
  font-weight: bold;
`;

const AvailabiltyDetailTouchableContainer = styled.View`
  width: 100%;
  margin-bottom: ${SPACING.h10}px;
`;

const AvailabiltyDetailTouchableWrapper = styled.TouchableOpacity`
  margin-top: ${SPACING.h50}px;
  background-color: #F03D3D;
  border-radius: ${SPACING.h5}px;
  padding: ${Platform.OS === 'ios' ? Platform.isPad ? SPACING.h10 : SPACING.h20 : isTablet ? SPACING.h10 : SPACING.h20}px;
  margin: ${SPACING.h20}px ${SPACING.h10}px;
  width: 80%;
  align-self: center;
`;

const AvailabiltyDetailTouchableText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f14 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f14}px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

const AvailabiltyDetailBottomContainer = styled.View`
  position: absolute;
  padding: ${SPACING.h15}px;
  bottom: 0px;
  width: 100%;
  elevation: 4;
`;

export {AvailabilityDetailScreenMainContainer, AvailabilityDetailInnerContainer, AvailabilityDetailScreenPrimaryText, AvailabiltyDetailTouchableWrapper, AvailabiltyDetailBottomContainer, AvailabiltyDetailTouchableText, AvailabiltyDetailTouchableContainer};
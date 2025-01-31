import { Platform } from "react-native";
import styled from "styled-components/native";
import { commonBorderColor, FONT_SIZE, isTablet, SPACING, whiteBackgroundcolor } from "../../constants";


const ConfirmDeliveryModalMainContainer = styled.View`
  background-color: ${whiteBackgroundcolor};
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
  background-color: white;
`;

const ConfirmDeliveryModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmDeliveryModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${SPACING.h10}px;
  border-top-right-radius: ${SPACING.h10}px;
  border-top-left-radius: ${SPACING.h10}px;
  padding: ${SPACING.h20}px;
  border-color: black:
  border-width: 1px;
`;

const ConfirmDeliveryModalHeadingText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const ConfirmDeliveryModalSubHeader = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding:  ${SPACING.h10}px;
  border-color: ${commonBorderColor};
  border-top-width: 1px;
`;

const ConfirmDeliveryModalSubHeadingText = styled.Text`
  color: black;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f13}px;
  font-weight: bold;
  text-align: center;
`;

const ConfirmDeliveryModalBodyWrapper = styled.ScrollView`
  margin: ${SPACING.h10}px ${SPACING.h15}px;
  padding: ${SPACING.h10}px;
  margin: 0 auto;
  width: 100%;
  background-color: ${whiteBackgroundcolor};
  height: 50%;
`;

const ConfirmDeliveryModalContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ConfirmDeliveryModalSecondaryText = styled.Text`
  color: black;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  text-align: center;
`;

const ConfirmDeliveryModalInputWrapper = styled.View`
  padding: 0px ${SPACING.h15}px;
`;

const ConfirmDeliveryModalInput = styled.TextInput`
  background-color: white;
  padding: 0px ${SPACING.h10}px;
  border-width: 1px;
  border-color: ${commonBorderColor};
`;

const ConfirmDeliveryModalButtonWrapper = styled.TouchableOpacity`
  width: 90%;
  margin: 0 auto;
`;

export {ConfirmDeliveryModalMainContainer, ConfirmDeliveryModalInnerContainer, ConfirmDeliveryModalHeader, ConfirmDeliveryModalHeadingText, ConfirmDeliveryModalSubHeader, ConfirmDeliveryModalSubHeadingText, ConfirmDeliveryModalBodyWrapper, ConfirmDeliveryModalContentWrapper, ConfirmDeliveryModalSecondaryText, ConfirmDeliveryModalInputWrapper, ConfirmDeliveryModalInput, ConfirmDeliveryModalButtonWrapper};
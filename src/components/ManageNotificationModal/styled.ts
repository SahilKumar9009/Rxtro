import styled from "styled-components/native";
import { FONT_SIZE, HEIGHT, isTablet, mainBackgroundColor, SPACING } from "../../constants";
import { Platform } from "react-native";

const ManageNotificationModalMainContainer = styled.View`
  background-color: white;
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const ManageNotificationModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  elevation: 4;
`;

const ManageNotificationModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
  width: 100%;
  /* margin-bottom: ${SPACING.h10}px; */
  background-color: white;
  border-top-right-radius: ${SPACING.h10}px;
  border-top-left-radius: ${SPACING.h10}px;
  padding: ${SPACING.h20}px;
  elevation: 4;
`;

const ManageNotificationModalHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const ManageNotificationModalBody = styled.View`
  background-color: white;
  margin: ${SPACING.h10}px ${SPACING.h15}px;
  elevation: 4;
  width: 90%;
  border-radius: ${SPACING.h10}px;
`;

const ManageNotificationOptionWrapper = styled.View`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // padding: ${SPACING.h15}px;
  // align-items: center;
`;


const ManageNotificationOptionText = styled.Text`
  color: black;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f14 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f14}px;
`;

const MadalNotificationButtonWrapper = styled.TouchableOpacity`
  width: 90%;
`;

const EditText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f11 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f11 : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold; 
  margin-left: ${SPACING.h15}px;
  `;

  const ButtonContainer = styled.View`
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

export {ManageNotificationModalMainContainer, ButtonContainer,ManageNotificationModalInnerContainer, ManageNotificationModalHeader, ManageNotificationModalHeadingText, ManageNotificationModalBody, ManageNotificationOptionWrapper, ManageNotificationOptionText, MadalNotificationButtonWrapper,EditText};


import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {FONT_SIZE, isTablet, SPACING} from '../../constants';

const CompleteAppointmentModalMainContainer = styled.View`
  background-color: white;
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
  height: 100%;
`;

const CompleteAppointmentModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompleteAppointmentModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  border-top-right-radius: ${SPACING.h10}px;
  border-top-left-radius: ${SPACING.h10}px;
  padding: ${SPACING.h10}px;
  padding-right: ${SPACING.h20}px;
  padding-left: ${SPACING.h20}px;
  elevation: 4;
`;

const CompleteAppointmentModalHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const CompleteAppointmentModalBody = styled.Pressable`
  background-color: white;
  margin: ${SPACING.h5}px;
  display: flex;
  flex-direction: row;
  // padding: ${SPACING.h20}px;
  elevation: 4;
  width: 90%;
  border-radius: ${SPACING.h10}px;
  // margin-bottom: ${SPACING.h30}px;
  justify-content: space-between;
  align-items: center;
`;

const CompleteAppointmentModalBodyPrimaryText = styled.Text`
  color: grey;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  margin: ${SPACING.h10}px;
`;

export {
  CompleteAppointmentModalMainContainer,
  CompleteAppointmentModalInnerContainer,
  CompleteAppointmentModalHeader,
  CompleteAppointmentModalHeadingText,
  CompleteAppointmentModalBody,
  CompleteAppointmentModalBodyPrimaryText,
};

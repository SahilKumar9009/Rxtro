import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  HEIGHT,
  isTablet,
  SPACING,
} from '../../constants';

const AppointmentDetailScreenCardContainer = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${commonBorderColor};
  max-width: 100%;
`;

const AppointmentScreenInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h15}px;
  /* max-width: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? '100%'
      : '100%'
    : isTablet
    ? '45%'
    : '100%'}; */
`;

const AppointmentDetailScreenDetailText = styled.Text`
  color: black;
  font-size: ${FONT_SIZE.f16}px;
  font-weight: bold;
`;

const AppointmentDetailHeading = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f15}px;
  font-weight: bold;
  color: black;
  margin: ${SPACING.h5}px 0px;
`;

const AppointmentDetailInfoText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  line-height: ${SPACING.h15}px;
`;

const AppointmentDetailParticipantWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h10}px ${SPACING.h15}px;
`;

const AppointmentDetailParticipantHeading = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  font-weight: bold;
  margin-bottom: ${SPACING.h15}px;
`;

const AppointmentDetailPlaceWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h15}px;
  padding-bottom: ${SPACING.h150}px;
`;

const AppointmentDetailPlaceHeading = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  font-weight: bold;
  margin-bottom: ${SPACING.h15}px;
`;

const AppointmentDetailButtonWrapper = styled.TouchableOpacity`
  margin-bottom: ${SPACING.h15}px;
  width: 80%;
  align-self: center;
`;

const AppointmentDetailBottomContainer = styled.View`
  position: absolute;
  bottom: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? '90'
      : '0'
    : isTablet
    ? '90'
    : '0'}px;
  width: 100%;
  background-color: white;
`;

export {
  AppointmentDetailScreenCardContainer,
  AppointmentScreenInfoContainer,
  AppointmentDetailHeading,
  AppointmentDetailInfoText,
  AppointmentDetailParticipantWrapper,
  AppointmentDetailParticipantHeading,
  AppointmentDetailPlaceWrapper,
  AppointmentDetailPlaceHeading,
  AppointmentDetailBottomContainer,
  AppointmentDetailButtonWrapper,
  AppointmentDetailScreenDetailText,
};

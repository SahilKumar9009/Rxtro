import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  blueColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  SPACING,
  WIDTH,
} from '../../constants';

const ParticipantDoctorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${SPACING.h5}px 0px;
`;

const ParticipantDoctorImage = styled.Image`
  width: ${WIDTH.w20}px;
  height: ${WIDTH.w20}px;
  border-radius: 500px;
  border-color: ${mainBackgroundColor};
  border-width: 1px;
`;

const ParticipantDoctorName = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  margin-left: ${SPACING.h10}px;
  text-transform: capitalize;
`;

const ParticipantDoctorDesignation = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: grey;
  font-style: italic;
  margin-left: ${SPACING.h5}px;
`;

const ParticipantDoctorContribution = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: ${blueColor};
  margin-left: auto;
  font-weight: bold;
`;

export {
  ParticipantDoctorWrapper,
  ParticipantDoctorImage,
  ParticipantDoctorName,
  ParticipantDoctorDesignation,
  ParticipantDoctorContribution,
};

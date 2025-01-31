import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  blueColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  SPACING,
  successButtonColor,
} from '../../constants';

const AppointmentCardMainContainer = styled.TouchableOpacity`
  display: flex;
  background-color: ${(props: {isGreen: boolean; isBlue: boolean}) =>
    props.isGreen
      ? successButtonColor
      : props.isBlue
      ? mainBackgroundColor
      : 'white'};
  flex-direction: column;
  elevation: 3;
  border-radius: 5px;
  padding: 15px;
  margin-right: 10px;
  border-width: 1px;
  border-color: white;
`;

const AppointmentCardDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const AppointmentCardPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f7
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f7
    : FONT_SIZE.f13}px;
  color: ${(props: {isGreen: boolean; isBlue: boolean}) =>
    props.isGreen ? 'white' : props.isBlue ? 'white' : 'black'};
  margin: ${SPACING.h10}px 0px;
  font-weight: bold;
  margin-right: auto;
  width: 90%;
`;

const AppointmentCardLocationContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const AppointmentCardSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f7
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f7
    : FONT_SIZE.f12}px;
  color: ${(props: {isGreen: boolean; isBlue: boolean}) =>
    props.isGreen ? 'white' : props.isBlue ? 'white' : 'black'};
  align-self: center;
  padding-left: ${SPACING.h5}px;
`;

const AppointmentCardStatusText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f7
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f7
    : FONT_SIZE.f12}px;
  color: ${(props: {isGreen: boolean; isBlue: boolean}) =>
    props.isGreen ? 'white' : props.isBlue ? 'white' : mainBackgroundColor};
  padding-left: ${SPACING.h5}px;
  margin-top: -${SPACING.h5}px;
  margin-right: -${SPACING.h5}px;
`;

export {
  AppointmentCardMainContainer,
  AppointmentCardDetailContainer,
  AppointmentCardPrimaryText,
  AppointmentCardLocationContainer,
  AppointmentCardSecondaryText,
  AppointmentCardStatusText,
};

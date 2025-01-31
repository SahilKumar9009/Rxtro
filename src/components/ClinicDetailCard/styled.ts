import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {blueColor, FONT_SIZE, isTablet, SPACING, WIDTH} from '../../constants';

const ClinicDetailMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h5}px 0px;
`;

const ClinicDetailCardWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${SPACING.h5}px 0px;
  width: 90%;
`;

const ClinicDetailAdressWrapper = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  width: 80%;
`;

const ClinicDetailBoldText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: black;
  font-weight: bold;
  width: 75%;
`;

const ClinicDetailPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: black;
  width: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? WIDTH.w50
      : WIDTH.w100
    : isTablet
    ? WIDTH.w50
    : WIDTH.w100}px;
`;

const ClinicDetailTouchableWrapper = styled.TouchableOpacity``;

const ClinicDetailPhoneNumber = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: ${blueColor};
`;

export {
  ClinicDetailMainContainer,
  ClinicDetailCardWrapper,
  ClinicDetailBoldText,
  ClinicDetailPrimaryText,
  ClinicDetailTouchableWrapper,
  ClinicDetailPhoneNumber,
  ClinicDetailAdressWrapper,
};

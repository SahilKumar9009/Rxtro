import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  isTablet,
  SPACING,
  WIDTH,
} from '../../constants';

const DateCardContainer = styled.View`
  display: flex;
  width: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? WIDTH.w25
      : WIDTH.w35
    : isTablet
    ? WIDTH.w25
    : WIDTH.w35}px;
  background-color: white;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  elevation: 3;
  border-bottom-width: 2px;
  border-color: ${commonBorderColor};
`;

const DayText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  margin-top: ${SPACING.h15}px;
  font-weight: bold;
`;

const MonthText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
`;

export {DateCardContainer, DayText, MonthText};

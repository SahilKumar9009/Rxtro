import {Platform, View} from 'react-native';
import {FONT_SIZE, SPACING, WIDTH, isTablet} from './../../constants/constants';
import styled from 'styled-components/native';

const Card = styled.View`
  background-color: #fff;
  border-radius: ${SPACING.h10}px;
  padding: ${SPACING.h8}px;
  margin: ${SPACING.h5}px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  border-color: #ccc;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #d1d1d6;
  padding: ${SPACING.h6}px 0;
`;

const Label = styled.Text`
  font-weight: 600;
  width: ${WIDTH.w50}px;
  margin-right: ${SPACING.h8}px;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  color: #333333;
`;

const ValueText = styled.Text`
  flex: 2;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  font-weight: 500;
  color: ${({color}) => color};
`;

const StatusText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({color}) => color};
`;

const Innercontainer = styled.View`
  border-width: 1;
  border-color: #d1d1d6;
  border-radius: ${SPACING.h10}px;
`;

export {Card, Row, Innercontainer, Label, ValueText, StatusText};

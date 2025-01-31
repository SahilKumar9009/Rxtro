import {Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SPACING, commonBorderColor} from '../../constants';

const Container = styled.View`
  background-color: 'red';
`;

const Card = styled.View`
  border-radius: ${SPACING.h8}px;
  margin: ${SPACING.h10}px 16px;
  padding: ${SPACING.h8}px;
  elevation: 3;
  border-width: 1px;
  border-color: ${commonBorderColor};
  background-color: white;
  border-radius: ${SPACING.h6}px;
  shadow-offset: 1px 3px;
  shadow-opacity: 0.5;
  shadow-radius: 4px;
`;

const InnerContainer = styled.View`
  border-width: 1px;
  border-color: #d1d1d6;
  border-radius: ${10}px;
  padding: ${SPACING.h6}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #d1d1d6;
  padding-top: ${SPACING.h10}px;
  padding-right: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const Label = styled.Text`
  font-weight: 500;
  padding-right: ${SPACING.h8}px;
  color: #666666;
  font-size: 12px;
  flex: 1;
`;

const Value = styled.Text`
  flex: 2;
  font-size: 12px;
  color: black;
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 170%;
  background-color: #d1d1d6;
  margin-right: ${SPACING.h10}px;
  margin-left: ${SPACING.h10}px;
`;

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  padding: 9px;
  border-radius: ${SPACING.h8}px;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export {
  Container,
  Card,
  InnerContainer,
  Row,
  Label,
  Value,
  VerticalLine,
  Button,
  ButtonText,
};

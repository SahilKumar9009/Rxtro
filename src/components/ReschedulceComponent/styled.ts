import { TouchableOpacity, Pressable, Platform } from 'react-native';
import styled from 'styled-components/native';
import RNText from '../RNText';
import {SPACING, commonBorderColor} from '../../constants';

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  padding: ${SPACING.h10}px;
  flex-direction: row;
  flex: 1;
`;

const ModalView = styled.View`
  background-color: white;
  border-radius: ${SPACING.h10}px;
  padding: ${SPACING.h6}px;
  width: 90%;
`;

const Title = styled(RNText)`
  color: #070f37;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${SPACING.h10}px;
  text-align: center;
`;

const CancelButton = styled(TouchableOpacity)`
  width: 270px;
  align-self: center;
  background-color: #d4d4d4;
  padding-vertical: ${SPACING.h10}px;
  border-radius: ${SPACING.h6}px;
  margin-top: ${SPACING.h20}px;
  align-items: center;
`;

const CancelText = styled(RNText)`
  font-weight: bold;
  color: #666666;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #d1d1d6;
  padding-vertical: ${SPACING.h6}px;
`;

const Label = styled(RNText)`
  font-weight: 600;
  margin-horizontal: ${SPACING.h6}px;
  font-size: 11px;
  color: black;
  width: 100px;
`;

const Value = styled(RNText)`
  color: black;
  flex: 2;
  font-size: 12px;
`;

const VerticalLine = styled.View`
  width: 1px;
  height: 200%;
  background-color: #d1d1d6;
  margin-horizontal: ${SPACING.h10}px;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatusText = styled(Pressable)`
  margin-left: ${SPACING.h6}px;
  font-weight: bold;
`;

const Card = styled.View`
 border-width: ${Platform.OS === 'ios' ? '1px' : '0.1px'};
  border-color: ${commonBorderColor};
  elevation: 2;
`;
export {
  ModalBackground,
  ModalContainer,
  ModalView,
  CancelButton,
  CancelText,
  Row,
  Title,
  Value,
  Label,
  VerticalLine,
  StatusContainer,
  StatusText,
  Card,
};

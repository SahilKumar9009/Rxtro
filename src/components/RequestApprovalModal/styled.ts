import { Platform, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import {FONT_SIZE, HEIGHT, SPACING, isTablet} from '../../constants';

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled.View`
  width: 90%;
  background-color: white;
  border-radius: ${SPACING.h20}px;
  padding: ${SPACING.h20}px;
  shadow-color: #000;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;
`;

const ModalTitle = styled.Text`
   font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f16
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  color: #000000;
  font-weight: bold;
  text-align: center;
`;

const Line = styled.View`
  height: 1px;
  background-color: #cfcfcf;
  margin: ${SPACING.h8}px 0px;
`;

const MeetingTypeText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  margin-bottom: ${SPACING.h10}px;
  color: #000000;
  font-weight: 500;
`;

const RequisitionMessage = styled.Text`
  color: #000000de;
  font-weight: 500;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
`;

const Input = styled.TextInput`
  height: ${HEIGHT.h35}px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: ${SPACING.h5}px;
  padding: ${SPACING.h10}px;
  margin: ${SPACING.h10}px 0px;
`;

const CharCount = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  color: #999;
  margin-bottom: ${SPACING.h10}px;
`;

const ButtonContainer = styled.View`
  margin-top: ${SPACING.h20}px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: ${SPACING.h10}px;
  border-radius: ${SPACING.h5}px;
  align-items: center;
  margin-bottom: ${SPACING.h10}px;
  justify-content: center;
  margin: ${SPACING.h10}px;;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #ccc;
  padding: ${SPACING.h10}px;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  margin: ${SPACING.h10}px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const RequisitionMessageContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export {
  CenteredView,
  ModalView,
  ModalTitle,
  MeetingTypeText,
  Line,
  Input,
  CharCount,
  ButtonContainer,
  SubmitButton,
  CancelButton,
  ButtonText,
  RequisitionMessageContainer,
  RequisitionMessage,
};

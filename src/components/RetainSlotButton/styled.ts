import styled from 'styled-components/native';
import {SPACING, WIDTH} from '../../constants';

const Overlay = styled.Pressable`
  height: 12%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  padding: ${SPACING.h10}px;
  elevation: 5;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  color: #000000de;
  margin-bottom: 10px;
`;

const Line = styled.View`
  height: 1px;
  background-color: #cfcfcf;
  margin-vertical: 8px;
`;

const Subtitle = styled.Text`
  color: #070f37;
  font-size: 10px;
  width: 220px;
`;

const ConfirmationText = styled.Text`
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  color: #777;
  margin-vertical: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  /* justify-content: space-around; */
  padding-horizontal: 10px;
  margin-top: 16px;
`;

const SubmitButton = styled.Pressable`
  width: ${WIDTH.w140}px;
  background-color: #007bff;
  height: 43px;
  margin-right: 8px;
  border-radius: 8px;
  align-items: center;
  padding: ${SPACING.h10}px;
  justify-content: center;
`;

const SubmitText = styled.Text`
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-align: center;
`;

const CancelButton = styled.Pressable`
  width: ${WIDTH.w140}px;
  background-color: #d4d4d4;
  padding: ${SPACING.h10}px;
  height: 43px;
  margin-left: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const CancelText = styled.Text`
  color: #666666;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  margin-end: 12px;
  align-items: center;
`;

export {
  Overlay,
  ModalContainer,
  Title,
  Line,
  Subtitle,
  ConfirmationText,
  ButtonContainer,
  SubmitButton,
  SubmitText,
  CancelButton,
  CancelText,
  StatusContainer,
};

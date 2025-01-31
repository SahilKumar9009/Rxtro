import {Pressable, View} from 'react-native';
import styled from 'styled-components/native';
import RNText from '../RNText';
const ModalOverlay = styled(Pressable)`
  flex: ${({isPad}) => (isPad ? 2 : 1)};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalView = styled(View)`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ModalText = styled(RNText)`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: ${({isAndroid}) => (isAndroid ? 'roboto' : 'System')};
  color: #000000;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const ConfirmButton = styled(Pressable)`
  background-color: #007bff;
  padding: 8px;
  border-radius: 5px;
  margin-right: 10px;
  width: 100px;
  align-items: center;
`;

const ConfirmText = styled(RNText)`
  color: white;
  font-family: ${({isAndroid}) => (isAndroid ? 'roboto' : 'System')};
  font-size: 16px;
`;

const CancelButton = styled(Pressable)`
  background-color: #e0e0e0;
  padding: 8px;
  border-radius: 5px;
  width: 100px;
  align-items: center;
`;

const CancelText = styled(RNText)`
  color: #606060;
  font-family: ${({isAndroid}) => (isAndroid ? 'roboto' : 'System')};
  font-size: 16px;
`;

export {
  CancelText,
  CancelButton,
  ConfirmText,
  ConfirmButton,
  ButtonContainer,
  ModalText,
  ModalView,
  ModalOverlay,
};

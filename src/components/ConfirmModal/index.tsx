import React from 'react';
import {Modal, Platform} from 'react-native';
import {
  ModalOverlay,
  ModalView,
  ModalText,
  ButtonContainer,
  ConfirmButton,
  ConfirmText,
  CancelButton,
  CancelText,
} from './styled';
import { useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import { AnyAction } from 'redux';


type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const ConfirmModal = ({visible, message, onConfirm, onCancel, Item}) => {
 
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <ModalOverlay
        isPad={Platform.OS === 'ios' && Platform.isPad}
        onPress={onCancel}>
        <ModalView>
          <ModalText isAndroid={Platform.OS === 'android'}>{message}</ModalText>
          <ButtonContainer>
            <ConfirmButton onPress={onConfirm}>
              <ConfirmText isAndroid={Platform.OS === 'android'}>
                YES
              </ConfirmText>
            </ConfirmButton>
            <CancelButton onPress={onCancel}>
              <CancelText isAndroid={Platform.OS === 'android'}>
                CANCEL
              </CancelText>
            </CancelButton>
          </ButtonContainer>
        </ModalView>
      </ModalOverlay>
    </Modal>
  );
};

export default ConfirmModal;

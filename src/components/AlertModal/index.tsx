import React from "react";
import { Modal, Text, Pressable, View,  } from "react-native";
import { Title } from "react-native-paper";
import styled from "styled-components/native";
import { Overlay, ModalContainer, Message, ButtonText, Button } from "./styled";

export const AlertModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Overlay>
        <ModalContainer>
          <Title>Thank You!</Title>
          <Message>
            Thank you for registering. An automatic password has been emailed for your new account.
            Please check your inbox or spam folder and sign in.
          </Message>
          <Button onPress={onClose}>
            <ButtonText>OK</ButtonText>
          </Button>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

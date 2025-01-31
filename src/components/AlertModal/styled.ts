import styled from "styled-components/native";
import { SPACING } from "../../constants";
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 10px;
  padding: ${SPACING.h20}px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Message = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: ${SPACING.h20}px;
`;

const Button = styled.TouchableOpacity`
  background-color: #4caf50;
  border-radius: 5px;
  padding: ${SPACING.h10}px ${SPACING.h20}px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export {
    Button,
    ButtonText,
    Message,
    Title,
    Overlay,
    ModalContainer,
}
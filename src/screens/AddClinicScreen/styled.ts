import styled from "styled-components/native";
import { SPACING } from "../../constants";

const AddClinicMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h15}px;
  background-color: white;
  padding: ${SPACING.h15}px;
  border-radius: ${SPACING.h5}px;
`;

const AddClinicButtonWrapper = styled.TouchableOpacity`
  margin: 0px ${SPACING.h15}px;
  padding-bottom: ${SPACING.h150}px;
`;

export {AddClinicMainContainer, AddClinicButtonWrapper};
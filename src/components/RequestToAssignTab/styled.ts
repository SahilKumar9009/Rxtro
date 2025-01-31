import styled from "styled-components/native";
import { SPACING } from "../../constants";

const RequestToAssignTabMainContainer = styled.View`
  // padding-bottom: 150px;
`;

const RequestToAssignTabInnerContainer = styled.View``;

const RequestToAssignTabBottomWrapper = styled.View`
  position: absolute;
  bottom: ${SPACING.v75}px;
  width: 100%;
  background-color: white;
  padding: 0px ${SPACING.h20}px ${SPACING.h20}px ${SPACING.h20}px;
  elevation: 5
`;

export {RequestToAssignTabMainContainer, RequestToAssignTabInnerContainer, RequestToAssignTabBottomWrapper};
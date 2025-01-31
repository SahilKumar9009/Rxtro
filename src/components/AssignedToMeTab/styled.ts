import styled from "styled-components/native";
import { SPACING } from "../../constants";

const AssignedToMeTabMainContainer = styled.View`
  padding-bottom: 180px;
`;

const AssignedToMeTabInnerContainer = styled.View`

`;

const AssignedToMeTabBottomWrapper = styled.View`
  position: absolute;
  bottom: ${SPACING.v75}px;
  width: 100%;
  background-color: white;
  padding: 0px ${SPACING.h20}px ${SPACING.h20}px ${SPACING.h20}px;
  elevation: 5
`

export {AssignedToMeTabMainContainer, AssignedToMeTabInnerContainer, AssignedToMeTabBottomWrapper};
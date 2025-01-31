import styled from "styled-components/native";
import { SPACING } from "../../constants";


const ViewAvailabilityMainContainer = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const ViewAvailabilityInnerContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: ${SPACING.h10}px;
`;


export {ViewAvailabilityMainContainer, ViewAvailabilityInnerContainer}
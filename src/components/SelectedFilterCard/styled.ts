import styled from "styled-components/native";
import { FONT_SIZE, mainBackgroundColor, SPACING } from "../../constants";


const SelectedFilterMainContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const SelectedFilterHeadingText = styled.Text`
  color: black;
  align-self: center;
  ${FONT_SIZE.f12}px
`;

const SelectedFilterCardEachContainer = styled.View`
  display: flex;
  flex-direction: row;
  max-width: 50%;
  align-items: center;
  padding: ${SPACING.h5}px;
  border-radius: ${SPACING.h5}px;
  justify-content: space-around;
  background-color: rgba(31, 109, 156, 0.5);
  border-color: ${mainBackgroundColor};
  border-width: 1px;
`;

const SelectedFilterCardText = styled.Text`
  font-size: ${FONT_SIZE.f12}px;
  color: black;
  width: 80%;
`


export {SelectedFilterMainContainer, SelectedFilterCardEachContainer, SelectedFilterCardText, SelectedFilterHeadingText};


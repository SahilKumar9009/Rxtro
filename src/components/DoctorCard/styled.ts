import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, HEIGHT, isTablet, SPACING, WIDTH } from "../../constants";


const DoctorCardMainContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: ${Platform.OS === 'ios' ? Platform.isPad ? SPACING.h5 : SPACING.h5 : isTablet ? SPACING.h5 : SPACING.h10}px;
`;

const DoctorCardDetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DoctorCardImage = styled.Image`
  width: ${HEIGHT.h35}px;
  height: ${HEIGHT.h35}px;
  align-self: center;
  border-radius: 500px;
  margin-right: ${SPACING.h10}px;
`;

const DoctorNameText = styled.Text`
  font-size:  ${Platform.OS === 'ios' ? Platform.isPad ? 18 : FONT_SIZE.f13 : isTablet ? 18 : FONT_SIZE.f13}px;
  color: black;
`;

const DoctorDesignationText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? 16 : FONT_SIZE.f9 : isTablet ? 16 : FONT_SIZE.f9}px;
  color: grey;
`;


export {DoctorCardMainContainer, DoctorCardDetailsContainer, DoctorCardImage, DoctorNameText, DoctorDesignationText};
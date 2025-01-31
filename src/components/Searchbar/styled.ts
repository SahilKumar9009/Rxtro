import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, mainBackgroundColor, SPACING } from "../../constants";

const SearchBarMainContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: ${Platform.OS === 'ios' ? Platform.isPad ? SPACING.h10 : SPACING.h20 : isTablet ? SPACING.h10 : SPACING.h20}px 0px;
  background-color: ${mainBackgroundColor};
`;

const SearchbarInput = styled.TextInput`
  margin: 0 ${SPACING.h10}px;
  margin-top: ${SPACING.h20}px;
  margin-bottom: ${Platform.OS === 'ios' ? SPACING.h20 : 0}px
  padding: ${Platform.OS === 'ios' ? SPACING.h15 : SPACING.h10}px;
  width: 94%;
  border-radius: 20px;
  background-color: white;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  margin-right: auto;
`;

const IconTouchableWrapper = styled.TouchableOpacity`
  margin-right: ${SPACING.h25}px;
  margin-top: ${Platform.OS === 'ios' ? 0 : SPACING.h20}px;
`; 

const SearchBarSubheadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${mainBackgroundColor};
  padding: ${SPACING.h10}px ${SPACING.h15}px; 
`;

const SearchBarResetButtonWrapper = styled.TouchableOpacity`
  padding: ${SPACING.h5}px ${Platform.OS === 'ios' ? Platform.isPad ? SPACING.h10 : SPACING.h20 : isTablet ? SPACING.h10 : SPACING.h20}px;
  background-color: white;
  border-radius: ${SPACING.h5}px;
`;

const SearchBarButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13}px;
  color: ${mainBackgroundColor};
  font-weight: bold;
`;


export {SearchBarMainContainer, SearchbarInput, IconTouchableWrapper, SearchBarSubheadingContainer, SearchBarResetButtonWrapper, SearchBarButtonText};
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  SPACING,
} from '../../constants';

const TerritoryFilterModalMainContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const TerritoryFilterModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  elevation: 4;
  background-color: white;
  border-radius: ${SPACING.h10}px;
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const TerritoryFilterModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${SPACING.h10}px;
  background-color: white;
  border-radius: ${SPACING.h10}px;
  padding: ${SPACING.h20}px;
  elevation: 4;
`;

const TerritoryFilterModalHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const TerritoryFilterModalBodyWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${SPACING.h10}px;
  padding: ${SPACING.h10}px;
`;

const TerritoryFilterModalSubHeading = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? SPACING.h5
      : SPACING.h10
    : isTablet
    ? SPACING.h5
    : SPACING.h10}px;
  border-color: ${commonBorderColor};
  border-width: 1px;
  border-radius: ${SPACING.h5}px;
  background-color: ${mainBackgroundColor};
`;

const TerritoryFilterModalSubHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  color: white;
  font-weight: bold;
`;

const TerritoryFilterModalContentWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const TerritoryFilterEachContentWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${SPACING.h10}px;
`;

const TerritoryFilterModalText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  color: black;
`;

const TerritoryFilterModalButtonWrapper = styled.TouchableOpacity`
  margin-top: ${SPACING.h25}px;
  width: 90%;
`;

export {
  TerritoryFilterModalMainContainer,
  TerritoryFilterModalInnerContainer,
  TerritoryFilterModalHeader,
  TerritoryFilterModalHeadingText,
  TerritoryFilterModalBodyWrapper,
  TerritoryFilterModalSubHeading,
  TerritoryFilterModalSubHeadingText,
  TerritoryFilterModalContentWrapper,
  TerritoryFilterEachContentWrapper,
  TerritoryFilterModalText,
  TerritoryFilterModalButtonWrapper,
};

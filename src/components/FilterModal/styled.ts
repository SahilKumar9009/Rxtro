import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  SPACING,
} from '../../constants';
import {Platform} from 'react-native';

const FilterModalMainContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const FilterModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  elevation: 4;
  background-color: white;
  border-radius: ${SPACING.h10}px;
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const FilterModalHeader = styled.View`
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

const FilterModalHeadingText = styled.Text`
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

const FilterModalBodyWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${SPACING.h10}px;
  padding: ${SPACING.h10}px;
`;

const FilterModalSubHeading = styled.View`
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

const FilterModalSubHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f12}px;
  color: white;
  font-weight: bold;
`;

const FilterModalContentWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const FilterModalEachContentWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${SPACING.h10}px;
`;

const FilterModalTextWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${SPACING.h10}px;
`;

const FilterModalContentText = styled.Text`
  color: black;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f13}px;
  width: 80%;
`;

const FilterModalSmallText = styled.Text`
  color: grey;
  font-size: ${FONT_SIZE.f9}px;
`;

const FilterModalButtonWrapper = styled.TouchableOpacity`
  margin-top: ${SPACING.h25}px;
  width: 90%;
`;

export {
  FilterModalMainContainer,
  FilterModalInnerContainer,
  FilterModalHeader,
  FilterModalHeadingText,
  FilterModalBodyWrapper,
  FilterModalSubHeading,
  FilterModalSubHeadingText,
  FilterModalContentWrapper,
  FilterModalEachContentWrapper,
  FilterModalContentText,
  FilterModalButtonWrapper,
  FilterModalSmallText,
  FilterModalTextWrapper,
};

import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  isTablet,
  mainBackgroundColor,
} from '../../constants';
import {WIDTH, SPACING, FONT_SIZE} from '../../constants';

const MainScreenHeaderMainContainer = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${mainBackgroundColor};
  padding: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? SPACING.h10
      : SPACING.h15
    : isTablet
    ? SPACING.h5
    : SPACING.h15}px;
`;

const MainScreenHeaderImage = styled.Image`
  width: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? WIDTH.w25
      : WIDTH.w50
    : isTablet
    ? WIDTH.w25
    : WIDTH.w50}px;
  height: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? WIDTH.w25
      : WIDTH.w50
    : isTablet
    ? WIDTH.w25
    : WIDTH.w50}px;
  border-radius: 500px;
  border-width: 1px;
  border-color: ${commonBorderColor};
`;

const MainScreenHeaderTitle = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f14
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f14}px;
  color: white;
  margin-left: ${SPACING.h10}px;
  align-self: center;
  font-weight: bold;
`;

const MainScreenHeaderIconContainer = styled.View`
  width: ${WIDTH.w75}px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: auto;
  align-items: center;
`;

export {
  MainScreenHeaderMainContainer,
  MainScreenHeaderImage,
  MainScreenHeaderTitle,
  MainScreenHeaderIconContainer,
};

import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  FONT_SIZE,
  SPACING,
  HEIGHT,
  isTablet,
  mainBackgroundColor,
} from '../../constants';

const CommonHeadeMainContainer = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${mainBackgroundColor};
  padding: ${Platform.OS === 'ios'
      ? Platform.isPad
        ? SPACING.h10
        : SPACING.h20
      : isTablet
      ? SPACING.h10
      : SPACING.h20}px
    0px;
`;

const CommonHeaderBackIconContainer = styled.TouchableOpacity`
  align-self: center;
  margin-right: ${SPACING.h10}px;
  margin-left: ${SPACING.h10}px;
`;

const CommonHeaderInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const CommonHeaderContainerOne = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommonHeaderContainerTwo = styled.View`
  display: flex;
  flex-direction: row;
`;

const CommonHeaderPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  color: white;
  margin: ${SPACING.h10}px 0px;
  width: 90%;
`;

const CommonHeaderSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f11
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f11}px;
  color: white;
  padding-left: ${SPACING.h10}px;
  width: 65%;
`;

const CommonHeaderStatusText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f12}px;
  color: ${mainBackgroundColor};
  background-color: white;
  margin-top: auto;
  padding: ${SPACING.v2}px ${SPACING.h5}px;
  margin-right: ${SPACING.h10}px;
  margin-left: auto;
  font-weight: bold;
`;

export {
  CommonHeadeMainContainer,
  CommonHeaderBackIconContainer,
  CommonHeaderInnerContainer,
  CommonHeaderContainerOne,
  CommonHeaderContainerTwo,
  CommonHeaderPrimaryText,
  CommonHeaderSecondaryText,
  CommonHeaderStatusText,
};

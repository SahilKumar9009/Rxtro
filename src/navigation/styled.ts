import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  FONT_SIZE,
  HEIGHT,
  mainBackgroundColor,
  SPACING,
  isTablet,
  commonBorderColor,
} from '../constants';

const DrawerMainContainer = styled.View`
  position: ${Platform.OS === 'ios' ? 'absolute' : 'relative'};
  margin-top: -${Platform.OS === 'ios' ? (Platform.isPad ? SPACING.h30 : 0) : isTablet ? SPACING.h50 : SPACING.h60}px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DrawerInnerContainerOne = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: -${SPACING.h20}px;
  padding: ${SPACING.h60}px ${SPACING.h10}px ${SPACING.h30}px ${SPACING.h10}px;
  background-color: ${mainBackgroundColor};
`;

const UserProfileImage = styled.Image`
  width: ${HEIGHT.h75}px;
  height: ${HEIGHT.h75}px;
  border-radius: 500px;
  border-width: 1px;
  border-color: ${commonBorderColor};
`;

const UserCommonDetailsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`;

const UserNameText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f13
      : FONT_SIZE.f18
    : isTablet
    ? FONT_SIZE.f13
    : FONT_SIZE.f18}px;
  font-weight: bold;
  color: white;
  margin-bottom: ${SPACING.h5}px;
`;

const DrawerSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: white;
  font-weight: bold;
`;

const DrawerLinkText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: white;
  margin-top: ${SPACING.h10}px;
  padding: ${SPACING.v3}px;
  text-align: center;
  color: ${mainBackgroundColor};
  background-color: white;
  font-weight: bold;
`;

const DrawerInnerContainerTwo = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${SPACING.h6}px ${SPACING.h20}px;
`;

const LogoutButtonWrapper = styled.TouchableOpacity`
  margin-top: ${SPACING.h50}px;
  background-color: #f03d3d;
  border-radius: ${SPACING.h5}px;
  padding: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? SPACING.h7
      : SPACING.h20
    : isTablet
    ? SPACING.h7
    : SPACING.h20}px;
  margin: ${SPACING.h20}px ${SPACING.h10}px;
  width: 80%;
  align-self: center;
`;

const LogoutButtonText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f14
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f14}px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export {
  DrawerMainContainer,
  DrawerInnerContainerOne,
  UserProfileImage,
  UserCommonDetailsWrapper,
  UserNameText,
  DrawerSecondaryText,
  DrawerLinkText,
  DrawerInnerContainerTwo,
  LogoutButtonWrapper,
  LogoutButtonText,
};

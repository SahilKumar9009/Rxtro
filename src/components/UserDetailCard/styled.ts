import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {FONT_SIZE, isTablet, SPACING} from '../../constants';

const UserDetailCardMainContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: ${SPACING.h10}px 0px;
  justify-content: space-between;
  align-items: center;
`;

const UserDetailPrimaryText = styled.Text`
  color: black;
  font-weight: bold;
`;

const UserDetailSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: black;
  width: 40%;
`;

export {
  UserDetailCardMainContainer,
  UserDetailPrimaryText,
  UserDetailSecondaryText,
};

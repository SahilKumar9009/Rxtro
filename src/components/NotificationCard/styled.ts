import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor, FONT_SIZE, isTablet, secondaryFontColor, SPACING,
} from '../../constants';

const NotificationCardMainContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin: ${SPACING.h10}px;
  border-radius: ${SPACING.h5}px;
  elevation: 4;
`;

const NotificationCardWrapperOne = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${SPACING.h10}px;
`;

const NotificationCardPrimaryText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f11 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f11}px;
  color: black;
  margin-left: ${SPACING.h5}px;
`;

const NotificationCardWrapperTwo = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${SPACING.h10}px;
  border-color: ${commonBorderColor};
  border-width: 1px;
`;

const NotifcationCardHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f13}px;
  color: black;
  font-weight: bold;
  margin-bottom: ${SPACING.h5}px;
`;

const NotificationCardAddressWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const NotificationCardSecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f11 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f11}px;
  color : ${secondaryFontColor};
  margin-left: ${SPACING.h5}px;
`;

const StatusText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f11 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f11}px;
  color: green;
`;

const NotificationCardWrapperThree = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${SPACING.h10}px;
`;

export {
  NotificationCardMainContainer, NotificationCardWrapperOne, NotificationCardPrimaryText, NotificationCardWrapperTwo, NotifcationCardHeadingText, NotificationCardSecondaryText, NotificationCardAddressWrapper, NotificationCardWrapperThree, StatusText,
};

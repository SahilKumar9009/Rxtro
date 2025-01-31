import styled from 'styled-components/native';
import {FONT_SIZE, isTablet, SPACING} from '../../constants';
import { Platform } from 'react-native';

const CurrentTabMainContainer = styled.ScrollView`
  flex-direction: column;
  padding-bottom: ${SPACING.h50}px;
`;

const CurrentTabInnerContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${SPACING.h5}px;
`;
const CurrentTabAppointmentContainer = styled.View`
  display: flex;
  margin: ${SPACING.h10}px;
  margin-right: ${SPACING.h20}px;
  padding-right: ${SPACING.h10}px;
`;

const EmptyContainerView = styled.View`
display: flex;
align-items: center;
justify-content: center;

margin: ${SPACING.v200}px ${SPACING.h20}px;

`
 
 

const MessageText = styled.Text`
  font-size: 16px;
  color: #000; /* Optional: Adjust as needed */
  text-align: center;
  margin-bottom: 10px;
`;

const LinkText = styled.Text`
  color: #293b8f;
  text-decoration-line: underline;
`;

const ShowMoreText = styled.Text`
  color: #2b3990;
  text-align: right;
  text-decoration-line: underline;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  font-weight: 600;
  margin-right: 3px;
`;


export {
  CurrentTabMainContainer,
  CurrentTabInnerContainer,
  CurrentTabAppointmentContainer,
  EmptyContainerView,
  MessageText,
  LinkText,
  ShowMoreText
};

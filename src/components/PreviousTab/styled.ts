import styled from 'styled-components/native';
import {FONT_SIZE, isTablet, SPACING} from '../../constants';
import { Platform } from 'react-native';

const PreviousTabMainContainer = styled.View`
  padding-bottom: ${SPACING.h200}px;
`;

const PreviousTabInnerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: ${SPACING.h5}px;
`;

const PreviousTabAppointmentContainer = styled.View`
  margin: ${SPACING.h10}px 20px ${SPACING.h10}px ${SPACING.h10}px;
  padding-right: ${SPACING.h10}px;
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
  PreviousTabMainContainer,
  PreviousTabInnerContainer,
  PreviousTabAppointmentContainer,
  ShowMoreText
};

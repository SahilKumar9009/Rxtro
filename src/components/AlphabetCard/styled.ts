import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  isTablet,
  SPACING,
  WIDTH,
} from '../../constants';

const AlphabetMainContainer = styled.View`
  padding-top: ${SPACING.h10}px;
  background-color: white;
  padding: 8px;
  border-right-width: 1px;
  border-color: ${commonBorderColor};
`;

const AlphabetContainer = styled.TouchableOpacity`
  flex-direction: column;
  margin: ${SPACING.h5}px 0px;
`;

const AlphabetText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f12}px;
  color: black;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

export {AlphabetMainContainer, AlphabetContainer, AlphabetText};

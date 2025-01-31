import {Platform, View} from 'react-native';
import styled from 'styled-components/native';
import {
  Colors,
  FONT_SIZE,
  SPACING,
  WIDTH,
  isTablet,
  mainBackgroundColor,
} from '../../constants';

const Container = styled.View`
  margin-inline-end: ${SPACING.h10}px;
  margin: ${SPACING.h10}px 0px;
  width: ${Platform.OS == 'ios'
    ? Platform.isPad
      ? WIDTH.w300
      : WIDTH.w220
    : isTablet
    ? WIDTH.w220
    : WIDTH.w220}px;
`;

const OptionText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: ${props => (props.isRed ? 'red' : mainBackgroundColor)};
  text-align: left;
  width: ${props => props.width || 'auto'}px;
`;

const Option = styled.TouchableOpacity`
  width: ${Platform.OS == 'ios'
    ? Platform.isPad
      ? '100%'
      : `${WIDTH.w200}px`
    : isTablet
    ?  '100%'
    : `${WIDTH.w200}px`};
  flex-direction: row;
  padding: ${SPACING.h10}px;
  border-bottom-color: black;
  border-bottom-width: ${props => (props.isLast ? 0 : 0.3)}px;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: ${Platform.OS == 'ios'
    ? Platform.isPad
      ? '80%'
      : `${WIDTH.w220}px`
    : isTablet
    ? '80%'
    : `${WIDTH.w220}px`};
  margin-left: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? '-55%'
      : 0
    : isTablet
    ? '-55%'
    : 0};
  margin-top: ${Platform.OS === 'ios' && Platform.isPad ? '4px' : '0'};
  margin-top: ${SPACING.h10}px;
  background-color: ${Colors.WHITE};
  border-radius: ${SPACING.h5}px;
  padding: ${SPACING.h10}px;
  border-width: 0.3px;
  max-height: 400px;
`;

const IconContainer = styled.View`
  width: 25px;
  height: 25px;
  justify-content: center;
`;

const SelectedText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: ${mainBackgroundColor};
  font-weight: 700;
`;

const DropdownButton = styled.TouchableOpacity`
  height: 30px;
  border-width: 1px;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f8
    : isTablet
    ? FONT_SIZE.f3
    : FONT_SIZE.f8}px;
  width: ${Platform.OS == 'ios'
    ? Platform.isPad
      ? WIDTH.w75
      : WIDTH.w220
    : isTablet
    ? WIDTH.w75
    : WIDTH.w220}px;
  border-radius: ${SPACING.h5}px;
  flex-direction: row;
  align-items: center;
  margin-right: 17px;
  justify-content: center;
  background-color: ${Colors.WHITE};
  border-color: ${mainBackgroundColor};
`;

export {
  Container,
  OptionText,
  Option,
  ModalContainer,
  IconContainer,
  SelectedText,
  DropdownButton,
};

import { Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import {
  FONT_SIZE,
  SPACING,
  HEIGHT,
  isTablet,
  WIDTH,
  mainBackgroundColor,
} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';

const Container = styled.View`
  display: flex;
`;

const UpperPressable = styled.Pressable`
height: 43%;
background-color: rgba(0, 0, 0, 0.5);
`;

const FilterContainer = styled.View`
  display: flex;
  padding: ${SPACING.h25}px;
  background-color: white;
  border-top-left-radius: ${SPACING.v15}px;
  border-top-right-radius: ${SPACING.v15}px;
  elevation: 10;
  align-self: center;
  width: 100%;
`;

const CrossIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  font-weight: bold;
  margin-bottom: ${SPACING.h25}px;
  color: #000000;
  font-family: ${Platform.OS === 'android' ? 'roboto' : 'System'};
`;

const DropdownContainer = styled.View`
  height: 15%;
  border-radius: ${SPACING.v10}px;
  position: relative;
`;

const FloatingLabel = styled.Text`
  position: absolute;
  top: -34%;
  left: ${SPACING.h10}px;
  background-color: white;
  padding: 0${SPACING.h5}px;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  z-index: 1;
  color: #999;
  font-family: ${Platform.OS === 'android' ? 'roboto' : 'System'};
`;

const StyledDropdown = styled(Dropdown)`
  height: ${HEIGHT.h35}px;
  border-color: gray;
  border-width: 1px;
  border-radius: ${SPACING.v5}px;
  padding: 0 ${SPACING.h8}px;
  justify-content: center;
`;

const SelectedTextStyle = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  color: '#999',
`


const PlaceholderStyle = styled.Text`
font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  color: '#999',
`
 


const ItemTextStyle = styled.Text`
font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  color: '#999',
  `

const ApplyButton = styled.Pressable`
  /* margin-top: ${SPACING.v20}px; */
  justify-content: center;
  background-color: #e4e4e6;
  height: ${HEIGHT.h35}px;
  border-radius: ${SPACING.v5}px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #6a6a6a;
  font-weight: 500;
  font-size: ${FONT_SIZE.f14}px;
`;

const CancelButton = styled.Pressable`
  margin-top: ${SPACING.v10}px;
  justify-content: center;
  height: ${HEIGHT.h35}px;
  background-color: #e4e4e6;
  border-radius: 5px;
  align-items: center;
  margin-bottom: ${SPACING.v100}px;
`;

const CancelButtonText = styled.Text`
  color: #6a6a6a;
  font-weight: 500;
  font-size: ${FONT_SIZE.f14}px;
`;

const LowerPressable = styled.Pressable`
  height: 40%;
`;

export {
  Container,
  UpperPressable,
  PlaceholderStyle,
  ItemTextStyle,
  ApplyButton,
  ButtonText,
  CancelButton,
  CancelButtonText,
  LowerPressable,
  FilterContainer,
  SelectedTextStyle,
  CrossIconContainer,
  FloatingLabel,
  StyledDropdown,
  DropdownContainer,
  Title,
};

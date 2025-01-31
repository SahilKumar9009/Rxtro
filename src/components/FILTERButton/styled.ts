import {Platform} from 'react-native';
import {FONT_SIZE, SPACING, WIDTH, isTablet} from './../../constants/constants';
import styled from 'styled-components/native';
import {HEIGHT} from '../../constants';

const FilterContainer = styled.View`
  display:flex;
  /* width: '100%'; */
  padding: ${SPACING.h10}px;
  background-color: white;
  border-top-left-radius: ${SPACING.h5}px;
  border-top-right-radius: ${SPACING.h5}px;
  border-bottom-left-radius:  ${SPACING.h5}px;;
  border-bottom-right-radius: ${SPACING.h5}px;;
  elevation: 10;
  align-self: center;
    /* Ensure the border radius works correctly */
`;

const CrossIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DropdownContainer = styled.View`
  height: ${HEIGHT.h35}px;
  border-radius: ${SPACING.h10}px;
  margin: ${Platform.OS == 'ios' ? SPACING.h6 : SPACING.h10}px ${SPACING.h10}px;
  position: relative;
`;

const FloatingLabel = styled.Text`
  position: absolute;
  top: ${-SPACING.h8}px;
  left: ${SPACING.h10}px;
  background-color: white;
  padding: 0 ${SPACING.h5}px;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  z-index: 1;
  color: #999;
  font-family: ${Platform.OS === 'android' ? 'roboto' : 'System'};
`;

const ApplyFilterButton = styled.TouchableOpacity`
  justify-content: center;
  background-color: #e4e4e6;
  height: ${HEIGHT.h35}px;
  margin: ${Platform.OS == 'ios' ? SPACING.h8 : SPACING.h8}px ${SPACING.h10}px;
  border-radius: ${SPACING.h5}px;
  align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
  margin: ${SPACING.h10}px 0;
  justify-content: center;
  height: ${HEIGHT.h35}px;
  margin: ${Platform.OS == 'ios' ? SPACING.h8 :  SPACING.h8}px ${SPACING.h10}px;
  background-color: #e4e4e6;
  border-radius: ${SPACING.h5}px;
  align-items: center;
`;
const ButtonText = styled.Text`
  color: #6a6a6a;
  font-family: ${Platform.OS === 'android' ? 'roboto' : 'System'};
  font-weight: 500;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
`;
const SelectedTextStyle = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f5
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f8}px;
color: #6a6a6a;
  /* font-family: ${Platform.OS === 'android' ? 'roboto' : undefined}; */
`;

const PlaceHolderStyle = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f3
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
color: #6a6a6a;
`;

const Title = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f10
      : FONT_SIZE.f9
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f13}px;
  font-weight: bold;
  margin-bottom: ${SPACING.h15}px;
  /* color: #000000; */
`;

const DropdownStyling = styled.View`
  height: ${HEIGHT.h100}px;
  border-color: gray;
  border-width: 1;
  border-radius: ${SPACING.h5}px;
  justify-content: center;
`;

export {
  FilterContainer,
  CrossIconContainer,
  DropdownContainer,
  FloatingLabel,
  ApplyFilterButton,
  CancelButton,
  ButtonText,
  SelectedTextStyle,
  PlaceHolderStyle,
  Title,
  DropdownStyling,
};

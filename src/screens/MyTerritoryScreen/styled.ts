import {Platform, Text, View, TextInput} from 'react-native';
import styled from 'styled-components/native';
import {
  FONT_SIZE,
  HEIGHT,
  isTablet,
  mainBackgroundColor,
  SPACING,
  WIDTH,
} from '../../constants';

const MyTerritoryHeadingContainer = styled.View`
  padding: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? SPACING.h10
      : SPACING.h15
    : isTablet
    ? SPACING.h5
    : SPACING.h15}px;
  background-color: ${mainBackgroundColor};
  flex-direction: row;
  align-items: center;
`;

const MyTerritoryHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f10
    : FONT_SIZE.f12}px;
  color: white;
`;

const MyTerritoryWrapper = styled.View`
  // display: flex;
  // flex-direction: column;
  // width: 93%;
`;

const MyTerritoryButtonWrapper = styled.TouchableOpacity`
  width: 50%;
  align-self: center;
`;

const MyTerritoryInnerContainer = styled.View`
  flex-direction: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? 'row'
      : 'row'
    : isTablet
    ? 'row'
    : 'row'};
`;

const ButtonWrapper = styled.View`
  padding: ${SPACING.h5}px;
  margin-bottom: ${SPACING.h15}px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.3px;
  border-color: #ccc;
`;

const FilterSearchContainer = styled.View`
  background-color: white;
  margin: 0 ${SPACING.h10}px;
  margin-right: ${Platform.OS == 'ios' && Platform.isPad ? 46 : 39}px;
`;

const SearchContainer = styled.View`
  border-radius: ${isTablet ? SPACING.h5 : SPACING.h10}px;
  margin: ${SPACING.h10}px 0;
  height: ${Platform.OS == 'ios' && Platform.isPad
    ? SPACING.h30
    : isTablet
    ? SPACING.h30
    : SPACING.h35}px;
  flex-direction: row;
  background-color: white;
  align-items: center;
  border-radius: ${SPACING.h5}px;
  ${Platform.OS === 'ios'
    ? `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3.84px;
  `
    : `
    elevation: 3;
  `}
`;

const FilterContainer = styled.View`
  background-color: #eee;
  padding: ${SPACING.h5}px 0px;
  border-radius: ${SPACING.h5}px;
`;

const FilterButtonText = styled.Text`
  color: #293b8f;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  text-align: center;
  margin: 0 ${SPACING.h20}px;
`;

const ShowMoreContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: ${SPACING.h200}px;
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
const StyledArrow = styled.View`
  height: ${HEIGHT.h100}px;
  width: ${WIDTH.w20}px;
`;

const AlphabetContainer = styled.View`
  margin-top: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? `-${HEIGHT.h75}px`
      : `-${HEIGHT.h75}px`
    : isTablet
    ? `-${HEIGHT.h90}px`
    : `-${HEIGHT.h75}px`};

  margin-bottom: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? `${SPACING.h30}px`
      : `${SPACING.h30}px`
    : isTablet
    ? `${SPACING.h200}px`
    : `${SPACING.h15}px`};
`;

const AddCustomerContainer = styled.View`
  flex-direction: row;
  background-color: white;
  padding: ${2}px;
  margin-right: 2px;
  /* height: ${HEIGHT.h10}px; */
  border-radius: 4px;
  width: 130px;
  justify-content: center;
  align-items: center;
`;

const AddCustomerText = styled.Text`
  margin-right: ${SPACING.h5}px;
  color: black;
`;

const InputContainer = styled.TextInput`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: ${HEIGHT.h35}px;
  background-color: transparent;
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f11}px;
  border-radius: ${SPACING.h6}px;
  padding-left: ${SPACING.h8}px;
  padding-right: ${SPACING.h8}px;
`;

export {
  MyTerritoryHeadingContainer,
  MyTerritoryHeadingText,
  MyTerritoryWrapper,
  MyTerritoryInnerContainer,
  MyTerritoryButtonWrapper,
  SearchContainer,
  FilterContainer,
  FilterButtonText,
  ButtonWrapper,
  ShowMoreContainer,
  ShowMoreText,
  StyledArrow,
  FilterSearchContainer,
  AlphabetContainer,
  AddCustomerContainer,
  AddCustomerText,
  InputContainer,
};

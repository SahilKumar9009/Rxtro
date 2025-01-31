import styled from 'styled-components/native';
import {FONT_SIZE, HEIGHT, SPACING, WIDTH, isTablet} from '../../constants';
import {Platform} from 'react-native';

const Container = styled.View`
  flex: 1;
`;

const DropdownContainer = styled.View`
  margin-bottom: ${SPACING.h10}px;
`;

const Dropdown = styled.View`
  border-color: #ccc;
`;

const DropDownContainer = styled.View`
  border-color: #ccc;
  margin-bottom: ${SPACING.h10}px;
`;

const Input = styled.TextInput`
  z-index: 1;
`;

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING.h10}px;
  z-index: 1;
`;

const SwitchLabel = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f12}px;
`;

const SwitchToggle = styled.Switch`
  transform: 0.8;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #007aff;
  /* padding: 12px, 0px; */
  padding: ${SPACING.h10}px 0;
  border-radius: ${SPACING.h5}px;
  margin-top: 16px;
  z-index: 1;
`;

const SearchButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

const ErrorMessage = styled.Text`
  color: red;
  margin-top: 8px;
  font-size: 14px;
`;

const DropdownContainerTop = styled.View`
  margin: ${SPACING.h5}px ${SPACING.h10}px;
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
export {
  Container,
  DropdownContainer,
  ErrorMessage,
  SearchButtonText,
  SearchButton,
  SwitchToggle,
  SwitchLabel,
  SwitchContainer,
  Input,
  DropDownContainer,
  DropdownContainerTop,
  ShowMoreText
};

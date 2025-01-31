import styled from 'styled-components/native';
import {
  Colors,
  commonBorderColor,
  FONT_SIZE,
  HEIGHT,
  isTablet,
  SPACING,
  WIDTH,
} from '../../constants';
import {Platform} from 'react-native';

const MyTerritoryCardMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-width: 1px;
  border-color: ${commonBorderColor};
  elevation: 3;
  margin: ${SPACING.h10}px ${SPACING.h10}px;
`;

const HeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
  color: #070f37;
  width: ${WIDTH.w150}px;
`;
const IconHeadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledFontIcon = styled.Image`
  margin-top: ${2}px;
`;

const ButtonContainer = styled.View`
  margin-right: 15px;
  margin-top: 12px;
  height: 30px;
  justify-content: flex-end;
`;

const StyledPressable = styled.Pressable`
  background-color: ${Colors.RED_COLOR};
  height: 30px;
  width: ${20}px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const AddressText = styled.Text`
  font-family: ${Platform.OS === 'android' ? 'roboto' : 'System'};
  font-size: 11px;
  margin-right: 2px;
  color: #717896;
  width: 235px;
`;

const PressableContainer = styled.Pressable`
  background-color: ${({added}) => (added ? 'white' : '#293B8F14')};
  margin-right: ${40}px;
  width: 25px;
  height:25px;
  border-radius: 12px;
`;

const CircleContainer = styled.View`
  background-color: ${({added}) => (added ? 'white' : '#293B8F14')};
  width: 25px;
  height:25px;
  border-radius: 12px;
`;

const CircleText = styled.Text`
  color: ${({added}) => (added ? 'red' : 'black')};
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f3
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15}px;
    text-align: center;
`;

const ActionText = styled.Text`
  margin-top: 5px;
  text-align: center;
`;

const SubContainer = styled.View`
  width: ${WIDTH.w225}px;
  padding-right: ${10}px;
  padding-bottom: ${40}px;
`;

export {
  MyTerritoryCardMainContainer,
  StyledPressable,
  ButtonContainer,
  IconHeadingContainer,
  StyledFontIcon,
  AddressText,
  CircleText,
  ActionText,
  CircleContainer,
  PressableContainer,
  SubContainer,
  HeadingText,
};

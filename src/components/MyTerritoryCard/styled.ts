import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  commonBorderColor,
  FONT_SIZE,
  HEIGHT,
  isTablet,
  secondaryFontColor,
  SPACING,
} from '../../constants';

type Props = {
  orangeBorder: boolean;
};

const MyTerritoryCardMainContainer = styled.TouchableOpacity<Props>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // margin: ${SPACING.h10}px 0px;
  background-color: white;
  border-width: ${(props: {orangeBorder: boolean}) =>
    props.orangeBorder ? '2px' : '1px'};
  border-color: ${(props: {orangeBorder: boolean}) =>
    props.orangeBorder ? '#FFAD0D' : commonBorderColor}};
  elevation: 3;
`;

const MyTerritoryCardInnerContainer = styled.View`
  // display: flex;
  flex-wrap: wrap;
  max-width: 85%;
  flex-direction: row;
`;

const MyTerritoryCardHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f7
    : FONT_SIZE.f13}px;
  color: black;
  font-weight: bold;
`;

const MyTerritorySecondaryText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f7
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f6
    : FONT_SIZE.f13}px;
  color: ${secondaryFontColor};
  width: 95%;
`;

const MyTerritoryCardAddressWrapper = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export {
  MyTerritoryCardMainContainer,
  MyTerritoryCardInnerContainer,
  MyTerritoryCardHeadingText,
  MyTerritorySecondaryText,
  MyTerritoryCardAddressWrapper,
};

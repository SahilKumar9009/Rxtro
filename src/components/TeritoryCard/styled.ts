import styled from 'styled-components/native';
import {
  Colors,
  commonBorderColor,
  isTablet,
  SPACING,
  WIDTH,
} from '../../constants';
import {Platform} from 'react-native';

const MyTerritoryCardMainContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-width: 1px;
  border-color: ${commonBorderColor};
  elevation: 3;
  margin: ${SPACING.h5}px ${SPACING.h10}px;
`;

const IconHeadingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledFontIcon = styled.Image`
  margin-top: 2px;
`;

const AddressText = styled.Text`
  color: #717896;
  font-size: 12px;
`;

const ButtonContainer = styled.View`
  margin-start: 15px;
  margin-top: 12px;
  height: 30px;
  justify-content: flex-end;
`;

const StyledPressable = styled.Pressable`
  background-color: ${Colors.RED_COLOR};
  height: 30px;
  width: ${WIDTH.w20}px;
  justify-content: center;
  align-items: center;
  border-radius: ${SPACING.h5}px;
`;

const SubContainer = styled.View`
  width: ${WIDTH.w225}px;
`;

const HeadingText = styled.Text`
  font-family: ${({isAndroid}) => (isAndroid ? 'roboto' : undefined)};
  font-size: 12px;
  color: #070f37;
  font-weight: 500;
  width: 50px;
`;

const SuburbText = styled(HeadingText)`
  color: #0000ff;
  font-weight: 700;
`;

const ClinicNameText = styled(HeadingText)`
  color: #000000;
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer2 = styled.Pressable`
  justify-content: center;
  align-items: center;
  height: 30px;
  border-radius: ${SPACING.h6}px;
  background-color: ${({buttonBackgroundColor}) => buttonBackgroundColor};
  width: ${Platform.OS == 'ios'
    ? Platform.isPad
      ? WIDTH.w75
      : WIDTH.w220
    : isTablet
    ? WIDTH.w75
    : WIDTH.w220}px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  align-self: center;
  font-weight: 700;
  color: white;
`;

export const LoadingContainer = styled.View`
  flex-direction: row;
  margin-right: ${SPACING.h5}px;
`;

export {
  MyTerritoryCardMainContainer,
  StyledPressable,
  ButtonContainer,
  IconHeadingContainer,
  StyledFontIcon,
  AddressText,
  SubContainer,
  HeadingText,
  SuburbText,
  ClinicNameText,
};

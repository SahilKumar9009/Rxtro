import { Platform, Pressable, Text, View } from "react-native";
// import {isTablet} from 'react-native-device-info';
import styled from "styled-components/native";
import { SPACING, isTablet, mainBackgroundColor } from "../../constants";

const marginValue =
  Platform.OS === "ios" ? (Platform.isPad ? 22 : 32) : isTablet ? 22 : 32;

const Container = styled.View`
  width: 75%;
  background-color: #ffffff;
  position: absolute;
  right: 0;
  z-index: 3;
  align-items: flex-end;
  padding-top: ${SPACING.h10}px;
  bottom: 0;
`;

const FilterButton = styled(Pressable)`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const FilterOption = styled(Text)`
  text-align: center;
  margin-left: auto;
  color: ${mainBackgroundColor};
  margin-right: ${marginValue}px;
`;

const Divider = styled(View)`
  background-color: grey;
  height: 1px;
  width: 100%;
`;

const CloseButton = styled(Pressable)`
  width: 100%;
  background-color: ${mainBackgroundColor};
  padding-vertical: 7px;
`;

const CloseButtonText = styled(Text)`
  text-align: center;
  margin-left: auto;
  color: #ffffff;
  margin-right: ${marginValue}px;
`;

export {
  Container,
  FilterButton,
  FilterOption,
  Divider,
  CloseButton,
  CloseButtonText,
};

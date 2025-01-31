import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {blueColor, FONT_SIZE, isTablet, SPACING} from '../../constants';

const MyTerritoryDetailMainContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: ${SPACING.h15}px;
  padding-right: ${SPACING.h5}px;
  padding-bottom: ${SPACING.h200}px;
  background-color: white;
`;

const MyTerritoryHeadingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${SPACING.h15}px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const MyTerritoryDetailHeading = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f15}px;
  font-weight: bold;
  color: black;
  margin: ${SPACING.h10}px 0px;
  line-height: 30px;
`;

const NotificationIconWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${SPACING.h5}px ${SPACING.h10}px;
  border-width: 1px;
  border-color: ${blueColor};
  border-radius: ${SPACING.h5}px;
`;

const NotifiationIconText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: ${blueColor};
  margin-left: ${SPACING.h5}px;
`;

const MyTerritoryDetailText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  color: black;
  line-height: ${SPACING.h20}px;
  margin-top: ${SPACING.h10}px;
`;

const MyTerritoryDetailBoldText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f12
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f12}px;
  color: black;
  font-weight: bold;
`;

const MyTerritoryDetailInfoWrapper = styled.View`
  margin: ${SPACING.h20}px 0px;
`;

const MyTerritoryDetailButtonWrapper = styled.TouchableOpacity`
  width: 80%;
  align-self: center;
  margin-top: 60px;
`;

const MyTerritoryDetailBottomContainer = styled.View`
  position: absolute;
  bottom: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? '80'
      : '0'
    : isTablet
    ? '80'
    : '0'}px;
  width: 100%;
  elevation: 4;
`;

export {
  MyTerritoryDetailMainContainer,
  MyTerritoryHeadingWrapper,
  MyTerritoryDetailHeading,
  NotificationIconWrapper,
  NotifiationIconText,
  MyTerritoryDetailText,
  MyTerritoryDetailBoldText,
  MyTerritoryDetailInfoWrapper,
  MyTerritoryDetailButtonWrapper,
  MyTerritoryDetailBottomContainer,
};

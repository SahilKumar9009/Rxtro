import {Platform, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  blueColor,
  FONT_SIZE,
  HEIGHT,
  isTablet,
  SPACING,
  WIDTH,
} from '../../constants';

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
  line-height: ${HEIGHT.h35}px;
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

const styles = StyleSheet.create({
  searchContainer: {
    height: HEIGHT.h35,
    flexDirection: 'row',
    borderRadius: SPACING.h5,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: SPACING.h5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: SPACING.h6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT.h35,
    backgroundColor: 'transparent',
    fontSize: Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f11
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f11
    : FONT_SIZE.f15,
    borderRadius: SPACING.h5,
    paddingHorizontal: SPACING.h8,
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: SPACING.h10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING.h5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterText: {
    fontSize: Platform.OS === 'ios'
      ? Platform.isPad
        ? FONT_SIZE.f11
        : FONT_SIZE.f15
      : isTablet
      ? FONT_SIZE.f11
      : FONT_SIZE.f15,
    color: '#293B8F',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: SPACING.h10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginEnd: SPACING.h10,
  },

  showMoreText: {
    color: '#2B3990',
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginEnd: 3,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
});

const Row = styled.View`
  flex-direction: row;
  /* border-bottom-width: 1px; */
  border-color: #121010;
  background-color: white;
  height: ${HEIGHT.h35}px;
`;

const Cell = styled.Text`
  width: 15%;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.h10}px;
  text-align: center;
  color: black;
  font-size: 14px;
`;

const Line = styled.View`
  width: 1px;
  height: 180px;
  background-color: #121010;
`;

const Table = styled.View`
  margin: 0 ${SPACING.h15}px;
  border-bottom-left-radius: 1px;
  border-left: 1px;
  border-right: 1px;
  border-bottom-width: 1px;
  border-color: #121010;
  overflow: hidden;
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
  styles,
  Row,
  Cell,
  Line,
  Table,
};

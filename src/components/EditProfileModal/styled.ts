import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  blueColor,
  commonBorderColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  SPACING,
  whiteBackgroundcolor,
  WIDTH,
} from '../../constants';

const EditProfileModalMainContainer = styled.View`
  background-color: ${whiteBackgroundcolor};
  border-radius: ${SPACING.h10}px;
  padding-bottom: ${SPACING.h10}px;
`;

const EditProfileModalInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  elevation: 4;
`;

const EditProfileModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${SPACING.h10}px;
  background-color: white;
  border-top-right-radius: ${SPACING.h10}px;
  border-top-left-radius: ${SPACING.h10}px;
  padding: ${SPACING.h20}px;
  elevation: 4;
`;

const EditProfileModalHeadingText = styled.Text`
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f9
      : FONT_SIZE.f15
    : isTablet
    ? FONT_SIZE.f9
    : FONT_SIZE.f15}px;
  color: black;
  font-weight: bold;
`;

const EditProfileModalBodyWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${SPACING.h10}px;
`;

const EditProfileModalImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: -${SPACING.h60}px;
`;

const EditProfileModalImage = styled.Image`
  width: ${WIDTH.w90}px;
  height: ${WIDTH.w90}px;
  border-radius: 500px;
  border-width: 1px;
  border-color: ${commonBorderColor};
`;

const EditProfileModalCard = styled.View`
  background-color: white;
  elevation: 4;
  margin-top: ${SPACING.h150}px;
  padding: ${SPACING.h10}px;
  border-radius: ${SPACING.h5}px;
`;

const EditProfileTouchableOpacityWrapper = styled.TouchableOpacity`
  width: 80%;
`;

const EditProfileTouchableIcon = styled.TouchableOpacity`
  align-self: flex-end;
  margin-left: -${SPACING.h40}px;
  border-radius: 500px;
  padding: ${SPACING.v3}px ${SPACING.h5}px;
  background-color: ${mainBackgroundColor};
`;

const EditProfileTouchableText = styled.Text`
  color: ${blueColor};
  font-size: ${Platform.OS === 'ios'
    ? Platform.isPad
      ? FONT_SIZE.f8
      : FONT_SIZE.f13
    : isTablet
    ? FONT_SIZE.f8
    : FONT_SIZE.f13}px;
  text-align: center;
  margin-top: ${SPACING.h15}px;
`;

export {
  EditProfileModalMainContainer,
  EditProfileModalInnerContainer,
  EditProfileModalHeader,
  EditProfileModalHeadingText,
  EditProfileModalBodyWrapper,
  EditProfileModalImageContainer,
  EditProfileModalImage,
  EditProfileModalCard,
  EditProfileTouchableOpacityWrapper,
  EditProfileTouchableText,
  EditProfileTouchableIcon,
};

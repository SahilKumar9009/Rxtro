import React, {useState} from 'react';
import BarStatus from '../BarStatus';
import {
  MainScreenHeaderIconContainer,
  MainScreenHeaderImage,
  MainScreenHeaderMainContainer,
  MainScreenHeaderTitle,
} from './styled';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import FilterModal from '../FilterModal';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {FONT_SIZE, IMAGE_BASE_URL, isTablet, SPACING} from '../../constants';
import {useSelector} from 'react-redux';

type Props = {
  title: string;
  needFilter?: boolean;
  needSearch?: boolean;
  needBell?: boolean;
  onPress?: void;
};

const MainScreenHeader: React.FC<Props> = ({
  title,
  needFilter,
  needBell,
  needSearch,
}) => {
  const userObject = useSelector(
    (state: any) => state.userProfileReducer.userProfile,
  );

  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );
  const user = userObject?.result;
  const postEditModalObject = useSelector(
    (state: any) => state.postEditProfileReducer,
  );
  const postEditModalResponse = postEditModalObject.postResponse.result;
  const navigation = useNavigation<DrawerNavigationProp<StackParams>>();

  const [isModalVisible, setModalVisible] = useState(false);
  const handleOnPress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <BarStatus />
      <MainScreenHeaderMainContainer>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          activeOpacity={0.7}>
          <MainScreenHeaderImage
            source={
              !postEditModalResponse
                ? userData
                  ? {uri: 'https://staging.rxtro.com/' + userData?.portraitUrl}
                    ? {
                        uri:
                          'https://staging.rxtro.com/' + userData?.portraitUrl,
                      }
                    : require('../../assets/defaultUser.png')
                  : require('../../assets/defaultUser.png')
                : {
                    uri: `${IMAGE_BASE_URL}${postEditModalResponse['portrait-url']}`,
                  }
            }
          />
        </TouchableOpacity>
        <MainScreenHeaderTitle>{title}</MainScreenHeaderTitle>
        <MainScreenHeaderIconContainer>
          {needFilter ? (
            <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
              <Material
                name="filter"
                color="white"
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f16
                      : FONT_SIZE.f20
                    : isTablet
                    ? FONT_SIZE.f16
                    : FONT_SIZE.f20
                }
                style={{marginLeft: SPACING.h40}}
              />
            </TouchableOpacity>
          ) : null}
          {needBell ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}
              activeOpacity={0.7}
              style={{position: 'absolute', right: -3}}>
              {/* Bell Icon with Badge */}
              <Material
                name="bell"
                color="white"
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f16
                      : FONT_SIZE.f20
                    : isTablet
                    ? FONT_SIZE.f16
                    : FONT_SIZE.f20
                }
              />
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  backgroundColor: '#FF8310',
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 6,
                    fontWeight: '500',
                    marginStart: 2,
                  }}>
                  0 {/* Replace with dynamic count value */}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {needSearch ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}
              activeOpacity={0.7}>
              <Icon
                name="search"
                color="white"
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f16
                      : FONT_SIZE.f20
                    : isTablet
                    ? FONT_SIZE.f16
                    : FONT_SIZE.f20
                }
              />
            </TouchableOpacity>
          ) : null}
        </MainScreenHeaderIconContainer>
      </MainScreenHeaderMainContainer>
      <FilterModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </>
  );
};

export default MainScreenHeader;

import React, {useState} from 'react';
import {
  SearchBarMainContainer,
  SearchbarInput,
  IconTouchableWrapper,
  SearchBarSubheadingContainer,
  SearchBarResetButtonWrapper,
  SearchBarButtonText,
} from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {FONT_SIZE, isTablet, USER_ID} from '../../constants';
import {Platform, TouchableOpacity} from 'react-native';
import TerritoryFilterModal from '../TerritoryFilterModal';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {
  postSearchTerritories,
  postSearchTerritoriesLoading,
  resetSearchedTerritories,
} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const Searchbar = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const [text, setText] = useState('');
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const handleOnPress = () => {
    setModalVisible(true);
  };

  const handleSearch = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    dispatch(
      postSearchTerritories({
        drugRepId: userId,
        searchTerm: text,
        regionId: -1,
        suburbId: -1,
        sizeResult: 10,
      }),
    );
    dispatch(postSearchTerritoriesLoading());
  };

  const onReset = () => {
    setText('');
    dispatch(resetSearchedTerritories());
    // navigation.goBack()
  };

  return (
    <>
      <SearchBarMainContainer>
        <SearchbarInput
          placeholder="Search"
          placeholderTextColor="grey"
          value={text}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          onChangeText={value => setText(value)}
        />
        <IconTouchableWrapper
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Icon
            name="close-circle-outline"
            size={FONT_SIZE.f20}
            color="black"
          />
        </IconTouchableWrapper>
      </SearchBarMainContainer>
      <SearchBarSubheadingContainer>
        <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
          <Material
            name="filter"
            size={
              Platform.OS === 'ios'
                ? Platform.isPad
                  ? FONT_SIZE.f16
                  : FONT_SIZE.f20
                : isTablet
                ? FONT_SIZE.f16
                : FONT_SIZE.f20
            }
            color="white"
          />
        </TouchableOpacity>
        <SearchBarResetButtonWrapper onPress={onReset} activeOpacity={0.7}>
          <SearchBarButtonText>Reset</SearchBarButtonText>
        </SearchBarResetButtonWrapper>
      </SearchBarSubheadingContainer>
      <TerritoryFilterModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </>
  );
};

export default Searchbar;

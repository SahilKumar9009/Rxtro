import React, {useEffect} from 'react';
import Searchbar from '../../components/Searchbar';
import {SearchScreenBody, SearchScreenPrimaryText} from './styled';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import MyTerritoryCard from '../../components/MyTerritoryCard';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import LoadingIndicator from '../../components/LoadingIndicator';
import ReUsableButton from '../../components/ReUsableButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ID} from '../../constants';
import {postSearchTerritories} from '../../actions';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const SearchScreen = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const searchResultObject = useSelector(
    (state: any) => state.postSearchTerritoriesReducer,
  );
  const searchResultLoading = searchResultObject.loading;
  const searchedTerm = searchResultObject.searchText;
  const maxSearchedResult = searchResultObject.numberOfResults;
  const searchResults = searchResultObject.searchResults.result;

  const onLoadMore = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    dispatch(
      postSearchTerritories({
        drugRepId: userId,
        searchTerm: searchedTerm,
        regionId: -1,
        suburbId: -1,
        sizeResult: maxSearchedResult + 10,
      }),
    );
  };

  if (searchResultLoading) {
    return (
      <>
        <Searchbar />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <Searchbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchScreenBody>
          {searchResults?.length > 1
            ? searchResults?.map(item => (
                <View
                  key={
                    item['individual-id']
                      ? item['individual-id']
                      : item.surgeryId
                  }>
                  <MyTerritoryCard
                    heading={item.surgeryName}
                    address={item['surgery-address']}
                    highlighted={true}
                    surgeryId={item.surgeryId}
                    territoryId={item.territoryId}
                    isAppointed={false}
                    isDropIn={false}
                    isDnsr={false}
                    isContract={false}
                    isTarget={false}
                  />
                </View>
              ))
            : searchedTerm?.length === 0 && (
                <SearchScreenPrimaryText>
                  Type Customer's name or address to get a search result.
                </SearchScreenPrimaryText>
              )}
          {searchResults?.length > 1 && searchedTerm?.length > 1 ? (
            <TouchableOpacity onPress={onLoadMore}>
              <ReUsableButton title="Load More" />
            </TouchableOpacity>
          ) : (
            searchedTerm !== '' && (
              <SearchScreenPrimaryText>
                No result found.
              </SearchScreenPrimaryText>
            )
          )}
        </SearchScreenBody>
      </ScrollView>
    </>
  );
};

export default SearchScreen;

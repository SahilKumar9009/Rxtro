import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AlphabetCard from '../../components/AlphabetCard';
import Header from '../../components/MainScreenHeader';
import {HEIGHT, SPACING, ScreenNames, WIDTH, isTablet} from '../../constants';
import {
  AddCustomerContainer,
  AddCustomerText,
  AlphabetContainer,
  ButtonWrapper,
  FilterButtonText,
  FilterContainer,
  FilterSearchContainer,
  InputContainer,
  MyTerritoryHeadingContainer,
  MyTerritoryHeadingText,
  MyTerritoryInnerContainer,
  SearchContainer,
  ShowMoreText,
} from './styled';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {ActivityIndicator} from 'react-native-paper';
import TerritorySort from '../../components/TerritorySort';
import TerritoryCard from '../../components/TeritoryCard';
import SearchIcon from '../../assets/Svg/SearchIcon';
import FilterButton from '../../components/FILTERButton';
import DownButtonArrow from '../../assets/Svg/DownButtonArrow';
import FilterIcon from '../../assets/Svg/FilterIcon';
import NewTerritoryDetailScreen from '../NewTerritoryDetailScreen';
import Arrow from '../../assets/Svg/Arrow';
import navigateTo from '../../navigation/navigate';
import findMyCustomerGeo from '../../apiActions/findMyCustomerGeo';
import findMyCustomer from '../../apiActions/findMyCustomer';
import {debounce} from 'lodash';

type ReduxState = ReturnType<typeof combineReducer>;

type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
const MyTerritoryScreen = () => {
  const [pageNo, setPageNo] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [listOfCustomers, setListOfCustomers] = useState<any[]>([]);
  const [surbs, setSurbs] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isListEmpty, setlistEmpty] = useState(false);
  const [sortModalVisibility, setSortModalVisibility] = useState(false);
  const [filterKey, setFilterKey] = useState(0);
  const [isTargetkey, setIsTargetKey] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [DetailScreen, setDetailScreen] = useState(false);
  const [meetingType, setMeetingType] = useState(null);
  const [docterid, setDoctorid] = useState();
  const [individual, setIsIndividual] = useState();
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedAreaBlock, setSelectedAreaBlock] = useState('');
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const dispatch = useDispatch<TypedDispatch>();
  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  const [isPressed, setIsPressed] = useState(false);

  const alphabets = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const [dynamicWidth, setDynamicWidth] = React.useState(100);

  useEffect(() => {
    dispatch(findMyCustomerGeo(userData?.userId, setSurbs));
  }, []);

  useEffect(() => {
    listOfCustomers.length === 0 && setLoading(true);
  }, []);
  useEffect(() => {
    if (selectedLetter) {
      let result = listOfCustomers.filter(
        item => item.clinic_name.toLowerCase()[0] === selectedLetter,
      );
      setFilteredCustomers(result);
      setIsFiltering(true);
      if (result && result?.length === 0) {
        setSelectedLetter(null);
        Alert.alert('Message', 'No Match Found');
      } else if (!result) {
        setSelectedLetter(null);
        Alert.alert('Message', 'No Match Found');
      }
    }
  }, [selectedLetter]);

  const customersRenderItem = ({item, index}: any) => {
    return (
      <TerritoryCard
        item={item}
        index={index}
        meetingType={item.meetingType}
        setDetailScreen={setDetailScreen}
        setDoctorId={setDoctorid}
        setIsIndividual={setIsIndividual}
      />
    );
  };

  const alphabetsRenderItem = ({item}) => {
    return (
      <View key={item}>
        <AlphabetCard
          alphabet={item}
          onPressLetter={() => {
            setSelectedLetter(item);
            setIsPressed(true);
          }}
          isPressed={isPressed}
        />
      </View>
    );
  };

  const requestMoreData = async (searchQuery = '') => {
    try {
      setLoading(true);
      const pageSize = 5;
      const automatic = 2;
      const booked = 2;
      const response = await dispatch(
        findMyCustomer(
          userData?.userId,
          selectedState,
          selectedAreaBlock,
          searchQuery,
          pageNo,
          pageSize,
          automatic,
          booked,
        ),
      );
      if (response) {
        setListOfCustomers(prev => [...prev, ...response]);
        setFilteredCustomers(prev => [...prev, ...response]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      Alert.alert('Error', 'Failed to load customers.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = async () => {
    setPageNo(prev => prev + 1);
    requestMoreData();
  };

  const debouncedSearch = React.useCallback(
    debounce(query => {
      setPageNo(1);
      setListOfCustomers([]);
      setFilteredCustomers([]);
      requestMoreData(query);
    }, 300),
    [],
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      requestMoreData();
    }
  }, [searchQuery]);
  const refresh = async () => {
    try {
      setSelectedState('');
      setSelectedAreaBlock('');
      setLoading(true);
      let pageSize = 1;
      const name = '';
      const automatic = 2;
      const booked = 2;
      const response = await dispatch(
        findMyCustomer(
          userData?.userId,
          selectedState,
          selectedAreaBlock,
          name,
          pageNo,
          (pageSize = 5),
          automatic,
          booked,
        ),
      );
      setRefreshing(false);
      if (response && pageNo > 1) {
        setListOfCustomers(prev => [...prev, ...response]);
        setFilteredCustomers(prev => [...prev, ...response]);
      }

      setListOfCustomers(response);
      setFilteredCustomers(response);
      setSelectedAreaBlock(selectedAreaBlock);
      setSelectedState(selectedState);
    } catch (error) {
      console.error('Error fetching customers:', error);
      Alert.alert('Error', 'Failed to load customers.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    requestMoreData();
  }, [pageNo, isTargetkey, filterKey, selectedAreaBlock, selectedState]);

  const defValue = useRef(new Animated.Value(1)).current;

  const applyFilters = filters => {
    if (filters?.selectedState) {
      setSelectedState(filters?.selectedState.id);
    }
    if (filters?.selectedAreaBlock?.id) {
      setSelectedAreaBlock(filters?.selectedAreaBlock.id);
      setSelectedState(filters?.selectedAreaBlock.stateId);
    }

    let filtered = [...listOfCustomers];
    if (filters.bookingStatus && filters.bookingStatus !== 'booking Status') {
      filtered = filtered.filter(
        customer => customer.bookingStatus === filters.bookingStatus,
      );
    }

    if (filters.automaticManual && filters.automaticManual !== 'automatic') {
      filtered = filtered.filter(
        customer =>
          customer.automatic === (filters.automaticManual === 'Automatic'),
      );
    }

    if (filters.meetingType && filters.meetingType !== 'meeting type') {
      filtered = filtered.filter(
        customer => customer.meetingType === filters.meetingType,
      );
    }

    if (filters.customerType && filters.customerType !== 'customer Type') {
      filtered = filtered.filter(
        customer => customer.customerType === filters.customerType,
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(customer =>
        customer.clinic_name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilteredCustomers(filtered);
    setIsFiltering(filtered.length > 0);
  };

  useEffect(() => {
    if (!selectedAreaBlock && !selectedState) {
      setListOfCustomers([]);
      setFilteredCustomers([]);
    }
  }, [selectedAreaBlock, selectedState]);

  useEffect(() => {
    if (selectedState || selectedAreaBlock) {
      setPageNo(1);
      setListOfCustomers([]);
      setFilteredCustomers([]);
      requestMoreData(searchQuery);
    }
  }, [selectedState, selectedAreaBlock]);
  return (
    <>
      {DetailScreen ? (
        <NewTerritoryDetailScreen
          meetingType={meetingType}
          setDetailScreen={setDetailScreen}
          docterId={docterid}
        />
      ) : (
        <>
          <View style={{backgroundColor: 'white'}}>
            <View
              style={{backgroundColor: 'white'}}
              onLayout={(e: LayoutChangeEvent) => {
                setHeaderHeight(e.nativeEvent.layout.height);
              }}>
              <Header title={ScreenNames.MYCUSTOMER} needBell={true} />
              <MyTerritoryHeadingContainer>
                <MyTerritoryHeadingText>My Customers</MyTerritoryHeadingText>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 'auto',

                    marginRight:
                      Platform.OS === 'ios' && Platform.isPad ? -4 : -3,
                  }}
                  onPress={() => navigateTo('AddCustomerScreen')}>
                  <AddCustomerContainer>
                    <AddCustomerText>+</AddCustomerText>
                    <Text>Add Customer</Text>
                  </AddCustomerContainer>
                </TouchableOpacity>
              </MyTerritoryHeadingContainer>
            </View>

            <FilterSearchContainer>
              <SearchContainer>
                <SearchIcon
                  style={{marginStart: SPACING.h10, height: '100%'}}
                />
                <InputContainer
                  placeholder="Search here..."
                  placeholderTextColor="#888"
                  value={searchQuery}
                  onChangeText={text => {
                    setSearchQuery(text);
                    setPageNo(1);
                  }}
                />
              </SearchContainer>

              <TouchableOpacity onPress={handlePress}>
                <ButtonWrapper>
                  <FilterButtonText>Filter List</FilterButtonText>
                  <DownButtonArrow />
                </ButtonWrapper>
              </TouchableOpacity>
              {isOpen && (
                <FilterContainer>
                  <FilterButton
                    onClose={() => setIsOpen(!isOpen)}
                    isVisible={isOpen}
                    setIsOpen={setIsOpen}
                    onApply={applyFilters}
                    surbs={surbs}
                  />
                </FilterContainer>
              )}
            </FilterSearchContainer>

            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width:
                    Platform.OS === 'ios'
                      ? Platform.isPad
                        ? `${dynamicWidth}%`
                        : '100%'
                      : isTablet
                      ? `${dynamicWidth}%`
                      : '100%',
                  alignItems:
                    Platform.OS === 'ios'
                      ? Platform.isPad
                        ? 'flex-start'
                        : 'flex-end'
                      : isTablet
                      ? 'flex-start'
                      : 'flex-end',
                }}>
                <MyTerritoryInnerContainer>
                  <TerritorySort
                    targetKey={isTargetkey}
                    filterKey={filterKey}
                    headerHeight={headerHeight}
                    defValue={defValue}
                    visible={sortModalVisibility}
                    setVisible={setSortModalVisibility}
                    setPage={setPageNo}
                    setFilterKey={setFilterKey}
                    setIsTarget={setIsTargetKey}
                    onModalHide={() => {
                      setSortModalVisibility(false);
                      setListOfCustomers([]);
                      requestMoreData();
                      setlistEmpty(false);
                      setSelectedLetter(null);
                    }}
                  />

                  {!loading && (
                    <FlatList
                      data={isFiltering ? filteredCustomers : listOfCustomers}
                      extraData={[
                        filterKey,
                        listOfCustomers,
                        isTargetkey,
                        loading,
                      ]}
                      keyExtractor={(item, index) => `${index}`}
                      renderItem={customersRenderItem}
                      onEndReachedThreshold={0.5}
                      onEndReached={handleShowMore}
                      onRefresh={() => {
                        setRefreshing(true);
                        setFilteredCustomers([]);
                        setPageNo(1);
                        refresh();
                      }}
                      refreshing={refreshing}
                      scrollEnabled={true}
                      showsVerticalScrollIndicator={false}
                      style={{height: HEIGHT.h270}}
                      ListEmptyComponent={() => {
                        return (
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%',
                            }}>
                            <Text>0 customers found.</Text>
                          </View>
                        );
                      }}
                      ListFooterComponent={item => {
                        if (listOfCustomers.length > 0) {
                          return (
                            <>
                              <View style={{padding: SPACING.h10}}>
                                <TouchableOpacity onPress={handleShowMore}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      alignItems: 'center',
                                      marginEnd: SPACING.h5,
                                    }}>
                                    <ShowMoreText>Show More</ShowMoreText>
                                    <Arrow
                                      style={{
                                        height: 4,
                                        width: 4,
                                      }}
                                      color={undefined}
                                    />
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View style={{height: HEIGHT.h75}} />
                            </>
                          );
                        }
                        return <View style={{height: HEIGHT.h75}} />;
                      }}
                    />
                  )}

                  <AlphabetContainer style={{maxHeight: HEIGHT.h270}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setSortModalVisibility(true)}>
                      <FilterIcon
                        style={{
                          HEIGHT: HEIGHT.h20,
                          WIDTH: WIDTH.w20,
                          marginStart: SPACING.v2,
                          marginTop: SPACING.h20,
                        }}
                      />
                    </TouchableOpacity>

                    <AlphabetCard
                      alphabet="#"
                      onPressHash={() => setSelectedLetter(null)}
                    />
                    <FlatList
                      bounces={false}
                      data={alphabets}
                      showsVerticalScrollIndicator={false}
                      renderItem={alphabetsRenderItem}
                      keyExtractor={(item, index) => index.toString()}
                      scrollEnabled={true}
                    />
                  </AlphabetContainer>
                </MyTerritoryInnerContainer>
              </View>
              {isOpen && (
                <View style={{backgroundColor: '#eee', padding: SPACING.h10}}>
                  <FilterButton
                    isVisible={isOpen}
                    onClose={() => setIsOpen(false)}
                    setIsOpen={setIsOpen}
                    onApply={applyFilters}
                    surbs={surbs}
                  />
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default MyTerritoryScreen;

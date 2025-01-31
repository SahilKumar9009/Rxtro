import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  LayoutAnimation,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Alert, Platform, View} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {AppointmentItem} from '../../components/TableComponent/index';
import Header from '../../components/MainScreenHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  MyTerritoryHeadingContainer,
  MyTerritoryHeadingText,
} from '../MyTerritoryScreen/styled';
import DownButtonArrow from '../../assets/Svg/DownButtonArrow';
import SearchIcon from '../../assets/Svg/SearchIcon';
import {FlatList} from 'react-native-gesture-handler';
import Arrow from '../../assets/Svg/Arrow';
import TerritorySort from '../../components/TerritorySort';
import navigateTo from '../../navigation/navigate';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  getAvailableAppointments,
  getAvailableAppointmentsLoading,
} from '../../actions';
import ClinicFilter from '../../components/ClinicFilter';
import {Cell, Line, Row, styles} from './styled';
import getTerritory from '../../apiActions/getTerritory';
import RNText from '../../components/RNText';
import AppointmentIpad from '../../components/AppointmentIpad';
import {isTablet, SPACING, USER_ID, WIDTH} from '../../constants';
import {Table} from '../../components/AppointmentIpad/styled';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

type Props = {
  onPress?: () => void;
  route: any;
};

const NewTerritoryDetailScreen = ({meetingType, setDetailScreen, docterId}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const [appointmentData, setAppointmentData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [listOfCustomers, setListOfCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilterCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isListEmpty, setlistEmpty] = useState(false);
  const [sortModalVisibility, setSortModalVisibility] = useState(false);
  const [filterKey, setFilterKey] = useState(0);
  const [isTargetkey, setIsTargetKey] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const defValue = useRef(new Animated.Value(1)).current;
  const [visibleCount, setVisibleCount] = useState(5);
  const [filter, setFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10); // Set the number of items per page
  const [totalItems, setTotalItems] = useState(0);
  const detailsObject = useSelector(
    (state: any) => state.getSurgeryDetailReducer,
  );
  const userObject = useSelector((state: any) => state.userProfileReducer);
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const details = detailsObject.surgeryDetail;
  const detailsFailed = detailsObject.failed;
  // ! have to get this from redux
  const globalLoading = useSelector(
    (state: any) => state.storeIdReducer.globalLoading,
  );

 

  useEffect(() => {
    const isEmpty = Object.keys(details)?.length;
    if (isEmpty === 0 || !Array.isArray(details.participants)) {
      return;
    }
  }, [details]);

  const onViewAvailability = async () => {
    if (details?.participants.length === 0) {
      Alert.alert('No Appointments', 'There are no appointments available.');
      return;
    }

    dispatch(
      getAvailableAppointments({
        territoryId: territoryId,
        drugRepId: userData?.userId,
      }),
    );
    dispatch(getAvailableAppointmentsLoading());
    navigateTo('ViewAvailabilityScreen', {
      title: details?.surgeryName,
    });
  };

  const fetchMoreData = async () => {
    setLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingMore(false);
  };

  const handlePress = () => {
    setIsOpen(!isOpen);
  };
  const territoryId = useSelector(
    (state: any) => state.storeIdReducer.territoryId,
  );

  const [dynamicWidth, setDynamicWidth] = React.useState(100);
  React.useEffect(() => {
    if (territoryId) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDynamicWidth(38);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDynamicWidth(100);
    }
  }, [territoryId]);
  useEffect(() => {
    if (selectedLetter) {
      let result = listOfCustomers.filter(
        item => item.surgeryName.toLowerCase()[0] === selectedLetter,
      );
      setFilterCustomers([]);
      setFilterCustomers(result);
      if (result && result?.length === 0) {
        setSelectedLetter(null);
        Alert.alert('Message', 'No Match Found');
      } else if (!result) {
        setSelectedLetter(null);
        Alert.alert('Message', 'No Match Found');
      }
    }
  }, [selectedLetter]);
  const fetchData = async () => {
    try {
      dispatch(
        getTerritory(userData?.userId, territoryId,pageNo,pageSize, setAppointmentData),
      );
    } catch (error) {
      console.error('Error fetching user ID from error:', error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, [dispatch, territoryId]);

  const handleShowMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prevCount => prevCount + 5);
      setPageNo(prevPageNo => prevPageNo + 1);
      fetchData(); 
      setLoadingMore(false);
      setLoadingMore(false);
    }, 1000);
  };

  const applyFilter = filters => {
    setFilter(true);
    let filtered = [...appointmentData];
   if (filters.bookedBy && filters.bookedBy !== 'Select Booked By') {
      filtered = filtered.filter(
        appointment => appointment['booked-by'] === filters.bookedBy,
      );
    }

    if (filters.topic && filters.topic !== 'Select Topic') {
      filtered = filtered.filter(
        appointment => appointment['topic'] === filters.topic,
      );
    }
    setFilterCustomers(filtered);
  };
  const {width, height} = Dimensions.get('window');
  const isIpadLandscape = Platform.OS === 'ios' && Platform.isPad;
  return (
    <>
      <View>
        <Header title="My Territory" needBell={true} />
        <MyTerritoryHeadingContainer>
          <Pressable onPress={() => setDetailScreen(false)}>
            <Icon
              name="chevron-back"
              size={20}
              color="white"
            />
          </Pressable>
          <MyTerritoryHeadingText onPress={() => setDetailScreen(false)}>
            My Customers
          </MyTerritoryHeadingText>
        </MyTerritoryHeadingContainer>
      </View>

      {/* <View style={{backgroundColor: 'white'}}>
        <View style={styles.searchContainer}>
          <SearchIcon style={{marginRight: SPACING.h10, height: '100%'}} />
          <TextInput
            placeholder="Search here..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        <View
          style={{
            marginVertical: SPACING.h6,
            marginHorizontal: SPACING.h5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.filterContainer}>
              <RNText style={styles.filterText}>Filter List</RNText>
              <DownButtonArrow />
            </View>
          </TouchableOpacity>
          {isOpen && (
            <View style={{backgroundColor: '#eee', padding: 10}}>
              <ClinicFilter
                onClose={() => setIsOpen(!isOpen)}
                isVisible={isOpen}
                setIsOpen={setIsOpen}
                onApply={applyFilter}
              />
            </View>
          )}
        </View>
      </View> */}

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
          setFilterCustomers([]);
          setlistEmpty(false);
          setSelectedLetter(null);
        }}
        containerStyle={{marginTop: 115}}
      />

      <FlatList
        data={
          filter
            ? filteredCustomers.slice(0, visibleCount)
            : appointmentData.slice(0, visibleCount)
            ? appointmentData.slice(0, visibleCount)
            : []
        }
        bounces={false}
        contentContainerStyle={{
          paddingBottom: SPACING.h150,
        }}
        renderItem={({item, index}) => {
          if (isIpadLandscape || isTablet) {
            return <AppointmentIpad item={item} index={index} />;
          } else {
            return <AppointmentItem item={item} index={index} />;
          }
        }}
        ListHeaderComponent={
          (appointmentData && appointmentData.length > 0 && isIpadLandscape) ||
          isTablet()
            ? () => (
                <Table>
                  <Row>
                    <Cell>When</Cell>
                    <Line />
                    <Cell
                      style={{
                        width: WIDTH.w100,
                      }}>
                      with
                    </Cell>
                    <Line />
                    <Cell>Meeting Type</Cell>
                    <Line />
                    <Cell>Approval Required?</Cell>
                    <Line style={{marginEnd: SPACING.h10}} />
                    <Cell>Action</Cell>
                  </Row>
                </Table>
              )
            : null
        }
        ListFooterComponent={() => {
          if (!appointmentData || appointmentData.length === 0) {
            return null;
          }

          return (
            <View style={{padding: SPACING.h10}}>
              {loadingMore ? (
                <ActivityIndicator size="small" color="#000" />
              ) : !loadingMore && (
                <TouchableOpacity onPress={handleShowMore}>
                  <View style={styles.footerContainer}>
                    <RNText style={styles.showMoreText}>Show More</RNText>
                    <Arrow
                      style={{
                        height: 4,
                        width: 4,
                      }}
                      color={undefined}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </>
  );
};

export default NewTerritoryDetailScreen;

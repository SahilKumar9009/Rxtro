import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import Header from '../../components/MainScreenHeader';
import {
  MyTerritoryHeadingContainer,
  MyTerritoryHeadingText,
} from '../MyTerritoryScreen/styled';
import Input from '../../components/Input';
import combineReducer from '../../reducers';
import getStates from '../../apiActions/AddingCustomer/getStates';
import getBlockState from '../../apiActions/AddingCustomer/getBlockState';
import getSurbsState from '../../apiActions/AddingCustomer/getSurbsState';
import getAvailbaleCustomer from '../../apiActions/AddingCustomer/getAvailbaleCustomer';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CustomCard from '../../components/AddCustomerCard';
import {
  Container,
  DropdownContainerTop,
  ErrorMessage,
  SearchButton,
  SearchButtonText,
  ShowMoreText,
  SwitchContainer,
  SwitchLabel,
  SwitchToggle,
} from './styled';
import {HEIGHT, ScreenNames, SPACING} from '../../constants';
import { CustomDropdownProps, DropdownConfig, DropdownItem, DropdownItemVal, DropdownState } from './interface';
import Icon from 'react-native-vector-icons/Ionicons';
import navigateTo from '../../navigation/navigate';
import { useFocusEffect } from '@react-navigation/native';
type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;


const dropdowns: DropdownConfig[] = [
  {name: 'state', placeholder: 'Select State', action: getStates},
  {name: 'areaBlock', placeholder: 'Select Area Block', action: getBlockState},
  {name: 'suburb', placeholder: 'Select Suburb', action: getSurbsState},
  {
    name: 'status',
    placeholder: 'Select Status',
    items: [
      {label: 'Automatic', value: 'Automatic'},
      {label: 'Manual', value: 'Manual'},
    ],
  },
];

const Index = () => {
  const [dropdownStates, setDropdownStates] = useState<DropdownState>({
    state: '',
    areaBlock: '',
    suburb: '',
    status: 'Automatic',
  });
  const [dropdownItems, setDropdownItems] = useState<Record<string, DropdownItemVal[]>>({});
  const [excludeCustomers, setExcludeCustomers] = useState(false);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [blocked, setBlocked] = useState(2);
  const [name, setName] = useState('');
  const [automatic, setAutomatic] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);


 

  const dispatch = useDispatch<TypedDispatch>();
  const userData = useSelector(
    (state: ReduxState) => state.userProfileReducer2.userProfile.result,
  );
  const states = useSelector(
    (state: ReduxState) => state.getStateFilterReducer.states,
  );
  const blocks = useSelector(
    (state: ReduxState) => state.getBlockFilterReducer.blocks,
  );
  const suburbs = useSelector(
    (state: ReduxState) => state.getSuburbFilterReducer.suburbs,
  );
  

  useEffect(() => {
    if (!states || states.length === 0) {
      dispatch(getStates());
    }
    // const res = dispatch(getStates());
  }, [states]);

  useFocusEffect(
    React.useCallback(() => {
      // Reset dropdown state when screen is focused
      setOpenDropdown(null);
    }, [])
  );
  useEffect(() => {
    if (states?.length > 0) {
      setDropdownItems(prev => ({
        ...prev,
        state: states.map(item => ({label: item.name, value: item.id})),
      }));
    }
  }, [states]);

  useEffect(() => {
    if (blocks?.length > 0) {
      setDropdownItems(prev => ({
        ...prev,
        areaBlock: blocks.map(item => ({label: item.name, value: item.id})),
      }));
    }
  }, [blocks]);

  useEffect(() => {
    if (suburbs?.length > 0) {
      setDropdownItems(prev => ({
        ...prev,
        suburb: suburbs.map(item => ({label: item.name, value: item.id})),
      }));
    }
  }, [suburbs]);

  const handleDropdownChange = (name: keyof DropdownState, value: string | null) => {
    setDropdownStates(prev => ({...prev, [name]: value}));
    if (name === 'state' && value && dropdownStates[name] !== value) {
      dispatch(getBlockState(value));
      dispatch(getSurbsState(value));
    }
  };
  

  const handleSearch = async () => {
    setLoading(true);
    if (!dropdownStates?.state) {
      if (!dropdownStates?.state) {
        setLoading(false);
        Alert.alert(
          'State is required. Please select a state before searching.',
        );
        return;
      }
    }

    setErrorMessage('');

    const userId = userData?.userId;
    let exclude;

    // userId, stateId, blockId,suburbId,blocked,added,automatic,pageNo,pageSize
    if(excludeCustomers){
      exclude = 1;
    }else {
      exclude=2;
    }
    const response = await dispatch(
      getAvailbaleCustomer(userId, dropdownStates.state,dropdownStates.areaBlock,dropdownStates.suburb,blocked,exclude,automatic,name,pageNo,pageSize),
    );
    if (response) {
      setLoading(false);
      setItems(response);
      setAvailableCustomers(response);
    } else {
      setLoading(false);
      setErrorMessage('No customers found.');
    }
  };

  const CustomDropdown= React.memo(({name, placeholder, zIndex}: any) => (
    <View style={[{marginBottom: 10, zIndex}]}>
      <DropDownPicker
        open={openDropdown === name}
        value={dropdownStates[name]}
        items={
          dropdownItems[name] ||
          dropdowns?.find(d => d.name === name)?.items ||
          []
        }
        setOpen={(isOpen : boolean)=> setOpenDropdown(isOpen ? name : null)}
        setValue={val => handleDropdownChange(name, val() )}
        setItems={(items: any) => setDropdownItems(prev=> ({...prev, [name]: items}))}
        placeholder={placeholder}
        style={{borderColor: '#ccc'}}
        dropDownContainerStyle={{borderColor: '#ccc'}}
        onClose={() => setOpenDropdown(null)}
      />
    </View>
  ));

  const handleShowMore = async () => {
    setLoadingMore(true);
    setPageNo(prev => prev + 1); // Increment the page number

    const userId = userData?.userId;
    let exclude = excludeCustomers ? 1 : 2;

    
    const response = await dispatch(
      getAvailbaleCustomer(userId, dropdownStates.state, dropdownStates.areaBlock, dropdownStates.suburb, blocked, exclude, automatic, name, pageNo + 1, pageSize)
    );

    if (response) {
      setItems(prev => [...prev, ...response]); 
    } else {
      Alert.alert('No more customers found.');
    }

    setLoadingMore(false);
  };


  return (
    <>
      <Container>
        <FlatList
          data={items}
          keyExtractor={(item: any) => item?.id.toString()}
          scrollEnabled={ items.length > 0}
          ListHeaderComponent={() => (
            <>
              <Header title="Add Customer" needBell={true} />
              <Pressable onPress={() => navigateTo(ScreenNames.MYCUSTOMER)}>
              <MyTerritoryHeadingContainer>
                          <Icon
                            name="chevron-back"
                            size={20}
                            color="white"
                          />       
                <MyTerritoryHeadingText>Add Customers</MyTerritoryHeadingText>  
              </MyTerritoryHeadingContainer>
              </Pressable>
              <DropdownContainerTop>
                {dropdowns.map((dropdown, index) => (
                  <>
                    <Text
                      style={{
                        textTransform: 'capitalize',
                        margin: 5,
                      }}>
                      {dropdown.placeholder}
                    </Text>
                    <CustomDropdown
                      key={dropdown.name}
                      {...dropdown}
                      zIndex={1000 - index * 10}
                    />
                  </>
                ))}
                {errorMessage ? (
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : null}
                <Input
                  title="Search Doctor or Clinic Name"
                  style={{zIndex: 1}}
                  onChange={(text) => setName(text)}
                  value={name}
                />
                <SwitchContainer>
                  <SwitchLabel>Exclude Customers already Added</SwitchLabel>
                  <Switch
                    value={excludeCustomers}
                    onValueChange={setExcludeCustomers}
                    style={SwitchToggle}
                  />
                </SwitchContainer>
                <SearchButton onPress={handleSearch}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <SearchButtonText style={{marginEnd: SPACING.h10}}>
                      SEARCH
                    </SearchButtonText>
                    {loading && (
                      <ActivityIndicator size="small" color="white" />
                    )}
                  </View>
                </SearchButton>
              </DropdownContainerTop>
            </>
          )}
          ListFooterComponent={() => (
            <View style={{ padding: SPACING.h10 }}>
              {availableCustomers.length > 0 && (
                <TouchableOpacity onPress={handleShowMore}>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginEnd: SPACING.h5 }}>
                    <ShowMoreText>Show More</ShowMoreText>
                    <Icon name="chevron-down" size={20} color= "#2b3990" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
          renderItem={({item, index}) => (
            <CustomCard
              item={item}
              index={index}
              listData={items}
              setItems={setItems}
            />
          )}
        />
      </Container>
    </>
  );
};

export default Index;

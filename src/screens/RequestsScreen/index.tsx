import React, {useEffect, useState} from 'react';
import {View, useWindowDimensions, Platform, ScrollView, TouchableOpacity} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Header from '../../components/MainScreenHeader';
import {
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  USER_ID,
} from '../../constants';
import {useOrientation} from '../../hooks/useOrientation';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {getAllOrders, getAllOrdersLoading} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllRequestTab from '../../components/AllRequestTab';
import LoadingIndicator from '../../components/LoadingIndicator';
import RequestToAssignTab from '../../components/RequestToAssignTab';
import AssignedToMeTab from '../../components/AssignedToMeTab';
import RequestCardDetail from '../../components/RequestCardDetail';
import ReUsableButton from '../../components/ReUsableButton';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const FirstRoute = () => <RequestToAssignTab />;

const SecondRoute = () => <AssignedToMeTab />;

const ThirdRoute = () => <AllRequestTab />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const RequestsScreen = () => {
  const orientation = useOrientation();
  const layout = useWindowDimensions();
  const dispatch = useDispatch<TypedDispatch>();
  const allRequestsObject = useSelector(
    (state: any) => state.getAllOrdersReducer,
  );
  const allRequests = allRequestsObject.orders.result;
  const allRequestsLoading = allRequestsObject.loading;
  const assignResponse = useSelector(
    (state: any) => state.postAssignOrderToMeReducer.response,
  );
  const unAssignResponse = useSelector(
    (state: any) => state.postUnassignOrderReducer.response,
  );
  const confirmOrderItemResponse = useSelector(
    (state: any) => state.postConfirmOrderItemReducer.response,
  );
  const [loaded, setLoaded] = useState(true);
 const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  useEffect(() => {
    if (Array.isArray(allRequests)) {
      setLoaded(false);
    }
  }, [allRequestsObject, allRequestsLoading]);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem(USER_ID);
      dispatch(getAllOrders({drugRepId: userData?.representativeId}));
      dispatch(getAllOrdersLoading());
    })();
  }, [assignResponse, unAssignResponse, confirmOrderItemResponse]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title:
        Platform.OS === 'ios'
          ? Platform.isPad
            ? 'Requests to Assign'
            : 'Requests to Assign'
          : isTablet
          ? 'Requests to\nAssign'
          : 'Requests to Assign',
    },
    {
      key: 'second',
      title:
        Platform.OS === 'ios'
          ? Platform.isPad
            ? 'Assigned to me'
            : 'Assigned to me'
          : isTablet
          ? 'Assigned to\nme'
          : 'Assigned to me',
    },
    {key: 'third', title: 'All Requests'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: '10%',
        backgroundColor: '#83C3FE',
        borderRadius: 50,
      }}
      style={{
        backgroundColor: mainBackgroundColor,
        width: '100%',
        elevation: 3,
        shadowColor: '#171717',
        shadowOffset: {height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      labelStyle={{
        color: 'white',
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize:
          Platform.OS === 'ios'
            ? Platform.isPad
              ? FONT_SIZE.f9
              : FONT_SIZE.f12
            : isTablet
            ? FONT_SIZE.f9
            : FONT_SIZE.f12,
        maxWidth: '100%',
      }}
      activeColor="white"
      tabStyle={{
        borderRadius: 30,
        minHeight:
          Platform.OS === 'ios'
            ? Platform.isPad
              ? 100
              : 60
            : isTablet
            ? 100
            : 60,
      }}
      pressOpacity={1}
    />
  );

  if (allRequestsLoading && loaded) {
    return (
      <>
        <Header title="My Requests" />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <Header title="My Requests" />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          style={{width: '50%'}}
        />
        {Platform.OS === 'ios' ? Platform.isPad ? 
          <View style={{ width: '50%', backgroundColor: 'white'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {allRequests && allRequests.map(item => {
                return (
                  <View>
                    <RequestCardDetail assigned={item.isAssigned} displayName={item.SKU} orderNo={item['order#']} quantity={item.quantity} />
                  </View>
                )
              })}
            </ScrollView>
            <TouchableOpacity style={{width: '80%', alignSelf:"center", position: 'absolute', bottom: orientation === 'LANDSCAPE' ? 80 : 110}}>
              <ReUsableButton title='Confirm Delivery' />
            </TouchableOpacity>
          </View> : null : isTablet ? 
          <View style={{ width: '50%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {allRequests && allRequests.map(item => {
                return (
                  <View>
                    <RequestCardDetail assigned={item.isAssigned} displayName={item.SKU} orderNo={item['order#']} quantity={item.quantity} />
                  </View>
                )
              })}
              <TouchableOpacity style={{width: '80%', alignSelf:"center"}}>
                <ReUsableButton title='Confirm Delivery' />
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={{width: '80%', alignSelf:"center", position: 'absolute', bottom: orientation === 'LANDSCAPE' ? 80 : 110}}>
              <ReUsableButton title='Confirm Delivery' />
            </TouchableOpacity>
          </View> : null
        }
      </View>
    </>
  );
};

export default RequestsScreen;

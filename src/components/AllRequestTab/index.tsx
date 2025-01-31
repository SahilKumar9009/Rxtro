import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { AllRequestTabMainContainer, AllRequestTabInnerContainer } from './styled';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import RequestCard from '../RequestCard';
import LoadingIndicator from '../LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllOrders } from '../../actions';
import { SPACING, USER_ID } from '../../constants';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;


const AllRequestTab = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const allRequestsObject = useSelector((state: any) => state.getAllOrdersReducer);
  const allRequests = allRequestsObject.orders.result;
  const allRequestsLoading = allRequestsObject.loading;
  const [loading, setLoading] = useState(allRequestsLoading);
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );


  // if (allRequestsLoading) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <LoadingIndicator />
  //     </View>
  //   )
  // }

  const refreshAllRequests = async () => {
    const userId = await AsyncStorage.getItem(USER_ID)
    dispatch(getAllOrders({drugRepId: userData?.representativeId}))
    // dispatch(getAllOrdersLoading());
  }

  const allRequestsRenderItem = ({item}) => {
    return (
      <AllRequestTabInnerContainer key={item.orderItemId}>
        <RequestCard 
          doctorName={item.doctor}
          address={item['address&suburb']}
          productName={item.SKU}
          status={item.status}
          date={item.date}
          orderNo={item['order#']}
          quantity={item.quantity}
          isAssigned={item.isAssigned}
          clinicName={item.clinic}
          forAssignedToMe={true}
          forRequestToAssign={true}
          itemId={item.orderItemId} 
          addSelectedCard={function (): void {
            throw new Error('Function not implemented.');
          } }              
        />
      </AllRequestTabInnerContainer>
    )
  }

  return (
    <AllRequestTabMainContainer>
      {allRequests && 
        <FlatList
          contentContainerStyle={{paddingBottom: SPACING.v75}}
          data={allRequests}
          showsVerticalScrollIndicator={false}
          renderItem={allRequestsRenderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          onRefresh={refreshAllRequests}
          refreshing={loading}
        />
      }
    </AllRequestTabMainContainer>
  )
}

export default AllRequestTab
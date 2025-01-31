import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import {AssignedToMeTabMainContainer, AssignedToMeTabInnerContainer, AssignedToMeTabBottomWrapper} from './styled';
import RequestCard from '../RequestCard';
import LoadingIndicator from '../LoadingIndicator';
import ReUsableButton from '../ReUsableButton';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { blueColor, FONT_SIZE, isTablet, SPACING, USER_ID } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllOrders, getAllOrdersLoading, postConfirmOrderItem, postUnassignOrder } from '../../actions';


type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const AssignedToMeTab = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const allRequestsObject = useSelector((state: any) => state.getAllOrdersReducer);
  const allRequests = allRequestsObject.orders.result;
  const allRequestsLoading = allRequestsObject.loading;
  const [loading, setLoading] = useState(allRequestsLoading)
  const [checkedCards, setCheckedCards] = useState<number[] | never[]>([]);
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const asssignedToMeList = allRequests?.filter(item => {
    if (item.status === 'INPROGRESS') {
      return item
    }
  })

  const refreshAssignToMe = async () => {
    const userId = await AsyncStorage.getItem(USER_ID)
    dispatch(getAllOrders({drugRepId: userData?.representativeId}))
  }

  useEffect(() => {
  }, [allRequestsObject, allRequestsLoading])

  const assignToMeRenderItem = ({item}) => {
    return (
      <AssignedToMeTabInnerContainer key={item.orderItemId}>
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
          forAssignedToMe={false} itemId={item.orderItemId}
          addSelectedCard = {() => setCheckedCards([...checkedCards, item.orderItemId])}
        />
      </AssignedToMeTabInnerContainer>
    )
  }


  // if (allRequestsLoading) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <LoadingIndicator />
  //     </View>
  //   )
  // }

  const onUnassign = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    const items = checkedCards.toString()
    dispatch(postUnassignOrder({drugRepId: userData?.representativeId, orderItemIds: items}))
  }

  const onConfirmDelivery = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    const items = checkedCards.toString()
    dispatch(postConfirmOrderItem({drugRepId: userData?.representativeId, orderItemIds: items}))
  }

  return (
    <>
      <AssignedToMeTabMainContainer>
        {asssignedToMeList?.length !== 0 ? 
          <FlatList
            contentContainerStyle={{paddingBottom: SPACING.v30}}
            data={asssignedToMeList}
            showsVerticalScrollIndicator={false}
            renderItem={assignToMeRenderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            onRefresh={refreshAssignToMe}
            refreshing={loading}
          /> 
        : 
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.h50}}>
            <Text style={{fontSize: Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f15}}>Currently there is no orders to assigned you</Text>
          </View>
        }
        
      </AssignedToMeTabMainContainer>
      {asssignedToMeList?.length !== 0 &&
        <AssignedToMeTabBottomWrapper style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}>
          <TouchableOpacity onPress={onUnassign} activeOpacity={0.7}>
            <ReUsableButton title='Unassign' color='red' />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={onConfirmDelivery}>
            <ReUsableButton title='Confirm Delivery' color={blueColor} />
          </TouchableOpacity>
        </AssignedToMeTabBottomWrapper>
      }
    </>
  )
}

export default AssignedToMeTab;
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { RequestToAssignTabMainContainer, RequestToAssignTabInnerContainer, RequestToAssignTabBottomWrapper } from './styled';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import RequestCard from '../RequestCard';
import LoadingIndicator from '../LoadingIndicator';
import ReUsableButton from '../ReUsableButton';
import { getAllOrders, postAssignOrderToMe } from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONT_SIZE, isTablet, SPACING, USER_ID } from '../../constants';


type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const RequestToAssignTab = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const allRequestsObject = useSelector((state: any) => state.getAllOrdersReducer);
  const allRequests = allRequestsObject.orders.result;
  const allRequestsLoading = allRequestsObject.loading;
  const [loading, setLoading] = useState(allRequestsLoading)
  const [checkedCards, setCheckedCards]  = useState<number[] | never[]>([]);
  const userData = useSelector(
      (state: any) => state.userProfileReducer2.userProfile.result,
    );

  const requesToAssignList = allRequests?.filter(item => {
    if (item.status === 'PENDING') {
      return item
    }
  })

  useEffect(() => {
  }, [allRequestsObject, allRequestsLoading])

  const refreshRequestToAssign = async () => {
    const userId = await AsyncStorage.getItem(USER_ID)
    dispatch(getAllOrders({drugRepId: userData?.representativeId}))
  }

  const requestToAssignRenderItem = ({item}) => {
    return (
      <RequestToAssignTabInnerContainer key={item.orderItemId}>
        {
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
            forRequestToAssign={false} 
            itemId={item.orderItemId}
            addSelectedCard = {() => setCheckedCards([...checkedCards, item.orderItemId])}
          />
        }
      </RequestToAssignTabInnerContainer>
    )
  }

  
  // if (allRequestsLoading) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <LoadingIndicator />
  //     </View>
  //   )
  // }


  const onAssignToMe = async() => {
    const userId = await AsyncStorage.getItem(USER_ID);
    const items = checkedCards.toString()
    dispatch(postAssignOrderToMe({drugRepId: userId, orderItemIds: items}))
  }

  return (
    <>
      <RequestToAssignTabMainContainer>
        {requesToAssignList?.length !== 0 ? 
          <FlatList
            contentContainerStyle={{paddingBottom: SPACING.v175}}
            data={requesToAssignList}
            showsVerticalScrollIndicator={false}
            renderItem={requestToAssignRenderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            onRefresh={refreshRequestToAssign}
            refreshing={loading}
          /> 
          : 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: SPACING.h50}}>
          <Text style={{fontSize: Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f10 : FONT_SIZE.f15 : isTablet ? FONT_SIZE.f10 : FONT_SIZE.f15}}>
            Currently there is no orders requests to assign
          </Text>
        </View>
      }
      </RequestToAssignTabMainContainer>
      {requesToAssignList?.length !== 0 && 
        <RequestToAssignTabBottomWrapper style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}>
          <TouchableOpacity onPress={onAssignToMe} activeOpacity={0.7}>
            <ReUsableButton title='Assign To Me' color="orange" />
          </TouchableOpacity>
        </RequestToAssignTabBottomWrapper>
      }
    </>
  )
}

export default RequestToAssignTab;

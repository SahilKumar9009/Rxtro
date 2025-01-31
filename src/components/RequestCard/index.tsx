import React, {useState} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {
  blueColor,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  successButtonColor,
  USER_ID,
} from '../../constants';
import ConfirmDeliveryModal from '../ConfirmDeliveryModal';
import RequestCardDetail from '../RequestCardDetail';
import ReUsableButton from '../ReUsableButton';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {
  RequestCardMainContainer,
  RequestCardInnerContainerOne,
  RequestCardCheckBoxWrapper,
  RequestCardDetailWrapper,
  RequestCardProductName,
  RequestCardAddressWrapper,
  RequestCardAddressText,
  RequestCardStatusWrapper,
  RequestCardStatusText,
  RequestCardClinicText,
} from './styled';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postAssignOrderToMe, postConfirmOrderItem} from '../../actions';
import {Checkbox} from 'react-native-paper';
import {View} from 'react-native';
import LoadingIndicator from '../LoadingIndicator';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

type Props = {
  doctorName: string;
  productName: string;
  address: string;
  status: string;
  date: string;
  orderNo: string;
  quantity: number;
  isAssigned: boolean;
  clinicName: string;
  forRequestToAssign?: boolean;
  forAssignedToMe?: boolean;
  itemId: number;
  addSelectedCard: () => void;
};

const RequestCard: React.FC<Props> = ({
  doctorName,
  productName,
  address,
  status,
  date,
  orderNo,
  quantity,
  isAssigned,
  clinicName,
  forRequestToAssign,
  forAssignedToMe,
  itemId,
  addSelectedCard,
}) => {
  const [isConfirmDeliveryModalVisible, setConfirmDeliveryModalVisible] =
    useState(false);
  const dispatch = useDispatch<TypedDispatch>();
  const [checked, setChecked] = useState<boolean>(false);
  const allRequestsObject = useSelector(
    (state: any) => state.getAllOrdersReducer,
  );
  const allRequests = allRequestsObject.orders.result;
  const allRequestsLoading = allRequestsObject.loading;
  const [assignedPressed, setAssignedPressed] = useState(false);
  const [confirmPressed, setConfirmPressed] = useState(false);
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const toggleConfirmDeliveryModal = () => {
    setConfirmDeliveryModalVisible(true);
  };

  const handleCheck = () => {
    return setChecked(!checked);
  };

  const handlePress = () => {
    handleCheck();
    if (!checked) {
      addSelectedCard();
    }
  };

  const onAssignMe = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    setAssignedPressed(true);
    dispatch(postAssignOrderToMe({drugRepId: userData?.representativeId, orderItemIds: itemId}));
  };

  const onConfirmDelivery = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    setConfirmPressed(true);
    dispatch(postConfirmOrderItem({drugRepId: userData?.representativeId, orderItemIds: itemId}));
  };

  return (
    <>
      <RequestCardMainContainer
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
          borderWidth: 3,
          borderColor:
            status === 'DELIVERED'
              ? successButtonColor
              : status === 'PENDING'
              ? 'orange'
              : blueColor,
        }}>
        {allRequestsLoading &&
          (assignedPressed || confirmPressed || checked) && (
            <LoadingIndicator />
          )}
        <RequestCardInnerContainerOne>
          {!forAssignedToMe && !forRequestToAssign ? (
            <RequestCardCheckBoxWrapper>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={handlePress}
                color={mainBackgroundColor}
              />
            </RequestCardCheckBoxWrapper>
          ) : null}
          <RequestCardDetailWrapper>
            <RequestCardProductName>{doctorName}</RequestCardProductName>
            <RequestCardClinicText>{clinicName}</RequestCardClinicText>
            <RequestCardAddressWrapper>
              <FontIcon
                name="map-pin"
                size={
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f10
                      : FONT_SIZE.f11
                    : isTablet
                    ? FONT_SIZE.f10
                    : FONT_SIZE.f11
                }
                color="skyblue"
              />
              <RequestCardAddressText>{address}</RequestCardAddressText>
            </RequestCardAddressWrapper>
          </RequestCardDetailWrapper>
          <RequestCardStatusWrapper>
            {status === 'DELIVERED' ? (
              <>
                <RequestCardStatusText style={{color: successButtonColor}}>
                  {status}
                </RequestCardStatusText>
                <RequestCardStatusText style={{color: successButtonColor}}>
                  {date}
                </RequestCardStatusText>
              </>
            ) : status === 'PENDING' ? (
              <>
                <RequestCardStatusText style={{color: 'orange'}}>
                  {status}
                </RequestCardStatusText>
                <RequestCardStatusText style={{color: 'orange'}}>
                  {date}
                </RequestCardStatusText>
              </>
            ) : (
              <>
                <RequestCardStatusText style={{color: blueColor}}>
                  {status}
                </RequestCardStatusText>
                <RequestCardStatusText style={{color: blueColor}}>
                  {date}
                </RequestCardStatusText>
              </>
            )}
          </RequestCardStatusWrapper>
        </RequestCardInnerContainerOne>
        {Platform.OS === 'ios' ? (
          Platform.isPad ? null : (
            <>
              <RequestCardDetail
                assigned={isAssigned}
                displayName={productName}
                orderNo={orderNo}
                quantity={quantity}
              />
              {forAssignedToMe && status === 'INPROGRESS' ? (
                <TouchableOpacity
                  style={{width: '90%', alignSelf: 'center', marginBottom: 10}}
                  onPress={onConfirmDelivery}
                  activeOpacity={0.7}>
                  <ReUsableButton color={blueColor} title="Confirm Delivery" />
                </TouchableOpacity>
              ) : forRequestToAssign && status === 'PENDING' ? (
                <TouchableOpacity
                  style={{width: '90%', alignSelf: 'center', marginBottom: 10}}
                  onPress={onAssignMe}
                  activeOpacity={0.7}>
                  <ReUsableButton color="orange" title="Assigned me" />
                </TouchableOpacity>
              ) : null}
            </>
          )
        ) : isTablet ? null : (
          <>
            <RequestCardDetail
              assigned={isAssigned}
              displayName={productName}
              orderNo={orderNo}
              quantity={quantity}
            />
            {forAssignedToMe && status === 'INPROGRESS' ? (
              <TouchableOpacity
                style={{width: '90%', alignSelf: 'center', marginBottom: 10}}
                onPress={toggleConfirmDeliveryModal}
                activeOpacity={0.7}>
                <ReUsableButton color={blueColor} title="Confirm Delivery" />
              </TouchableOpacity>
            ) : forRequestToAssign && status === 'PENDING' ? (
              <TouchableOpacity
                style={{width: '90%', alignSelf: 'center', marginBottom: 10}}
                onPress={onAssignMe}
                activeOpacity={0.7}>
                <ReUsableButton color="orange" title="Assigned me" />
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </RequestCardMainContainer>
      <ConfirmDeliveryModal
        isVisible={isConfirmDeliveryModalVisible}
        onBackdropPress={() => setConfirmDeliveryModalVisible(false)}
        displayName={productName}
        name="Ostelin"
        quantity={quantity}
        delivered={6}
      />
    </>
  );
};

export default RequestCard;

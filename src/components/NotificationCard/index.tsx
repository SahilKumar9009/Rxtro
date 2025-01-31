import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FONT_SIZE, REDUCER} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {
  NotificationCardMainContainer,
  NotificationCardWrapperOne,
  NotificationCardPrimaryText,
  NotificationCardWrapperTwo,
  NotifcationCardHeadingText,
  NotificationCardAddressWrapper,
  NotificationCardWrapperThree,
  StatusText,
} from './styled';
import {getSurgeryDetail, postShowEditNotifications} from '../../actions';
import {startLoader} from '../../actions/globalLoader';

type Props = {
  clinicName: string;
  timings: string;
  surgeryId: string;
  territoryId: number;
  status: string;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const NotificationCard: React.FC<Props> = ({
  clinicName,
  timings,
  surgeryId,
  territoryId,
  status,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<TypedDispatch>();

  const handlePress = () => {
    if (status !== 'Vacant') {
      return;
    }
    dispatch(startLoader());
    dispatch({type: REDUCER.STORE_SURGERY_ID, payload: surgeryId});
    dispatch({type: REDUCER.STORE_TERRITORY_ID, payload: territoryId});
    dispatch(getSurgeryDetail({surgeryId: +surgeryId}));
    // dispatch(postShowEditNotifications({territoryId: territoryId}));
    navigation.navigate('MyTerritoryDetailScreen', {requireBack: true});
  };

  return (
    <NotificationCardMainContainer
      style={{
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }}
      onPress={handlePress}
      activeOpacity={0.7}>
      <NotificationCardWrapperOne>
        <Icon name="circle-o" size={FONT_SIZE.f20} color={'lightgreen'} />
        <NotificationCardPrimaryText>
          New Appointments Available
        </NotificationCardPrimaryText>
      </NotificationCardWrapperOne>
      <NotificationCardWrapperTwo>
        <NotificationCardAddressWrapper>
          <NotifcationCardHeadingText>{clinicName}</NotifcationCardHeadingText>
        </NotificationCardAddressWrapper>
      </NotificationCardWrapperTwo>
      <NotificationCardWrapperThree>
        <NotificationCardPrimaryText>{timings}</NotificationCardPrimaryText>
        <StatusText style={{color: status === 'Vacant' ? 'green' : 'red'}}>
          {status}
        </StatusText>
      </NotificationCardWrapperThree>
    </NotificationCardMainContainer>
  );
};

export default NotificationCard;

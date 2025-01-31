import React from 'react';
import FontIcon from 'react-native-vector-icons/Ionicons';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
import {isTablet, mainBackgroundColor, REDUCER} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getSurgeryDetail,
  getSurgeryDetailLoading,
  postShowEditNotifications,
  postShowEditNotificationsLoading,
} from '../../actions';
import {startLoader} from '../../actions/globalLoader';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

type Props = {
  heading: string;
  state?: string;
  address: string;
  highlighted?: boolean;
  onPress?: () => void;
  onPressTarget?: () => void;
  onPressAutomatic?: () => void;
  onPressManual?: () => void;
  surgeryId?: number;
  territoryId?: number;
  isAppointed: boolean;
  isDropIn: boolean;
  isDnsr: boolean;
  isContract: boolean;
  isTarget: boolean;
  item: any;
};

const TAGS = {
  Target: '#EA7330',
  Manual: mainBackgroundColor,
  Automatic: '#78788033',
};
const RXTRO_STATUS = {
  1: 'Automatic',
  0: 'Manual',
};
const TagView = ({type, onPress}: {type: string; onPress?: () => void}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
        width: 100,
        borderRadius: 100,
        backgroundColor: TAGS[type],
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginHorizontal: 2,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: type === RXTRO_STATUS[1] ? '#333333' : 'white',
          textAlign: 'center',
          fontSize: 11,
          fontWeight: '400',
        }}>
        {type}
      </Text>
    </TouchableOpacity>
  );
};
const MyTerritoryCard: React.FC<Props> = ({
  surgeryId,
  territoryId,
  item,
  onPressTarget,
  onPressAutomatic,
  onPressManual,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<TypedDispatch>();
  // To handle the navigation and dispatching the action
  const handlePress = () => {
    dispatch(startLoader());
    // ! use this surgery id from redux
    dispatch({type: REDUCER.STORE_SURGERY_ID, payload: surgeryId});
    dispatch(getSurgeryDetail({surgeryId: surgeryId}));
    dispatch(getSurgeryDetailLoading());
    // ! use this territory id from redux
    dispatch({type: REDUCER.STORE_TERRITORY_ID, payload: territoryId});

    dispatch(postShowEditNotifications({territoryId: territoryId}));
    dispatch(postShowEditNotificationsLoading());
    // ! for IPads we do not navigate, instead we display the screen sideways
    Platform.OS === 'ios'
      ? Platform.isPad
        ? null
        : navigation.navigate('MyTerritoryDetailScreen', {requireBack: false})
      : isTablet
      ? null
      : navigation.navigate('MyTerritoryDetailScreen', {requireBack: false});
  };
  const attendees = item?.['attendees']?.join(', ');
  console.log({item});
  return (
    <Pressable
      onPress={handlePress}
      style={{
        width: '100%',
        padding: 8,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {item['isTarget'] && <TagView type="Target" onPress={onPressTarget} />}
        <TagView
          type={RXTRO_STATUS[item['isAutomatic'] ? 1 : 0]}
          onPress={item['isAutomatic'] ? onPressAutomatic : onPressManual}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: '#666666',
            fontSize: 12,
            fontWeight: '700',
            width: '96%',
          }}>
          Participants: {attendees}
        </Text>
        <Arrow name="arrow-right" size={12} color="#007AFF" />
      </View>
      <Text
        numberOfLines={1}
        style={{color: '#000000', fontSize: 14, fontWeight: '700'}}>
        {item['surgeryName']}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <FontIcon
          name="location-sharp"
          size={14}
          color="#1F6D9C"
          style={{marginRight: 5}}
        />
        <Text
          numberOfLines={1}
          style={{
            color: '#3C3C4399',
            fontSize: 14,
            fontWeight: '400',
            width: '93%',
          }}>
          {item['surgery-address']}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: item['appointment-date'] ? '#1F6D9C' : 'transparent',
              fontSize: 10,
              fontWeight: '500',
            }}>
            BOOKED FOR
          </Text>
          <Text
            style={{
              color: '#666666',
              fontSize: 14,
              fontWeight: '400',
              marginTop: 3,
            }}>
            {item['appointment-date']}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 'auto',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              textAlign: 'right',
              color: '#007AFF',
              fontSize: 12,
              fontWeight: '400',
            }}>
            Book Another
          </Text>
          <Arrow
            name="arrow-right"
            size={12}
            color="#007AFF"
            style={{marginLeft: 10}}
          />
        </View>
      </View>
    </Pressable>
  );
  // return (
  //   <MyTerritoryCardMainContainer
  //     style={{
  //       padding: 10,
  //       borderRadius: 8,
  //       marginVertical: 10,
  //       shadowColor: '#171717',
  //       shadowOffset: {width: 2, height: 2},
  //       shadowOpacity: 0.3,
  //       shadowRadius: 4,
  //       borderColor:
  //         !isAppointed && !isDropIn && !isDnsr && !isContract
  //           ? 'orange'
  //           : isTarget
  //           ? '#CC6600'
  //           : 'white',
  //       borderWidth: 3,
  //     }}
  //     onPress={handlePress}
  //     activeOpacity={0.7}>
  //     <MyTerritoryCardInnerContainer orangeBorder={highlighted}>
  //       <MyTerritoryCardHeadingText>{heading}</MyTerritoryCardHeadingText>
  //       <MyTerritorySecondaryText>{state}</MyTerritorySecondaryText>
  //       <MyTerritoryCardAddressWrapper>
  //         <FontIcon
  //           name="map-pin"
  //           size={
  //             Platform.OS === 'ios'
  //               ? Platform.isPad
  //                 ? FONT_SIZE.f7
  //                 : FONT_SIZE.f14
  //               : isTablet
  //               ? FONT_SIZE.f7
  //               : FONT_SIZE.f14
  //           }
  //           color="skyblue"
  //           style={{marginRight: 5}}
  //         />
  //         <MyTerritorySecondaryText>{address}</MyTerritorySecondaryText>
  //       </MyTerritoryCardAddressWrapper>
  //     </MyTerritoryCardInnerContainer>
  //   </MyTerritoryCardMainContainer>
  // );
};

export default MyTerritoryCard;

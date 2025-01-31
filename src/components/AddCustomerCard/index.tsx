import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {
  ActionText,
  CircleContainer,
  CircleText,
  HeadingText,
  MyTerritoryCardMainContainer,
  PressableContainer,
  SubContainer,
} from './styled';
import IndividualIcon from '../../assets/Svg/IndividualIcon';
import GroupMeeting from '../../assets/Svg/GroupMeeting';
import {
  IconHeadingContainer,
  StyledFontIcon,
  AddressText,
} from '../TeritoryCard/styled';
import {isTablet, mainBackgroundColor} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import combineReducer from '../../reducers';
import addCustomerGroup from '../../apiActions/AddingCustomer/addCustomerGroup';
import addCustomerIndividual from '../../apiActions/AddingCustomer/addCustomerIndividual';
import removeCustomerGroup from '../../apiActions/AddingCustomer/removeCustomerGroup';
import removeCustomerIndividual from '../../apiActions/AddingCustomer/removeCustomerIndividual';

const TAGS = {
  Target: '#EA7330',
  Manual: mainBackgroundColor,
  Automatic: '#78788033',
};
const RXTRO_STATUS = {
  1: 'Automatic',
  0: 'Manual',
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const TagView = ({type, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 86,
        height: 16,
        borderRadius: 60,
        backgroundColor: TAGS[type],
        marginVertical: 8,
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

const CustomCard = ({item, index, listData, setItems}) => {
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );
  const userId = userData?.userId;
  const ClinicId = item?.clinic_id;
  const individualId = item?.doctor_id;

  const handleAddCustomer = async added => {
    try {
      if (added) {
        if (individualId > 0) {
          await dispatch(
            removeCustomerIndividual(userId, ClinicId, individualId),
          );
        } else {
          await dispatch(removeCustomerGroup(userId, ClinicId));
        }
        setItems(listData =>
          listData.map(c => (c.id === item.id ? {...c, added: false} : c)),
        );
      } else {
        if (individualId > 0) {
          await dispatch(addCustomerIndividual(userId, ClinicId, individualId));
        } else {
          await dispatch(addCustomerGroup(userId, ClinicId));
        }
        setItems(listData =>
          listData.map(c => (c.id === item.id ? {...c, added: true} : c)),
        );
      }
    } catch (error) {
      console.error('Error adding/removing customer:', error);
    }
  };

  const dispatch = useDispatch<TypedDispatch>();

  return (
    <MyTerritoryCardMainContainer>
      <View style={{flexDirection: 'row', marginStart: 3}}>
        <View style={{marginTop: 18}}>
          {item.individual ? <IndividualIcon /> : <GroupMeeting />}
        </View>

        <View style={{flex: 1}}>
          <View>
            <TagView
              type={item.automatic ? 'Automatic' : 'Manual'}
              onPress={undefined}
            />
          </View>

          <View
            style={{
              flexDirection:
                Platform.OS === 'ios' && Platform.isPad
                  ? 'row'
                  : isTablet
                  ? 'row'
                  : 'row',
              justifyContent:
                Platform.OS === 'ios' && Platform.isPad
                  ? 'space-between'
                  : isTablet
                  ? 'space-between'
                  : undefined,
            }}>
            <SubContainer>
              <Text style={{}}>
                <Text
                  style={[HeadingText, {color: '#0000FF', fontWeight: '700'}]}
                  numberOfLines={1}>
                  {item?.suburb}
                </Text>
                <Text
                  style={[
                    HeadingText,
                    {
                      color: '#000000',
                      fontSize: 12,
                      fontWeight: '500',
                    },
                  ]}>
                  {'-'} {item?.clinic_name}
                </Text>
              </Text>

              <IconHeadingContainer>
                <StyledFontIcon
                  name="location-sharp"
                  size={10}
                  color="#717896"
                />
                <AddressText>
                  {item.street} {item.state}
                </AddressText>
              </IconHeadingContainer>
            </SubContainer>
            <PressableContainer onPress={() => handleAddCustomer(item?.added)}>
              <CircleContainer added={item?.added}>
                <CircleText added={item?.added}>
                  {item?.added ? 'X' : '+'}
                </CircleText>
              </CircleContainer>
              <ActionText>{item?.added ? 'Del' : 'Add'}</ActionText>
            </PressableContainer>
          </View>
        </View>
      </View>
    </MyTerritoryCardMainContainer>
  );
};

export default CustomCard;

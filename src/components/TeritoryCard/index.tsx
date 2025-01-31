import {View, Text, TouchableOpacity, Dimensions, Platform, Linking} from 'react-native';
import React, {useState} from 'react';
import CustomDropdown from '../CustomDropDown';
import {isTablet, mainBackgroundColor, REDUCER, SPACING} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  IconHeadingContainer,
  AddressText,
  StyledFontIcon,
  MyTerritoryCardMainContainer,
  ButtonText,
  ButtonContainer2,
} from './styled';
import Calendar from '../../assets/Svg/Calendar';
import Cross from '../../assets/Svg/Cross';
import EditIcon from '../../assets/Svg/EditIcon';
import GroupMeeting from '../../assets/Svg/GroupMeeting';
import IndividualIcon from '../../assets/Svg/IndividualIcon';
import Phone from '../../assets/Svg/Phone';
import Telephone from '../../assets/Svg/Telephone';
import SlotFrequenciesModal from '../ReschedulceComponent';
import ReloadIcon from '../../assets/Svg/ReloadIcon';
import ManageNotificationModal from '../ManageNotificationModal';

const TAGS = {
  Target: '#EA7330',
  Manual: mainBackgroundColor,
  Automatic: '#78788033',
};
const RXTRO_STATUS = {
  1: 'Automatic',
  0: 'Manual',
};

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

const TerritoryCard = ({
  item,
  index,
  setDetailScreen,
  setDoctorId,
  setIsIndividual,
  meetingType,
}) => {
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [scheduleData, setScheduleData] = useState();
  const [shownotification, setShownotification] = useState(false);
  const [title, setTitle] = useState('');

  function formatPhoneNumber(phone) {
    const countryCode = phone.substring(0, 2);
    const areaCode = phone.substring(4, 6);
    const number = phone.substring(6, 10);
    const secondNumber = phone.substring(10, phone.length);
    return `+${countryCode} (${areaCode}) ${number} ${secondNumber}`;
  }

  const options = [
    {
      label: formatPhoneNumber(item?.phone),
      value: 'option1',
      Icon: Phone,
      onPress: () => {},
      title: item?.clinic,
    },
    {
      label: formatPhoneNumber(item?.fax),
      value: 'option2',
      Icon: Telephone,
      onPress: () => {},
    },
    {
      label: 'View Customer Schedules',
      value: 'option4',
      Icon: Calendar,
      onPress: () => {
        setTitle(item?.clinic);
      },
      title: item?.clinic_name,
    },
    {
      label: 'Edit Notification',
      value: 'option3',
      Icon: EditIcon,
      onPress: () => {},
    },
    // {
    //   label: 'Remove Territory',
    //   value: 'option5',
    //   color: 'red',
    //   Icon: Cross,
    //   onPress: () => {},
    // },
  ];
  
  const handlePress = item => {
    setIsIndividual(item.individual);
    dispatch({type: REDUCER.STORE_TERRITORY_ID, payload: item.territory_id});
    setDoctorId(item.docter_id);
    dispatch({type: REDUCER.STORE_SURGERY_ID, payload: item.doctor_id});
    setDetailScreen(true);
  };

  return (
    <MyTerritoryCardMainContainer>
      <View style={{flexDirection: 'row', marginStart: 3}}>
        <View style={{marginTop: '1%'}}>
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
                  : undefined,
              justifyContent:
                Platform.OS === 'ios' && Platform.isPad
                  ? 'space-between'
                  : isTablet
                  ? 'space-between'
                  : undefined,
            }}>
            <View
              style={{
                width:
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? '40%'
                      : '60%'
                    : isTablet
                    ? '40%'
                    : '60%',
              }}>
              <Text style={{}}>
                <Text
                  style={[
                    {
                      fontFamily:
                        Platform.OS === 'android' ? 'roboto' : undefined,
                      fontSize: 12,
                      color: '#070F37',
                      fontWeight: '500',
                    },
                    {color: '#0000FF', fontWeight: '700'},
                  ]}
                  numberOfLines={1}>
                  {item?.suburb}
                </Text>
                <Text
                  style={[
                    {
                      fontFamily:
                        Platform.OS === 'android' ? 'roboto' : undefined,
                      fontSize: 12,
                      color: '#070F37',
                      fontWeight: '500',
                      width: 150,
                    },
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
            </View>

            <View
              style={{
                marginTop: SPACING.h8,
                marginStart:
                  (Platform.OS === 'ios' && Platform.isPad) || isTablet
                    ? '30%'
                    : undefined,
              }}>
              <ButtonContainer2
                onPress={() => handlePress(item)}
                buttonBackgroundColor={
                  item?.app_date ? mainBackgroundColor : mainBackgroundColor
                }
                isTablet={isTablet}>
                {item?.app_date && <ReloadIcon />}
                <ButtonText>
                  {item?.app_date ? `${item?.app_date}` : 'Book'}
                </ButtonText>
              </ButtonContainer2>

              <CustomDropdown
                options={options}
                setTitle={setTitle}
                placeholder={'OPTIONS'}
                data={options}
                setShowModal={setShowModal}
                setShownotification={setShownotification}
              />
            </View>
          </View>
        </View>
      </View>

      {showModal && (
        <SlotFrequenciesModal
          title={title}
          isvisible={showModal}
          onClose={() => setShowModal(false)}
          teritoryId={item.territory_id}
        />
      )}

      {shownotification && (
        <ManageNotificationModal
          isVisible={shownotification}
          territoryId={item.territory_id}
          onBackdropPress={() => setShownotification(false)}
        />
      )}
    </MyTerritoryCardMainContainer>
  );
};

export default TerritoryCard;

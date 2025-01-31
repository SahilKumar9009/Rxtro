import React, { useEffect, useState } from 'react';
import {AvailabilityCardMainContainer, AvailabilityCardDetailContainer, AvailabilityCardPrimaryText, AvailabilityCardLocationContainer, AvailabilityCardSecondaryText} from './styled';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { StackParams } from '../../navigation/StackNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { FONT_SIZE, isTablet, mainBackgroundColor } from '../../constants';
import LoadingIndicator from '../LoadingIndicator';
import { Platform, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

type Props = {
  time: string,
  scheduleId: string
  unformattedDate: string
  clinicName: string,
  location: string,
  needCheck?: boolean,
  isModal?: boolean,
  isSwappable: boolean,
  surgeryId?: number
  currentAppId: number,
  forSwapModal?: boolean,
  selectCard: () => void
}


const AvailabilityCard:React.FC<Props> = (
  {
    time, 
    unformattedDate, 
    scheduleId, 
    clinicName, 
    location, 
    needCheck, 
    isModal, 
    isSwappable,
    surgeryId,
    currentAppId,
    forSwapModal,
    selectCard
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>()
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(needCheck);

  useEffect(() => {
    if (time || unformattedDate || scheduleId || clinicName || location || isSwappable) {
      setLoading(false)
    }
    return;
  }, [])

  if (loading) {
    return (
      <View style={{width: '100%'}}>
        <LoadingIndicator />
      </View>
    )
  }

  return (
    <AvailabilityCardMainContainer style={{
      shadowColor: '#171717',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 5,
    }} 
      onPress={() => isModal ? null : navigation.navigate('AvailabilityDetailScreen', 
      {
        unformattedDate: unformattedDate,
        surgeryId: surgeryId, 
        scheduleId: scheduleId,
        isSwappable: isSwappable,
        clinicName: clinicName,
        location: location,
        currentAppId: currentAppId
      })}
      activeOpacity={0.7}
    >
      <AvailabilityCardDetailContainer>
        {forSwapModal ?
        <Checkbox.Item
          position='trailing'
          mode='android'
          labelStyle={{
            width: '90%', 
            fontSize: Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f14 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f14,
            fontWeight: 'bold'
          }}
          label={time + ' - ' + clinicName}
          status={checked ? 'checked' : 'unchecked'}
          color={mainBackgroundColor}
          onPress={() => {
            setChecked(!checked)
            if (!checked) {
              selectCard();
            }
          }}
        /> : 
        <AvailabilityCardPrimaryText>{time} - {clinicName}</AvailabilityCardPrimaryText>
      }
      </AvailabilityCardDetailContainer>
      <AvailabilityCardLocationContainer>
        <FontIcon name="map-pin" size={FONT_SIZE.f13} color='skyblue' />
        <AvailabilityCardSecondaryText>{location}</AvailabilityCardSecondaryText>
      </AvailabilityCardLocationContainer>
    </AvailabilityCardMainContainer>
  )
}

export default AvailabilityCard
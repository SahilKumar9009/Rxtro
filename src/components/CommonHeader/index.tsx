import React from 'react';
import {
  CommonHeadeMainContainer,
  CommonHeaderBackIconContainer,
  CommonHeaderInnerContainer,
  CommonHeaderContainerOne,
  CommonHeaderContainerTwo,
  CommonHeaderPrimaryText,
  CommonHeaderSecondaryText,
  CommonHeaderStatusText,
} from './styled';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import BarStatus from '../BarStatus';
import {FONT_SIZE, isTablet} from '../../constants';
import {Platform} from 'react-native';

type Props = {
  appointmentStatus?: string;
  time?: string;
  clinicName: string;
  clinicAddress?: string;
  suburb?: string;
  date?: string;
  onPress?: () => void;
};

const CommonHeader: React.FC<Props> = ({
  appointmentStatus,
  time,
  clinicName,
  clinicAddress,
  suburb,
  date,
}) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  return (
    <>
      <BarStatus />
      <CommonHeadeMainContainer>
        <CommonHeaderBackIconContainer
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Icon
            name="chevron-back"
            size={
              Platform.OS === 'ios'
                ? Platform.isPad
                  ? FONT_SIZE.f16
                  : FONT_SIZE.f30
                : isTablet
                ? FONT_SIZE.f16
                : FONT_SIZE.f30
            }
            color="white"
          />
        </CommonHeaderBackIconContainer>
        <CommonHeaderInnerContainer>
          <CommonHeaderContainerOne>
            {!time ? (
              <CommonHeaderPrimaryText>{clinicName}</CommonHeaderPrimaryText>
            ) : (
              <CommonHeaderPrimaryText>
                {time.trim()} : {date} - {clinicName}
              </CommonHeaderPrimaryText>
            )}
          </CommonHeaderContainerOne>
          <CommonHeaderContainerTwo>
            {clinicAddress ? (
              <>
                <FontIcon name="map-pin" size={FONT_SIZE.f12} color="skyblue" />
                <CommonHeaderSecondaryText>
                  {clinicAddress} {suburb}
                </CommonHeaderSecondaryText>
              </>
            ) : null}
          </CommonHeaderContainerTwo>
        </CommonHeaderInnerContainer>
        {appointmentStatus && (
          <CommonHeaderStatusText>{appointmentStatus}</CommonHeaderStatusText>
        )}
      </CommonHeadeMainContainer>
    </>
  );
};

export default CommonHeader;

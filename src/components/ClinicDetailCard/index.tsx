import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native'
import {ClinicDetailMainContainer, ClinicDetailCardWrapper, ClinicDetailBoldText, ClinicDetailPrimaryText, ClinicDetailTouchableWrapper, ClinicDetailPhoneNumber, ClinicDetailAdressWrapper} from './styled';

type Props = {
  clinicName: string,
  clinicAddress: string,
  clinicPhoneNumber: string,
  suburb?: string
}

const ClinicDetailCard:React.FC<Props> = ({clinicName, clinicAddress, clinicPhoneNumber}) => {
  const [callPressed, setCallPressed] = useState(false);

  useEffect(() => {
    setCallPressed(true)
  }, [callPressed])

  const onCallPress = () => {
    setCallPressed(true);
    if (callPressed) {
      Linking.openURL(`tel:${clinicPhoneNumber}`)
    }
  }

  return (
    <ClinicDetailMainContainer>
      <ClinicDetailCardWrapper>
        <ClinicDetailPrimaryText>Surgery:</ClinicDetailPrimaryText>
        <ClinicDetailBoldText>{clinicName}</ClinicDetailBoldText>
      </ClinicDetailCardWrapper>
      <ClinicDetailCardWrapper>
        <ClinicDetailPrimaryText>Address:</ClinicDetailPrimaryText>
        <ClinicDetailAdressWrapper>
          <ClinicDetailBoldText>{clinicAddress}</ClinicDetailBoldText>
        </ClinicDetailAdressWrapper>
      </ClinicDetailCardWrapper>
      <ClinicDetailCardWrapper>
        <ClinicDetailPrimaryText>Phone:</ClinicDetailPrimaryText>
        <ClinicDetailTouchableWrapper onPress={onCallPress} activeOpacity={0.7}>
          <ClinicDetailPhoneNumber>{clinicPhoneNumber}</ClinicDetailPhoneNumber>
        </ClinicDetailTouchableWrapper>
      </ClinicDetailCardWrapper>
    </ClinicDetailMainContainer>
  )
}

export default ClinicDetailCard
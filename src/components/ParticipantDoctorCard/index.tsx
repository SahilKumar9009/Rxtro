import React from 'react';
import { View } from 'react-native';
import {ParticipantDoctorWrapper, ParticipantDoctorImage, ParticipantDoctorName, ParticipantDoctorDesignation, ParticipantDoctorContribution} from './styled';

type Props = {
  doctorName: string,
  desgination?: string,
  imageUrl?: any,
  contribution?: string
}

const ParticipantDoctorCard:React.FC<Props> = ({doctorName, imageUrl, desgination, contribution}) => {
  return (
    <ParticipantDoctorWrapper>
      <ParticipantDoctorImage source={require('../../assets/doctorAvatar.jpeg')} />
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}} >
        <ParticipantDoctorName>{doctorName}</ParticipantDoctorName>
        <ParticipantDoctorDesignation>{desgination ? "- " + desgination : null}</ParticipantDoctorDesignation>
      </View>
      {contribution ? 
        <ParticipantDoctorContribution>{contribution}%</ParticipantDoctorContribution> : null
      }
    </ParticipantDoctorWrapper>
  )
}

export default ParticipantDoctorCard
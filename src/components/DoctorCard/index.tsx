import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZE } from '../../constants';
import {DoctorCardMainContainer, DoctorCardDetailsContainer, DoctorCardImage, DoctorNameText, DoctorDesignationText} from './styled';

type Props = {
  name: string,
  desgination: string,
  companyName: string
}

const DoctorCard:React.FC<Props> = ({name, desgination, companyName}) => {
  return (
    <DoctorCardMainContainer>
      <DoctorCardImage source={require('../../assets/man.jpeg')} />
      <DoctorCardDetailsContainer>
        <DoctorNameText>{name}</DoctorNameText>
        <DoctorDesignationText>{companyName}--{desgination}</DoctorDesignationText>
      </DoctorCardDetailsContainer>
      <Icon name="chevron-forward" size={FONT_SIZE.f12} color='grey' style={{marginLeft: 'auto' }}/>
    </DoctorCardMainContainer>
  )
}

export default DoctorCard;
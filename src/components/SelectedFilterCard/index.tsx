import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { FONT_SIZE } from '../../constants';
import {SelectedFilterMainContainer, SelectedFilterCardEachContainer, SelectedFilterCardText, SelectedFilterHeadingText} from './styled';

type Props = {
  heading: string
  hideCard: () => void
}

const SelectedFilterCard:React.FC<Props> = ({heading, hideCard}) => {
  return (
    <SelectedFilterMainContainer>
      <SelectedFilterHeadingText>Clinic Name:</SelectedFilterHeadingText>
      <SelectedFilterCardEachContainer>
        <SelectedFilterCardText numberOfLines={1}>{heading}</SelectedFilterCardText>
        <TouchableOpacity onPress={hideCard}>
          <Icon name="close-circle-outline" size={FONT_SIZE.f18} color='black' />
        </TouchableOpacity>
      </SelectedFilterCardEachContainer>
    </SelectedFilterMainContainer>
  )
}

export default SelectedFilterCard
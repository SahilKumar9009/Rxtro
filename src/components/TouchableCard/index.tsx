import React from 'react';
import {TouchableCardContainer, TouchableCardText} from './styled';

type Props = {
  title: string
}

const TouchableCard:React.FC<Props> = ({title}) => {
  return (
    <TouchableCardContainer>
      <TouchableCardText>{title}</TouchableCardText>
    </TouchableCardContainer>
  )
}

export default TouchableCard
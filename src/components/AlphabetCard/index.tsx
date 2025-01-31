import React  from 'react';
import {AlphabetMainContainer, AlphabetContainer, AlphabetText} from './styled';

type Props = {
  alphabet: string,
  onPressLetter?: () => void
  onPressHash?: () => void
  isPressed?: boolean
}


const AlphabetCard:React.FC<Props> = ({alphabet, onPressLetter, onPressHash, isPressed}) => {
  return (
    <AlphabetMainContainer>
      <AlphabetContainer onPress={onPressLetter ? onPressLetter : onPressHash}>
        <AlphabetText>{alphabet}</AlphabetText>
      </AlphabetContainer>
    </AlphabetMainContainer>
  )
}

export default AlphabetCard
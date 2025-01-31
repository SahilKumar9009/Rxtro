import React from 'react'
import { ReUsableButtonWrapper, ReUsableButtonText } from './styled';

type Props = {
  title?: string,
  color?: string
}

const ReUsableButton:React.FC<Props> = ({title, color}) => {

  return (
    <ReUsableButtonWrapper color={color}>
      <ReUsableButtonText>{title}</ReUsableButtonText>
    </ReUsableButtonWrapper>
  )
}

export default ReUsableButton
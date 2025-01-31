import React from 'react';
import {DateCardContainer, DayText, MonthText} from './styled';

type Props = {
  day: string
  month: string
}

const DateCard:React.FC<Props> = ({day, month}) => {
  return (
    <DateCardContainer>
      <DayText>{day}</DayText>
      <MonthText>{month}</MonthText>
    </DateCardContainer>
  )
}

export default DateCard
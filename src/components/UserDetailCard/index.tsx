import React from 'react';
import {
  UserDetailCardMainContainer,
  UserDetailPrimaryText,
  UserDetailSecondaryText,
} from './styled';

type Props = {
  heading: string;
  answer?: string;
};

const UserDetailCard: React.FC<Props> = ({heading, answer}) => {
  return (
    <UserDetailCardMainContainer>
      <UserDetailPrimaryText>{heading}</UserDetailPrimaryText>
      <UserDetailSecondaryText>{answer}</UserDetailSecondaryText>
    </UserDetailCardMainContainer>
  );
};

export default UserDetailCard;

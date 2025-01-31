import React from 'react';
import {RequestCardDetailContainer, RequestCardDetailOrderHeadingContainer, RequestCardDetailOrderBoldText, RequestCardDetailOrderText, RequestCardDetailOrderDetailWrapper, RequestCardDetailInnerContainer} from './styled';

type Props = {
  orderNo: string,
  assigned: boolean,
  displayName: string,
  quantity: number,
}
const RequestCardDetail:React.FC<Props> = ({orderNo, assigned, displayName, quantity}) => {
  return (
      <>
        <RequestCardDetailContainer>
          <RequestCardDetailOrderHeadingContainer>
            <RequestCardDetailOrderBoldText>Order #: {orderNo}</RequestCardDetailOrderBoldText>
            <RequestCardDetailOrderText>{assigned ? 'Assigned' : 'Unassigned'}</RequestCardDetailOrderText>
          </RequestCardDetailOrderHeadingContainer>
          <RequestCardDetailOrderDetailWrapper>
            <RequestCardDetailInnerContainer>
              <RequestCardDetailOrderBoldText style={{alignSelf: 'flex-start'}}>Product Name</RequestCardDetailOrderBoldText>
              <RequestCardDetailOrderText numberOfLines={1} style={{textTransform: 'capitalize'}}>{displayName}</RequestCardDetailOrderText>
            </RequestCardDetailInnerContainer>
            <RequestCardDetailInnerContainer>
              <RequestCardDetailOrderBoldText style={{alignSelf: 'flex-start'}}>Quantity</RequestCardDetailOrderBoldText>
              <RequestCardDetailOrderText>{quantity}</RequestCardDetailOrderText>
            </RequestCardDetailInnerContainer>
          </RequestCardDetailOrderDetailWrapper>
        </RequestCardDetailContainer>
      </>
  )
}

export default RequestCardDetail
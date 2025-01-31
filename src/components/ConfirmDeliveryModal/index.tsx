import React from 'react';
import { TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { FONT_SIZE } from '../../constants';
import ReUsableButton from '../ReUsableButton';
import {ConfirmDeliveryModalMainContainer, ConfirmDeliveryModalInnerContainer, ConfirmDeliveryModalHeader, ConfirmDeliveryModalHeadingText, ConfirmDeliveryModalSubHeader, ConfirmDeliveryModalSubHeadingText, ConfirmDeliveryModalBodyWrapper, ConfirmDeliveryModalContentWrapper, ConfirmDeliveryModalSecondaryText, ConfirmDeliveryModalInputWrapper, ConfirmDeliveryModalInput, ConfirmDeliveryModalButtonWrapper} from './styled';

type Props = {
  isVisible: boolean,
  onBackdropPress?: () => void,
  displayName: string,
  name: string,
  quantity: number,
  delivered: number,
}

const ConfirmDeliveryModal:React.FC<Props> = ({isVisible, onBackdropPress, displayName, name, quantity, delivered}) => {
  const deliveredItems = delivered.toString();
  return (
    <>
      <Modal isVisible={isVisible} backdropOpacity={0.6} onBackdropPress={onBackdropPress}>
        <ConfirmDeliveryModalMainContainer>
          <ConfirmDeliveryModalInnerContainer>
            <ConfirmDeliveryModalHeader>
              <ConfirmDeliveryModalHeadingText>Confirm Delivery</ConfirmDeliveryModalHeadingText>
              <TouchableOpacity onPress={onBackdropPress} activeOpacity={0.7}>
                <Icon name="close-circle-outline" size={FONT_SIZE.f18} color='black' />
              </TouchableOpacity>
            </ConfirmDeliveryModalHeader>
            <ConfirmDeliveryModalSubHeader style={{
                shadowColor: '#171717',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}>
              <ConfirmDeliveryModalSubHeadingText>Product Name</ConfirmDeliveryModalSubHeadingText>
              <ConfirmDeliveryModalSubHeadingText>Quantity</ConfirmDeliveryModalSubHeadingText>
            </ConfirmDeliveryModalSubHeader>
          </ConfirmDeliveryModalInnerContainer>
          <ConfirmDeliveryModalBodyWrapper>
            <ConfirmDeliveryModalContentWrapper>
              <ConfirmDeliveryModalSecondaryText style={{textTransform: 'capitalize'}}>{displayName}</ConfirmDeliveryModalSecondaryText>
              <ConfirmDeliveryModalInputWrapper>
                <ConfirmDeliveryModalInput defaultValue={quantity.toString()} textAlign={'center'} />
              </ConfirmDeliveryModalInputWrapper>
            </ConfirmDeliveryModalContentWrapper>
          </ConfirmDeliveryModalBodyWrapper>
          <ConfirmDeliveryModalButtonWrapper onPress={onBackdropPress} activeOpacity={0.7}>
            <ReUsableButton title='Save' />
          </ConfirmDeliveryModalButtonWrapper>
        </ConfirmDeliveryModalMainContainer>
      </Modal>
    </>
  )
}

export default ConfirmDeliveryModal
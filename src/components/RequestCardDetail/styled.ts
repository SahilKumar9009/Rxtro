import { Platform } from "react-native";
import styled from "styled-components/native";
import { FONT_SIZE, isTablet, SPACING, WIDTH } from "../../constants";


const RequestCardDetailContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin: ${SPACING.h15}px;
`;

const RequestCardDetailOrderHeadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RequestCardDetailOrderBoldText = styled.Text`
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  color: black;
  font-weight: bold;
  margin-bottom: ${SPACING.h10}px;
`;

const RequestCardDetailOrderText = styled.Text`
  width: ${WIDTH.w200}px;
  font-size: ${Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f12 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f12}px;
  color: black;
`;

const RequestCardDetailOrderDetailWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #F5F7FB;
`;

const RequestCardDetailInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px ${SPACING.h5}px;
  margin: ${SPACING.h15}px 0px;
`;


export {RequestCardDetailContainer, RequestCardDetailOrderHeadingContainer, RequestCardDetailOrderBoldText, RequestCardDetailOrderText, RequestCardDetailOrderDetailWrapper, RequestCardDetailInnerContainer};
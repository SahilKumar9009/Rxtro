import styled from 'styled-components/native';
import {mainBackgroundColor} from '../../constants';

const LoadingIndicatorMainContainer = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // background-color: rgba(255, 255, 255, 0.3);
  z-index: 1;
`;

const LoadingIndicatorInnerContainer = styled.View`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${mainBackgroundColor};
  opacity: 1;
  border-radius: 10px;
`;

export {LoadingIndicatorMainContainer, LoadingIndicatorInnerContainer};

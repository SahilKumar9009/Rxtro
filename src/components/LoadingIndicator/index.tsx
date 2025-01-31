import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  LoadingIndicatorMainContainer,
  LoadingIndicatorInnerContainer,
} from './styled';

const LoadingIndicator = () => (
  <LoadingIndicatorMainContainer>
    <LoadingIndicatorInnerContainer>
      <ActivityIndicator
        size="large"
        style={{width: 70, height: 70}}
        color="white"
        animating={true}
      />
    </LoadingIndicatorInnerContainer>
  </LoadingIndicatorMainContainer>
);

export default LoadingIndicator;

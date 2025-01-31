// RNText.js
import React from 'react';
import {View} from 'react-native';
import {Props} from './interface';
import {StyledText} from './styled';

const RNText = ({
  children,
  style,
  fontsize,
  numberOfLines,
  onPress,
  ...props
}: Props) => {
  return (
    <StyledText
      style={[style, fontsize]}
      numberOfLines={numberOfLines}
      onPress={onPress}
      {...props}>
      {children}
    </StyledText>
  );
};

export default RNText;

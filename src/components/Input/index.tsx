import React, {Dispatch, SetStateAction} from 'react';
import {HEIGHT, mainBackgroundColor} from '../../constants';
import RNTextInput from './styled';
import {StyleProp, ViewStyle} from 'react-native';

type Props = {
  bold?: boolean;
  title?: string;
  alignment?: string;
  multiline?: boolean;
  numberOfline?: number;
  textArea?: boolean;
  value?: string;
  maxLength?: number;
  canEdit?: boolean;
  onChange?: Dispatch<SetStateAction<string>>;
  ref?: React.Ref<any>;
  style?: StyleProp<ViewStyle>;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
};

const Input: React.FC<Props> = React.forwardRef(
  (
    {
      bold,
      title,
      multiline,
      numberOfline,
      textArea,
      maxLength,
      value,
      onChange,
      canEdit,
      style,
      keyboardType = 'default',
    },
    ref,
  ) => {
    return (
      <RNTextInput
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        maxLength={maxLength} 
        multiline={multiline}
        placeholder={value ? '' : title}
        placeholderTextColor={bold ? 'black' : '#707070'}
        numberOfLines={numberOfline}
        textAlignVertical={textArea ? 'top' : null}
        defaultValue={value}
        style={[
          textArea
            ? {height: HEIGHT.h100}
            : value && canEdit
            ? {fontWeight: 'bold'}
            : bold
            ? {borderWidth: 1, borderColor: mainBackgroundColor}
            : {
                color: '#929292',
              },
          style,
        ]}
        onChangeText={onChange}
        editable={canEdit}
        ref={ref}
      />
    );
  },
);

export default Input;

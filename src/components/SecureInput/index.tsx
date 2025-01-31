import React, { Dispatch, SetStateAction } from 'react';
import {TouchableOpacity} from 'react-native';
import {SecureInputMainContainer, SecureInputInnerContainer, SecureInputField} from './styled';
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { FONT_SIZE } from '../../constants';

type Props = {
  title: string,
  onChange: Dispatch<SetStateAction<string>>,
  ref?:React.Ref<any>
}

const SecureInput:React.FC<Props> = React.forwardRef(({title, onChange},ref) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  return (
    <SecureInputMainContainer>
      <SecureInputInnerContainer>
        <SecureInputField
          placeholder={title}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#707070" 
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          onChangeText={onChange}
          ref={ref}
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Material name={rightIcon} size={FONT_SIZE.f20} color="black" />
        </TouchableOpacity>
      </SecureInputInnerContainer>
    </SecureInputMainContainer>
  );
});


export default SecureInput;
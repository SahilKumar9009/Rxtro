import React from 'react';
import {WebView} from 'react-native-webview';
import {
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  View,
} from 'react-native';
import {
  ForgotPasswordScreenMainContainer,
  ForgotPasswordScreenHeadingContainer,
  ForgotPasswordScreenHeadingText,
  ForgotPasswordScreenTouchableWrapper,
  ForgotPasswordScreenInnerContainer,
  ForgotPasswordScreenForgotPasswordCard,
  ForgotPasswordScreenLabelText,
} from './styled';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import Input from '../../components/Input';
import ReUsableButton from '../../components/ReUsableButton';
import {FONT_SIZE, isTablet, mainBackgroundColor, SPACING} from '../../constants';
import MainScreenHeader from '../../components/MainScreenHeader';
import navigateTo from '../../navigation/navigate';

type Props = {
  onPress?: () => void;
};

const ForgotPasswordScreen: React.FC<Props> = () => {
  // const navigation = useNavigation<StackNavigationProp<StackParams>>();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackButton />
      <WebView
        on
        source={{
          uri: 'https://au.rxtro.com/web/rxtro/login?p_p_id=com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_com_liferay_login_web_portlet_LoginPortlet_INSTANCE_0_mvcRenderCommandName=%2Flogin%2Fforgot_password',
        }}
        style={{flex: 1, marginStart:-SPACING.h40}}
      />
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const BackButton = () => {
  return (
    <Pressable
      onPress={() => {
        navigateTo();
      }}
      style={{
        padding: 10,
        position: 'absolute',
        backgroundColor: mainBackgroundColor,
        zIndex: 10,
        borderRadius: 10,
        left: 20,
        top: '7%',
      }}>
      <Icon
        name="chevron-back"
        size={
          Platform.OS === 'ios'
            ? Platform.isPad
              ? FONT_SIZE.f16
              : FONT_SIZE.f30
            : isTablet
            ? FONT_SIZE.f16
            : FONT_SIZE.f30
        }
        color="white"
      />
    </Pressable>
  );
};

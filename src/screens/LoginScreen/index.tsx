import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import Input from "../../components/Input";
import ReUsableButton from "../../components/ReUsableButton";
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../../navigation/StackNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  LoginScreenMainContainer,
  LoginScreenHeadingContainer,
  LoginScreenLogo,
  LoginScreenInnerContainer,
  LoginScreenLoginCard,
  LoginScreenLabelText,
  LoginScreenTouchableWrapper,
} from "./styled";
import SecureInput from "../../components/SecureInput";
import { getUserProfile, getUserProfileLoading } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import combineReducer from "../../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DEVICE_ID,
  EMAIL_ID,
  FCM_TOKEN,
  mainBackgroundColor,
  PASSWORD,
} from "../../constants";
import LoadingIndicator from "../../components/LoadingIndicator";
import { validateUserForm } from "../../validation/validation-user-form";
// import notificationServices from '../../helper/notificationServices';
// import {getCountry} from 'react-native-localize';
import { startLoader, stopLoader } from "../../actions/globalLoader";
import getAllCompanies from "../../apiActions/getAllCompanies";

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const LoginScreen = () => {
  const dispatch = useDispatch<TypedDispatch>();
  // const userObject = useSelector((state: any) => state.userProfileReducer);
  const registerResponse = useSelector(
    (state: any) => state.postAddDrugRepresentativeReducer.response
  );
  // const userLoading = userObject.loading;
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();

  useEffect(() => {
    (async () => {
      dispatch(getAllCompanies());
    })();
  }, []);

  useEffect(() => {
    if (registerResponse["internal-code"] === 200) {
      Alert.alert("Thanks for registering with us");
    }
  }, [registerResponse]);

  const countryAlert = () => {
    Alert.alert("Alert", "This app is not available in your country");
  };

  const onLogin = async () => {
    const country = getCountry();
    //! if (country !== 'CA' && country !== 'AU') {
    //!   countryAlert();
    //!   return;
    //! }
    // const {deviceId, fcmToken} = await notificationServices();
    const data = { email: email.trim(), password: password.trim() };
    validateUserForm(data).then(async (validate: any) => {
      if (validate.status) {
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken || "");
        await AsyncStorage.setItem(DEVICE_ID, deviceId);
        await AsyncStorage.setItem(EMAIL_ID, email);
        await AsyncStorage.setItem(PASSWORD, password);
        setLoading(true);
        dispatch(startLoader());
        dispatch(
          getUserProfile(email, password, fcmToken, DEVICE_ID, setLoading)
        );
        dispatch(stopLoader());
        emailRef?.current?.clear();
        passwordRef?.current?.clear();
      } else {
        Alert.alert("Message", validate.message);
      }
    });
  };

  if (loading) {
    return (
      <ImageBackground
        source={require("../../assets/img_bg.png")}
        style={{ height: "100%" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LoadingIndicator />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/img_bg.png")}
      style={{ height: "100%" }}
    >
      <SafeAreaView
        style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%" }}
        >
          <LoginScreenMainContainer
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              alignSelf: "center",
            }}
          >
            <LoginScreenHeadingContainer>
              <LoginScreenLogo source={require("../../assets/Bitmap.png")} />
            </LoginScreenHeadingContainer>
            <LoginScreenInnerContainer>
              <LoginScreenLoginCard>
                <LoginScreenLabelText>Your Email</LoginScreenLabelText>
                <Input
                  keyboardType="email-address"
                  alignment="left"
                  title="Enter Your Email"
                  onChange={setEmail}
                  ref={emailRef}
                />
                <View>
                  <LoginScreenLabelText>Password</LoginScreenLabelText>
                  <SecureInput
                    title="Enter Your Password"
                    onChange={setPassword}
                    ref={passwordRef}
                  />
                </View>
                <LoginScreenTouchableWrapper
                  onPress={onLogin}
                  activeOpacity={0.7}
                >
                  <ReUsableButton title="Login" color={mainBackgroundColor} />
                </LoginScreenTouchableWrapper>
                <LoginScreenTouchableWrapper
                  onPress={() => navigation.navigate("ForgotPasswordScreen")}
                  activeOpacity={0.7}
                >
                  <LoginScreenLabelText
                    style={{
                      color: "#0D55CF",
                      marginLeft: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Forgot Password?
                  </LoginScreenLabelText>
                </LoginScreenTouchableWrapper>
                <LoginScreenTouchableWrapper
                  onPress={() => navigation.navigate("RegisterScreen")}
                  activeOpacity={0.7}
                >
                  <LoginScreenLabelText
                    style={{
                      color: "#0D55CF",
                      marginLeft: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    Create an Account
                  </LoginScreenLabelText>
                </LoginScreenTouchableWrapper>
              </LoginScreenLoginCard>
            </LoginScreenInnerContainer>
          </LoginScreenMainContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

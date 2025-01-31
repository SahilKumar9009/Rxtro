import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";
import Input from "../../components/Input";
import ReUsableButton from "../../components/ReUsableButton";
import {
  SignUpScreenMainContainer,
  SignUpScreenHeadingContainer,
  SignUpScreenHeadingText,
  SignUpScreenInnerContainer,
  SignUpScreenSignUpCard,
  SignUpScreenTouchableWrapper,
  InfoText,
} from "./styled";
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../../navigation/StackNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import combineReducer from "../../reducers";
import createAccount from "../../apiActions/RegisterScreen/createAccount";
import { AlertModal } from "../../components/AlertModal";
import { FONT_SIZE, mainBackgroundColor, SPACING } from "../../constants";

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const RegisterScreen = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      mobilePhone: mobileNo,
    };

    if (!data.firstName) {
      Alert.alert("Please enter a first Name");
      return;
    }

    if (!data.lastName) {
      Alert.alert("Please enter a Last Name");
      return;
    }

    if (data.mobilePhone.length < 8 || data.mobilePhone.length > 10) {
      Alert.alert("Please enter a valid phone number");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      setLoading(false);
      Alert.alert("Please enter a valid email address");
      return;
    }

    dispatch(createAccount(data, setModalVisible, setLoading));
  };

  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  return (
    <>
      <ImageBackground
        source={require("../../assets/img_bg.png")}
        style={{ height: "100%" }}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <SignUpScreenMainContainer
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}
            >
              <SignUpScreenHeadingContainer>
                <SignUpScreenHeadingText>
                  Create an Account
                </SignUpScreenHeadingText>
                <SignUpScreenTouchableWrapper
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Icon
                    name="close-circle-outline"
                    size={FONT_SIZE.f18}
                    color="black"
                  />
                </SignUpScreenTouchableWrapper>
              </SignUpScreenHeadingContainer>
              <SignUpScreenInnerContainer>
                <SignUpScreenSignUpCard>
                  <InfoText>Get started in less than 15 minutes</InfoText>
                  <Input
                    alignment="left"
                    title="First Name"
                    onChange={setFirstName}
                  />
                  <Input
                    alignment="left"
                    title="Last Name"
                    onChange={setLastName}
                  />

                  <View>
                    <View
                      style={{
                        position: "absolute",
                        marginTop: 1,
                        marginLeft: SPACING.h10,
                        zIndex: 4,
                        backgroundColor: "white",
                      }}
                    >
                      <Text>Mobile Phone</Text>
                    </View>
                    <Input
                      alignment="left"
                      title="XXXXXXXXXXX"
                      onChange={setMobileNo}
                      maxLength={10}
                      keyboardType="phone-pad"
                    />
                  </View>
                  {/* <LoginScreenLabelText>Mobile Phone</LoginScreenLabelText>
                <Input
                  alignment="left"
                  title="Mobile No."
                  onChange={setMobileNo}
                /> */}
                  <Input
                    alignment="left"
                    title="Email Address"
                    onChange={setEmail}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SignUpScreenTouchableWrapper onPress={onSubmit}>
                      <ReUsableButton
                        title="Submit"
                        color={mainBackgroundColor}
                      />
                    </SignUpScreenTouchableWrapper>
                  </View>
                </SignUpScreenSignUpCard>
              </SignUpScreenInnerContainer>
            </SignUpScreenMainContainer>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
      <AlertModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.navigate("LoginScreen");
        }}
      />
    </>
  );
};

export default RegisterScreen;

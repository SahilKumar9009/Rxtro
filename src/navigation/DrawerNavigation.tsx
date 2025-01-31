import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MainScreenStack, { StackParams } from "./StackNavigation";
import BottomTabs from "./BottonTabNavigation";
import {
  DrawerMainContainer,
  DrawerInnerContainerOne,
  UserProfileImage,
  UserCommonDetailsWrapper,
  UserNameText,
  DrawerSecondaryText,
  DrawerLinkText,
  DrawerInnerContainerTwo,
  LogoutButtonWrapper,
  LogoutButtonText,
} from "./styled";
import UserDetailCard from "../components/UserDetailCard";
import {
  DEVICE_ID,
  IMAGE_BASE_URL,
  isTablet,
  REDUCER,
  USER_ID,
  WIDTH,
} from "../constants";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import EditProfileModal from "../components/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import combineReducer from "../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfileData, putLogout, setNotification } from "../actions";
import LoadingIndicator from "../components/LoadingIndicator";
// import messaging from '@react-native-firebase/messaging';
// import {requestUserPermission} from '../helper/notificationServices';
import navigateTo from "./navigate";
// import {CustomerIO} from 'customerio-reactnative';
import { getStoredProfile } from "../methods/profiledata";
import { removeTokens } from "../methods/tokens";
import getProductCompany from "../apiActions/ProfileApi's/getProductCompany";

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

interface Product {
  id: number;
  name: string;
  url: string;
}

interface CompanyData {
  name: string;
  companyId: number;
  parentName: string;
  parentId: number;
  logoId: number;
  isPremium: boolean;
  accountStatus: string;
  products: Product[];
}
const CustomDrawerContent = (props) => {
  const dispatch = useDispatch<TypedDispatch>();
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const postEditModalObject = useSelector(
    (state: any) => state.postEditProfileReducer
  );
  const postEditModalResponse = postEditModalObject.postResponse.result;
  const user = useSelector(
    (state: any) =>
      state.representativeProfileReducer.representativeProfile.result
  );

  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result
  );

  const productData = useSelector((state: any) => state.ProductReducer);

  const logoutResponse = useSelector(
    (state: any) => state.putLogoutReducer.response
  );
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [profiledata, setProfiledata] = useState({});
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  const maskPhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber) return "";
    return phoneNumber.replace(/\d(?=\d{0})/g, "x"); // Masks all but the last 4 digits
  };
  const handleOnPress = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (logoutResponse) {
      const response = logoutResponse["internal-code"];
      if (response === 200) {
        AsyncStorage.removeItem(DEVICE_ID);
        AsyncStorage.removeItem(USER_ID);
        try {
          dispatch({ type: REDUCER.PUT_LOGOUT_AFTER_SUCCESS });
        } catch (error) {
          console.log(error, "DURING LOGOUT");
        }
        navigation.navigate("LoginScreen");
      }
    }
  }, [logoutResponse]);

  const onLogout = async () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const deviceId = await AsyncStorage.getItem(DEVICE_ID);
          dispatch(putLogout({ deviceId: deviceId }));
          await AsyncStorage.removeItem(DEVICE_ID);
          removeTokens();
          await AsyncStorage.removeItem(DEVICE_ID);
          await AsyncStorage.removeItem("USER_PROFILE");
          // CustomerIO.clearIdentify();
          AsyncStorage.removeItem("CustomerIOIdentification");
          navigateTo("LoginScreen", {}, true);
        },
      },
    ]);
  };

  if (user["internal-code"] === 0) {
    return <LoadingIndicator />;
  }

  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <DrawerItemList {...props} />
      <DrawerMainContainer>
        <DrawerInnerContainerOne>
          <UserProfileImage
            source={
              !postEditModalResponse
                ? userData
                  ? {
                      uri: "https://staging.rxtro.com/" + userData?.portraitUrl,
                    }
                  : require("../assets/defaultUser.png")
                : {
                    uri: postEditModalResponse.portraitUrl,
                  }
            }
          />
          <UserCommonDetailsWrapper>
            <UserNameText>
              {(userData && userData?.firstName) || ""}{" "}
              {userData?.lastName || ""}
            </UserNameText>
            <DrawerSecondaryText>
              {userData && userData?.userData}
            </DrawerSecondaryText>
            <TouchableOpacity onPress={handleOnPress} activeOpacity={0.7}>
              <DrawerLinkText>Edit Profile</DrawerLinkText>
            </TouchableOpacity>
          </UserCommonDetailsWrapper>
        </DrawerInnerContainerOne>
        <DrawerInnerContainerTwo>
          <UserDetailCard heading="Job Title" answer={userData?.jobTitle} />
        </DrawerInnerContainerTwo>
        <DrawerInnerContainerTwo>
          <UserDetailCard heading="Email" answer={userData?.emailAddress} />
        </DrawerInnerContainerTwo>

        <DrawerInnerContainerTwo>
          <UserDetailCard
            heading="Phone"
            answer={
              profiledata && userData?.phone
                ? maskPhoneNumber(userData.phone)
                : "No phone number available"
            }
          />
        </DrawerInnerContainerTwo>

        {/* <View
            style={{
              justifyContent: 'center',
            }}>
            <UserDetailCard heading="Company" answer={''} />
            <Text style={{marginBottom: 10}}>
              {userData && userData?.companyName}
            </Text>
            <Image
              style={{
                height: '50%',
                width: '40%',
                position: 'absolute',
                right: 0,
              }}
              resizeMode="cover"
              source={{
                uri: 'https://staging.rxtro.com/' + userData?.portraitUrl,
              }}
            />
          </View> */}

        {/* <UserDetailCard heading="Team" answer={user && user?.company.name} />

          {productData?.products?.map((product, index) => {
            return (
              <UserDetailCard
                key={index.toString()}
                heading={'Product ' + (index + 1)}
                answer={product.name}
              />
            );
          })} */}

        <LogoutButtonWrapper onPress={onLogout} activeOpacity={0.7}>
          <LogoutButtonText>Logout</LogoutButtonText>
        </LogoutButtonWrapper>
      </DrawerMainContainer>
      <EditProfileModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator<StackParams>();

function MyDrawer() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const dispatch = useDispatch<TypedDispatch>();

  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   if (remoteMessage) {
    //     dispatch(setNotification(remoteMessage.data));
    //   }
    // });

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   if (remoteMessage) {
    //     dispatch(setNotification(remoteMessage.data));
    //   }
    //   navigation.navigate('AppointmentScreen', {
    //     screen: 'Appointment',
    //   });
    // });

    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       dispatch(setNotification(remoteMessage.data));
    //       navigation.navigate('AppointmentScreen', {
    //         screen: 'Appointment',
    //       });
    //     }
    //   });
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerLabelStyle: { display: "none" },
        drawerActiveBackgroundColor: "transparent",
        drawerStyle: {
          width:
            Platform.OS === "ios"
              ? Platform.isPad
                ? WIDTH.w225
                : WIDTH.w300
              : isTablet
              ? WIDTH.w225
              : WIDTH.w300,
          backgroundColor: "white",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MainStackScreen"
        component={MainScreenStack}
        options={{ swipeEnabled: false }}
      />
      <Drawer.Screen name="AppointmentScreen" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

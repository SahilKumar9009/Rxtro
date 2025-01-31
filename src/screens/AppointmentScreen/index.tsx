import React, { useDebugValue, useEffect, useState } from "react";
import {
  useWindowDimensions,
  Platform,
  View,
  Alert,
  LayoutAnimation,
  Text,
} from "react-native";
import MainScreenHeader from "../../components/MainScreenHeader";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CurrentTab from "../../components/CurrentTab";
import PreviousTab from "../../components/PreviousTab";
import {
  DEVICE_ID,
  EMAIL_ID,
  FCM_TOKEN,
  FONT_SIZE,
  isTablet,
  mainBackgroundColor,
  PASSWORD,
  USER_ID,
} from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import combineReducer from "../../reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFutureAppointments,
  getFutureAppointmentsLoading,
  getPreviousAppointments,
  getPreviousAppointmentsLoading,
  getPreviousLastAppointments,
  getPreviousLastAppointmentsLoading,
  getProfileData,
  getUserProfile,
  getUserProfileLoading,
  postTakeAppointment,
} from "../../actions";
import LoadingIndicator from "../../components/LoadingIndicator";
import ConfirmSwapModal from "../../components/ConfirmSwapModal";
import AppointmentDetailScreen from "../AppointmentDetailScreen";
// import {CustomerIO} from 'customerio-reactnative';
import getFutureApp from "../../apiActions/AppointmentScreen/getFutureApp/getFutureApp";
import getPrevApp from "../../apiActions/AppointmentScreen/getPrevApp";

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const renderScene = SceneMap({
  first: CurrentTab,
  second: PreviousTab,
});

const AppointmentScreen = () => {
  const pushNotificationData = useSelector(
    (state: any) => state.setNotificationReducer
  );

  const globalLoading = useSelector((state: any) => state.storeReducerId);

  const isSwappable = pushNotificationData.notificationData["is-swappable"];
  const gotNotificattion = pushNotificationData.gotNotification;
  const dispatch = useDispatch<TypedDispatch>();
  const layout = useWindowDimensions();
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result
  );

  const [openAlert, setOpenAlert] = React.useState(false);

  // Responses
  const takeAppResponseObject = useSelector(
    (state: any) => state.postTakeAppointmentReducer.response
  );
  const cancelAppResponse = useSelector(
    (state: any) => state.postCancelAppointmentReducer.response
  );
  const swapResponse = useSelector(
    (state: any) => state.postSwapAppointmentReducer.swapResponse
  );
  const confirmAppresponse = useSelector(
    (state: any) => state.postConfirmAppointmentReducer.response
  );
  const hasAppointmentDetails = useSelector(
    (state: any) => state.storeIdReducer.hasAppointmentDetails
  );
  // ConfirmSwapModal visiablity state
  const [isConfirmSwapModalVisible, setConfirmSwapModalVisible] =
    useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Current" },
    { key: "second", title: "Previous" },
  ]);

  const [dynamicWidth, setDynamicWidth] = React.useState(100);

  React.useEffect(() => {
    if (hasAppointmentDetails) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDynamicWidth(45);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setDynamicWidth(100);
    }
  }, [hasAppointmentDetails]);

  const toTakeTheAppointment = async () => {
    if (openAlert) {
      return;
    }
    const surgeryId = pushNotificationData.notificationData["surgery-id"];
    const drugRepId = await AsyncStorage.getItem(USER_ID);
    const scheduleId = pushNotificationData.notificationData["schedule-id"];
    const appDate = pushNotificationData.notificationData["cancelled-app-date"];

    setOpenAlert(true);
    // CustomerIO.track('notification-opened', {
    //   type: 'Take Appointment',
    //   surgeryId,
    //   drugRepId,
    //   scheduleId,
    //   appDate,
    // });
    Alert.alert(
      "Take Appointment",
      `Are you sure you want to take appointment on ${appDate}`,
      [
        {
          text: "Yes",
          onPress: () => {
            dispatch(
              postTakeAppointment({ surgeryId, drugRepId, scheduleId, appDate })
            );
            setOpenAlert(false);
          },
        },
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            setOpenAlert(false);
          },
        },
      ]
    );
  };

  const handleSwapModal = async () => {
    setConfirmSwapModalVisible(true);
    const surgeryId = pushNotificationData.notificationData["surgery-id"];
    const drugRepId = await AsyncStorage.getItem(USER_ID);
    const scheduleId = pushNotificationData.notificationData["schedule-id"];
    const appDate = pushNotificationData.notificationData["cancelled-app-date"];
    // CustomerIO.track('notification-opened', {
    //   type: 'Swap Appointment',
    //   surgeryId,
    //   drugRepId,
    //   scheduleId,
    //   appDate,
    // });
  };

  useEffect(() => {
    if (gotNotificattion) {
      if (isSwappable === "false") {
        toTakeTheAppointment();
      } else if (isSwappable === "true") {
        handleSwapModal();
      }
    }
  }, [pushNotificationData, gotNotificattion]);

  useEffect(() => {
    (async () => {
      dispatch(getFutureAppointmentsLoading());
      const userId = await AsyncStorage.getItem(USER_ID);
      const currentPage = 1;
      const pageSize = 10;
      //  dispatch(getProfileData());
      dispatch(getFutureApp(userId, currentPage, pageSize));
      dispatch(getPrevApp(userId, currentPage, pageSize));
    })();
  }, []);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        height: "9%",
        backgroundColor: "#83C3FE",
        borderRadius: 50,
      }}
      style={{
        backgroundColor: mainBackgroundColor,
        elevation: 3,
        shadowColor: "#171717",
        shadowOffset: { height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}
      labelStyle={{
        color: "white",
        textTransform: "capitalize",
        fontSize:
          Platform.OS === "ios"
            ? Platform.isPad
              ? FONT_SIZE.f9
              : FONT_SIZE.f12
            : isTablet
            ? FONT_SIZE.f9
            : FONT_SIZE.f12,
      }}
      activeColor="white"
      tabStyle={{
        height:
          Platform.OS === "ios"
            ? Platform.isPad
              ? 70
              : 50
            : isTablet
            ? 70
            : 50,
      }}
      pressOpacity={0}
      pressColor="tranparent"
    />
  );
  return (
    <>
      <MainScreenHeader
        title="My Appointments"
        needFilter={index === 0 ? true : false}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          // ! reduce width for tablets here
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width:
              Platform.OS === "ios"
                ? Platform.isPad
                  ? `${dynamicWidth}%`
                  : "100%"
                : isTablet
                ? `${dynamicWidth}%`
                : "100%",
          }}
        >
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            // style={{width: '50%'}}
          />
        </View>

        <View
          style={{
            width:
              Platform.OS === "ios"
                ? Platform.isPad
                  ? `${100 - dynamicWidth}%`
                  : undefined
                : isTablet
                ? `${100 - dynamicWidth}%`
                : undefined,
          }}
        >
          {hasAppointmentDetails && Platform.OS === "ios" ? (
            Platform.isPad ? (
              <AppointmentDetailScreen />
            ) : null
          ) : hasAppointmentDetails && isTablet ? (
            <AppointmentDetailScreen />
          ) : null}
        </View>
      </View>
      <ConfirmSwapModal
        isVisible={isConfirmSwapModalVisible}
        onBackdropPress={() => setConfirmSwapModalVisible(false)}
        fromPush={true}
        currentAppId={pushNotificationData.notificationData["current-app-id"]}
        swappAbleDate={
          pushNotificationData.notificationData["cancelled-app-date"]
        }
        currentDate={pushNotificationData.notificationData["current-app-date"]}
        surgeryName={pushNotificationData.notificationData.surgeryName}
        surgeryAddress={
          pushNotificationData.notificationData["surgery-address-street1d"]
        }
        surgeryAddressSuburb={
          pushNotificationData.notificationData["surgery-address-suburb"]
        }
      />
    </>
  );
};

export default AppointmentScreen;

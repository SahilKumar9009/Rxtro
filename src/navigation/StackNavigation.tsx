import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MyTerritoryDetailScreen from '../screens/MyTerritoryDetailScreen';
import ViewAvailabilityScreen from '../screens/ViewAvailbiltyScreen';
import AvailabilityDetailScreen from '../screens/AvailabilityDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import BottomTabs from './BottonTabNavigation';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';

export type StackParams = {
  SplashScreen: undefined;
  AppointmentScreen?: {
    screen?: string;
  };
  AppointmentDetailScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  MyTerritoryDetailScreen: {requireBack: boolean};
  ViewAvailabilityScreen: {
    title: string;
  };
  AvailabilityDetailScreen: {
    unformattedDate: string | undefined;
    surgeryId: number | undefined;
    scheduleId: string | undefined;
    isSwappable: boolean | undefined;
    clinicName: string | undefined;
    location: string | undefined;
    currentAppId: number | undefined;
  };
  SearchScreen: undefined;
  MainStackScreen: undefined;
  NotificationScreen: undefined;
  NewTerritoryDetailScreen: undefined;
};

const Stack = createStackNavigator<StackParams>();

const MainScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false, animationEnabled: true}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="AppointmentScreen" component={BottomTabs} />
      <Stack.Screen
        name="AppointmentDetailScreen"
        component={AppointmentDetailScreen}
      />
      <Stack.Screen
        name="MyTerritoryDetailScreen"
        component={MyTerritoryDetailScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="ViewAvailabilityScreen"
        component={ViewAvailabilityScreen}
      />
      <Stack.Screen
        name="AvailabilityDetailScreen"
        component={AvailabilityDetailScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AddCustomerScreen" component={AddCustomerScreen} />
      {/* <Stack.Screen
        name="NewTerritoryDetailScreen"
        component={NewTerritoryDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default MainScreenStack;

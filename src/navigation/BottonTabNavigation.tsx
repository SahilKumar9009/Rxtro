import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentScreen from '../screens/AppointmentScreen';
import MyTerritoryScreen from '../screens/MyTerritoryScreen';
import RequestsScreen from '../screens/RequestsScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import AddClinicScreen from '../screens/AddClinicScreen';
import {FONT_SIZE, isTablet, mainBackgroundColor, ScreenNames, SPACING} from '../constants';
import {Platform} from 'react-native';
import {useOrientation} from '../hooks/useOrientation';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const orientation = useOrientation();
  return (
    <Tab.Navigator
      initialRouteName="Appointment"
      screenOptions={({route}) => ({
        tabBarIcon: ({size, color}) => {
          let iconName;
          if (route.name === 'Appointment') {
            iconName = 'calendar-month-outline';
          } else if (route.name === 'My Customer') {
            iconName = 'map';
          } else if (route.name === 'Request') {
            iconName = 'book-open-variant';
          } else if (route.name === 'Notifications') {
            iconName = 'bell-outline';
          } else if (route.name === 'Add Clinic') {
            iconName = 'circle-edit-outline';
          }
          return <Material name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: 10,
          fontSize:
            Platform.OS === 'ios'
              ? Platform.isPad
                ? FONT_SIZE.f8
                : FONT_SIZE.f10
              : isTablet
              ? FONT_SIZE.f7
              : FONT_SIZE.f10,
          fontWeight: 'bold',
          marginTop:
            orientation === 'LANDSCAPE'
              ? 15
              : Platform.OS === 'ios'
              ? Platform.isPad
                ? SPACING.h15
                : 0
              : isTablet
              ? SPACING.h15
              : 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: `${mainBackgroundColor}`,
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'white',
          minHeight:
            Platform.OS === 'ios'
              ? Platform.isPad
                ? SPACING.v70
                : SPACING.v90
              : isTablet
              ? SPACING.v70
              : SPACING.v90,
          borderTopRightRadius: SPACING.h20,
          borderTopLeftRadius: SPACING.h20,
          elevation: 12,
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 5,
        },
      })}>
      <Tab.Screen name={ScreenNames.APPOINTMENT} component={AppointmentScreen} />
      <Tab.Screen name={ScreenNames.MYCUSTOMER} component={MyTerritoryScreen} />
      <Tab.Screen name={ScreenNames.REQUEST} component={RequestsScreen} />
      <Tab.Screen name={ScreenNames.NOTIFICATION} component={NotificationScreen} />
      {/* <Tab.Screen name={ScreenNames.ADDCLINIC} component={AddClinicScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabs;

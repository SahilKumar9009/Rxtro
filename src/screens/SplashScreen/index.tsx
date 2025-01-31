import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../navigation/StackNavigation';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {DEVICE_ID, mainBackgroundColor, USER_ID} from '../../constants';
// import LoadingIndicator from '../../components/LoadingIndicator';
import {CommonActions} from '@react-navigation/native';
import {getTokens} from '../../methods/tokens';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );



  useEffect(() => {
    (async () => {

      const deviceId = await AsyncStorage.getItem(DEVICE_ID);
      const {accessToken} = await getTokens();

      if (accessToken && userData?.userId) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'AppointmentScreen'}],
          }),
        );
        return;
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'LoginScreen'}],
        }),
      );
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={mainBackgroundColor}
        translucent={false}
      />
      {/* <LoadingIndicator /> */}
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBackgroundColor,
  },
});

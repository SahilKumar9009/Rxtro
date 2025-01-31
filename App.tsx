import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
// import RNBootSplash from "react-native-bootsplash";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./src/store";
import ForegroundHandler from "./src/helper/ForegroundHandler";
import { navigationRef } from "./src/navigation/navigate";
// import { CIOinitialisation } from "./src/helper/customerIO";
// import { CustomerIO } from "customerio-reactnative";
// import analytics from "@react-native-firebase/analytics";
import { isTablet, mainBackgroundColor } from "./src/constants";
// import Orientation from "react-native-orientation-locker";
import MyDrawer from "./src/navigation/DrawerNavigation";
import MainScreenStack from "./src/navigation/StackNavigation";

LogBox.ignoreLogs(["Sending", "EventEmitter.removeListener"]);

export const { store, persistor } = configureStore();

export default function App() {
  const routeNameRef = useRef<string | undefined>();
  // React.useEffect(() => {
  //   CIOinitialisation();
  // }, []);
  // React.useEffect(() => {
  //   if (!isTablet) {
  //     Orientation.lockToPortrait();
  //   }
  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          // onReady={() => {
          //   RNBootSplash.hide({ fade: true });
          //   if (navigationRef.current) {
          //     routeNameRef.current =
          //       navigationRef.current.getCurrentRoute()?.name;
          //   }
          // }}
          onStateChange={async () => {
            if (!navigationRef.current) {
              return;
            }
            const currentRouteName =
              navigationRef.current.getCurrentRoute()?.name;
            const previousRouteName = routeNameRef.current;

            // if (currentRouteName && previousRouteName !== currentRouteName) {
            //   CustomerIO.screen(currentRouteName);
            //   await analytics().logScreenView({
            //     screen_name: currentRouteName,
            //     screen_class: currentRouteName,
            //   });
            // }
            routeNameRef.current = currentRouteName;
          }}
        >
          {/* <ForegroundHandler /> */}
          <StatusBar
            barStyle="light-content"
            backgroundColor={mainBackgroundColor}
          />
          <MainScreenStack />
          {/* <MyDrawer /> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

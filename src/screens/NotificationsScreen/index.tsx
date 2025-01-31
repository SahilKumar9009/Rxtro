import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Header from '../../components/MainScreenHeader';
import NotificationCard from '../../components/NotificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FONT_SIZE, SPACING, USER_ID} from '../../constants';
import {
  getLastCancellation,
  getLastCancellationLoading,
} from '../../actions/getLastCancellation';
import LoadingIndicator from '../../components/LoadingIndicator';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const NotificationsScreen = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const appointmentsObject = useSelector(
    (state: any) => state.getLastCancellationReducer,
  );

  const cancelAppResponse = useSelector(
    (state: any) => state.postCancelAppointmentReducer.response,
  );
  const appointments = appointmentsObject.listOfCancellations.result;
  console.log("in the appointments", appointments);
  const appointmentLoading = appointmentsObject.loading;
  const [loading, setLoading] = useState(appointmentLoading);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem(USER_ID);
      dispatch(getLastCancellation({drugRepId: userId}));
      dispatch(getLastCancellationLoading());
    })();
  }, [cancelAppResponse]);

  const refreshNotifications = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    dispatch(getLastCancellation({drugRepId: userId}));
  };

  const dateTimeSeprator = (dateTimeString: string) => {
    const indexOfSpace = dateTimeString?.indexOf(' ');
    const date = dateTimeString?.slice(0, indexOfSpace);
    const time = dateTimeString?.slice(indexOfSpace, dateTimeString?.length);
    const [day, month, year] = date.split('/');
    const formatedDate = new Date(+year, Number(month) - 1, +day);
    const strFormatedDate = formatedDate.toDateString();
    const [weekDay, monthName, dayNumber, yearNumber] =
      strFormatedDate.split(' ');
    return {
      weekDay: weekDay,
      day: dayNumber,
      month: monthName,
      year: yearNumber,
      time: time,
      formatedDate: formatedDate,
    };
  };

  if (appointmentLoading) {
    return (
      <>
        <Header title="My Notifications" />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }
  if (!appointments) {
    return (
      <>
        <Header title="My Notifications" />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: FONT_SIZE.f14 }}>
            You have no notification as of now!
          </Text>
        </View>
      </>
    );
  }

  const notificationsRenderItem = ({item}) => {
    const formattedDate = dateTimeSeprator(item.appDate);
    return (
      <NotificationCard
        status={item.status}
        clinicName={item.surgeryName}
        timings={
          formattedDate.day +
          ' ' +
          formattedDate.month +
          '-' +
          formattedDate.time
        }
        surgeryId={item.surgeryID}
        territoryId={item.territoryId}
      />
    );
  };

  return (
    <>
      <View
        style={{
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 3,
        }}>
        <Header title="My Notifications" />
      </View>
      {/* <NotificationScreenMainContainer> */}
      {/* <RecycleTestComponent data={appointments}/> */}
      <FlatList
        contentContainerStyle={{paddingBottom: SPACING.v75}}
        data={appointments}
        showsVerticalScrollIndicator={false}
        renderItem={notificationsRenderItem}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={true}
        onRefresh={refreshNotifications}
        refreshing={loading}
      />
      {/* </NotificationScreenMainContainer> */}
    </>
  );
};

export default NotificationsScreen;

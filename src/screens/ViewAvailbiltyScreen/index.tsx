import React, {useEffect, useState} from 'react';
import AvailabilityCard from '../../components/AvailabilityCard';
import {CurrentTabAppointmentContainer} from '../../components/CurrentTab/styled';
import DateCard from '../../components/DateCard';
import {useSelector} from 'react-redux';
import {
  ViewAvailabilityMainContainer,
  ViewAvailabilityInnerContainer,
} from './styled';
import {FONT_SIZE} from '../../constants';
import LoadingIndicator from '../../components/LoadingIndicator';
import CommonHeader from '../../components/CommonHeader';
import {Alert, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

type props = {
  route: {
    params: {
      title: string;
    };
  };
};

const ViewAvailabilityScreen = (props: props) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const headingTitle = props.route.params.title;
  const appointmentObject = useSelector(
    (state: any) => state.getAvailableAppointmentsReducer,
  );
  const appointmentResponse = appointmentObject.appointments;
  const appointments = appointmentResponse.result;
  const appointmentsLoading = appointmentObject.loading;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(appointmentsLoading);
    return;
  }, [appointmentsLoading]);

  useEffect(() => {
    if (!appointmentObject.isAvailable && !appointmentsLoading) {
      Alert.alert('No Appointments', 'There are no appointments available', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  }, [appointmentObject]);

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

  if (loading) {
    return (
      <>
        <CommonHeader clinicName={headingTitle} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <CommonHeader clinicName={headingTitle} />
      {appointmentObject['internal-code'] === 202 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: FONT_SIZE.f16}}>No More Results</Text>
        </View>
      ) : (
        <ViewAvailabilityMainContainer>
          {appointments &&
            appointments?.map(item => {
              const formattedDate = dateTimeSeprator(item['app-date']);
              return (
                <ViewAvailabilityInnerContainer key={item['app-date']}>
                  <DateCard
                    day={formattedDate.day}
                    month={formattedDate.month}
                  />
                  <CurrentTabAppointmentContainer>
                    <AvailabilityCard
                      isSwappable={item['is-swappable']}
                      surgeryId={item.surgeryId}
                      scheduleId={item.scheduleId}
                      unformattedDate={item['app-date']}
                      time={formattedDate.time}
                      clinicName={item.surgeryName}
                      location={item['surgery-address-suburb']}
                      currentAppId={item['current-app']?.appId}
                      selectCard={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </CurrentTabAppointmentContainer>
                </ViewAvailabilityInnerContainer>
              );
            })}
        </ViewAvailabilityMainContainer>
      )}
    </>
  );
};

export default ViewAvailabilityScreen;

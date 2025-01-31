import React, { useEffect } from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import AppointmentCard from '../AppointmentCard';
import DateCard from '../DateCard';
import {
  PreviousTabMainContainer,
  PreviousTabInnerContainer,
  PreviousTabAppointmentContainer,
  ShowMoreText,
} from './styled';
import {useDispatch, useSelector} from 'react-redux';
import { SPACING } from '../../constants';
import Arrow from '../../assets/Svg/Arrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getPrevApp from '../../apiActions/AppointmentScreen/getPrevApp';
import combineReducer from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useFocusEffect } from '@react-navigation/native';


type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const PreviousTab = () => {
   const dispatch = useDispatch<TypedDispatch>();
  const appointmentObject = useSelector(
    (state: any) => state.getPreviousAppointmentsReducer,
  );
  const userData = useSelector(
      (state: any) => state.userProfileReducer2.userProfile.result,
    );

  const [currentPage, setCurrentPage] = React.useState(2);

  const [pageSize, setPageSize] = React.useState(10);

  useEffect(() => {
    setCurrentPage(2);
  },[])

  const appointments = appointmentObject.appointments;
  const dateTimeSeprator = (dateTimeString: string) => {  
    const parts = dateTimeString.split(' ');
    // Extract the day, month, and year
    const day = parts[1]; // "13"
    const month = parts[2]; // "September"
    const year = parts[3]; // "2023"

    // Create a Date object
    const formatedDate = new Date(`${month} ${day}, ${year}`);
    // Get the formatted date string
    const strFormatedDate = formatedDate.toDateString();
    const [weekDay, monthName, dayNumber, yearNumber] = strFormatedDate.split(' ');
    return {
        weekDay: weekDay,
        day: day,
        month: month,
        year: year,
        time: '', // No time provided in the input string
        formatedDate: formatedDate,
    };
};

const handleShowMore = () => { 
  setCurrentPage((currentPage) => currentPage + 1);
  dispatch(getPrevApp(userData?.userId, currentPage, pageSize));
 };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}>
      <View style={{width: '100%', height: '100%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: '100%'}}>
          <PreviousTabMainContainer>
            {appointments &&
              appointments?.map(appointment => {
                const formattedDate = dateTimeSeprator(appointment.date);
                return (
                  <PreviousTabInnerContainer key={appointment.id}>
                    <DateCard
                      day={formattedDate.day}
                      month={formattedDate.month}
                    />
                    <PreviousTabAppointmentContainer>
                      <AppointmentCard
                        time={appointment.date}
                        clinicName={appointment.clinic_name}
                        location={appointment.suburb_name}
                        id={appointment.id}
                        status={appointment.status_uivalue}
                        fromPrev={true}
                        showStatus={true}
                        isTarget={false}
                      />
                    </PreviousTabAppointmentContainer>
                  </PreviousTabInnerContainer>
                );
              })}
                                  <TouchableOpacity onPress={() => {handleShowMore()}}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      alignItems: 'center',
                                      marginEnd: SPACING.h5,
                                      marginBottom: SPACING.h200
                                    }}>
                                    <ShowMoreText>Show More</ShowMoreText>
                                    <Arrow
                                      style={{
                                        height: 4,
                                        width: 4,
                                      }}
                                      color={undefined}
                                    />
                                  </View>
                                </TouchableOpacity>
          </PreviousTabMainContainer>
        </ScrollView>
     
      </View>
    </View>
  );
};

export default PreviousTab;

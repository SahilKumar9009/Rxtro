import React, {useEffect, useState} from 'react';
import AppointmentCard from '../AppointmentCard';
import DateCard from '../DateCard';
import {TouchableOpacity, View, FlatList, RefreshControl, Text, AppState, Pressable} from 'react-native';
import {
  CurrentTabMainContainer,
  CurrentTabInnerContainer,
  CurrentTabAppointmentContainer,
  EmptyContainerView,
  LinkText,
  MessageText,
  ShowMoreText,
} from './styled';
import {useSelector, useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import LoadingIndicator from '../LoadingIndicator';
import {
  getCompleteAppointment,
  getFutureAppointments,
  getPreviousLastAppointments,
} from '../../actions';
import SelectedFilterCard from '../SelectedFilterCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames, SPACING, USER_ID} from '../../constants';
import navigateTo from '../../navigation/navigate';
import getPrevApp from '../../apiActions/AppointmentScreen/getPrevApp';
import getFutureApp from '../../apiActions/AppointmentScreen/getFutureApp/getFutureApp';
import Arrow from '../../assets/Svg/Arrow';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const CurrentTab = () => {

  const dispatch = useDispatch<TypedDispatch>();
  const appointmentObject = useSelector(
    (state: any) => state.getPreviousLastAppointmentsReducer,
  );
  const upcomingAppointmentObject = useSelector(
    (state: any) => state.getFutureAppointmentsReducer,
  );
  const filteredAppsObject = useSelector(
    (state: any) => state.postFilterMyAppointmentsReducer,
  );
  const filteredApps = filteredAppsObject.fileredAppointments.result;

  const filteredAppsLoading = filteredAppsObject.loading;
  const [showFilteredApps, setShowFilteredApps] = useState(false);

  const upcomingAppsLoading = upcomingAppointmentObject.loading;
  const appointmentsLoading = appointmentObject.loading;
  const upcomingAppointments = upcomingAppointmentObject.appointments;

  const appointments = appointmentObject.appointments.result;
  const [selectedCard, setSelectedCard] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  const refreshAppointments = async () => {
    setRefreshing(true);
    const userId = await AsyncStorage.getItem(USER_ID);
    setCurrentPage(1); // Reset to page 1 on refresh
    dispatch(getFutureApp(userId, 1, pageSize));
    dispatch(getPrevApp(userId, 1, pageSize));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleShowMore = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    const nextPage = currentPage + 1; 
      setCurrentPage(nextPage);
      setLoadingMore(true);
      dispatch(getFutureApp(userId, nextPage, pageSize));
      dispatch(getPrevApp(userId, nextPage, pageSize));
      setLoadingMore(false);
  };

  useEffect(() => {
    if (Array.isArray(filteredApps)) {
      setShowFilteredApps(true);
    }
  }, [filteredAppsObject]);

  
  const dateTimeSeprator = (dateTimeString: string) => {  
    const parts = dateTimeString.split(' ');
    const day = parts[1]; 
    const month = parts[2]; 
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

  const buttonType = (date: any, status: string) => {
    const currentDate = new Date();
    if (date <= currentDate) {
      if (status === 'Confirmed by Drug Representative') {
        return 'Complete';
      } else if (status === 'Confirmed by the System') {
        return 'Complete';
      }
    } else {
      return 'Confirm';
    }
  };

  const filteredRenderItem = ({item}) => {
    console.log("In the filteredRenderItem", item);
    const formattedDate = dateTimeSeprator(item.date);
    const buttonTitle = buttonType(
      formattedDate.formatedDate,
      item.status_uivalue,
    );
    return (
      <CurrentTabInnerContainer key={item.id}>
        <DateCard day={formattedDate.day} month={formattedDate.month} />
        <CurrentTabAppointmentContainer>
          <AppointmentCard
            time={formattedDate.time}
            clinicName={item.surgeryName}
            location={item.suburb_name}
            status={item.status}
            buttonTitle={buttonTitle}
            id={item.id}
            fromPrev={false}
            isCompletable={item['is-completable']}
            showStatus={true}
            isTarget={item.isTarget}
            forFilter={true}
          />
        </CurrentTabAppointmentContainer>
      </CurrentTabInnerContainer>
    );
  };

  const appointmentsRenderItem = ({item}) => {
    const formattedDate = dateTimeSeprator(item.date);
    const buttonTitle = buttonType(
      formattedDate.formatedDate,
      item.status_uivalue,
    );
    return (
      <CurrentTabInnerContainer key={item.id}>
        <DateCard day={formattedDate.day} month={formattedDate.month} />
        <CurrentTabAppointmentContainer>
          <AppointmentCard
            showButton={true}
            time={formattedDate.time}
            clinicName={item.surgeryName}
            location={item.suburb_name}
            status={item.status}
            buttonTitle={buttonTitle}
            id={item.id}
            fromPrev={false}
            isCompletable={item['is-completable']}
            showStatus={true}
            isTarget={item.isTarget}
          />
        </CurrentTabAppointmentContainer>
      </CurrentTabInnerContainer>
    );
  };

  const upcomingAppointmentsRenderItem = ({item}) => {
    const formattedDate = dateTimeSeprator(item.date);
    const buttonTitle = buttonType(
      formattedDate.formatedDate,
      item.status_uivalue,
    );
    return (
      <CurrentTabInnerContainer key={item.id}>
        <DateCard day={formattedDate.day} month={formattedDate.month} />
        <CurrentTabAppointmentContainer>
          <AppointmentCard
            showButton={true}
            time={item.date}
            clinicName={item.clinic_name}
            location={item.suburb_name}
            status={item.status_uivalue}
            buttonTitle={buttonTitle}
            id={item.id}
            fromPrev={false}
            showStatus={true}
            isTarget={item.isTarget}
            month={formattedDate.month}
            day={formattedDate.day}
            year={formattedDate.year}
          />
        </CurrentTabAppointmentContainer>
      </CurrentTabInnerContainer>
    );
  };

  // if (selectedCard) {
  //   dispatch(getCompleteAppointment({appId: selectedCard}))
  // }

  if (upcomingAppsLoading && appointmentsLoading && filteredAppsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
      }}>
      <View style={{width: '100%'}}>
        {showFilteredApps && Array.isArray(filteredApps) ? (
          <View>
            <SelectedFilterCard
              heading={filteredAppsObject.filterClinic}
              hideCard={() => {
                setShowFilteredApps(false);
              }}
            />
          </View>
        ) : null}
        <CurrentTabMainContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshAppointments}
            />
          }
          onRefresh={refreshAppointments}
          refreshing={Array.isArray(appointments) ? false : true}
          contentContainerStyle={{paddingBottom: 100}}>
          {(!appointments || appointments.length === 0) && 
         (!upcomingAppointments || upcomingAppointments.length === 0) ? (
          <EmptyContainerView>
           <MessageText>You currently don't have any appointment made.</MessageText>
      <MessageText>
        Please book new appointments from{' '}
        <LinkText onPress={() => navigateTo(ScreenNames.MYCUSTOMER)}>your customer</LinkText>
      </MessageText>
        </EmptyContainerView>
        ) : (
          <>
            {showFilteredApps &&
              filteredApps &&
              filteredApps.map(item => filteredRenderItem({item}))}
            {!showFilteredApps &&
              appointments &&
              appointments.map(item => appointmentsRenderItem({item}))}
            {!showFilteredApps &&
              upcomingAppointments &&
              upcomingAppointments.map(item =>
                upcomingAppointmentsRenderItem({item}),
              )}

              <TouchableOpacity onPress={handleShowMore}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginEnd: SPACING.h5,
                    marginBottom: SPACING.h200,
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

              {loadingMore && (
                <View style={{ alignItems: 'center', marginVertical: SPACING.h200 }}>
                  <LoadingIndicator />
                </View>
              )}
          </>
        )}
        </CurrentTabMainContainer>
        
      </View>
     
    </View>
  );
};

export default CurrentTab;

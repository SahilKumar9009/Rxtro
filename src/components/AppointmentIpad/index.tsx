import React, {useState} from 'react';
import {Text, View, Pressable, Alert} from 'react-native';
import PlusIcon from '../../assets/Svg/plusIcon';
import ReloadIcon from '../../assets/Svg/ReloadIcon';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import combineReducer from '../../reducers';
import {takeClinicAppointmentApiGroup} from '../../api2/takeClinicAppointmenApi';
import {
  ActionButton,
  Icon,
  ActionButtonText,
  Table,
  Row,
  Cell,
  Line,
} from './styled';
import {SPACING, WIDTH} from '../../constants';
import { takeIndividualAppointmentApi } from '../../api2/postTakeIndividualApp';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const AppointmentTable = ({item, index}) => {
  const [confirm, setConfirm] = useState(true);
  const dispatch = useDispatch<TypedDispatch>();

  const suburbName = item?.clinic?.address?.suburb_name;
  const currentAppId = item?.current_app_id;
  const appDate = item?.app_date;
  const scheduleId = item?.scheduleId;
  const clinicId = item?.clinic?.clinicId;

  const individualId = useSelector(
    (state: any) => state.storeIdReducer.surgeryId,
  );
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );

  const apihit = action => {
    const GroupData = {
      appDate: appDate,
      takenFrom: 2,
      scheduleId: scheduleId,
      userId: userData?.userId,
      clinicId: clinicId,
    };

    const individaulData = {
      appDate: appDate,
      individualId: individualId,
      takenFrom: 1,
      scheduleId: scheduleId,
      userId: userData?.userId,
      clinicId: clinicId,
    };

    if (action !== 0) {
      if (individualId > 0) {
        dispatch(takeIndividualAppointmentApi(individaulData));
      } else {
        dispatch(takeClinicAppointmentApiGroup(GroupData));
      }
    }
  };

  const attendantNames = item.attendants.map(attendant => {
    const fullName = `${attendant.first_name} ${attendant.last_name}`;
    return fullName
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/(^\w|\s+\w)/g, m => m.toUpperCase());
  });

  const approvalStatus = item.approval;

  const showConfirmationAlert = (message, action) => {
    Alert.alert(
      `${message}`,
      'Are you sure you want to confirm the booking?',
      [
        {text: 'No', onPress: () => console.log('Booking not confirmed')},
        {text: 'Yes', onPress: () => apihit(action)},
      ],
      {cancelable: true},
    );
  };

  const renderActionText = action => {
    switch (action) {
      case 0:
        return 'Retain Slot';
      case 1:
        return 'Take Appointment';
      case 2:
        return 'Reschedule Slot';
      case 4:
        return 'Waiting For Approval';
      default:
        return 'Unknown Action';
    }
  };

  const handleButtonPress = action => {
    switch (action) {
      case 0:
        showConfirmationAlert('Retain same Slot', action);
        break;
      case 1:
        showConfirmationAlert('Take Appointment', action);
        break;
      case 2:
        showConfirmationAlert('Confirm Booking', action);
        break;
      default:
        break;
    }
  };

  const renderActionButton = action => (
    <ActionButton onPress={() => handleButtonPress(action)}>
      {action === 1 ? (
        <Icon>
          <PlusIcon />
        </Icon>
      ) : (
        <Icon>
          <ReloadIcon />
        </Icon>
      )}
      <ActionButtonText>{renderActionText(action)}</ActionButtonText>
    </ActionButton>
  );

  return (
    <Table key={index}>
      <Row>
        <Cell>{item?.app_date_formatted}</Cell>
        <Line />
        <Cell
          style={{
            width: WIDTH.w100,
          }}>{`${suburbName} ${item?.clinic?.name}`}</Cell>
        <Line />
        <Cell>{item?.topic}</Cell>
        <Line />
        <Cell>{approvalStatus ? 'True' : 'False'}</Cell>
        <Line style={{marginEnd: SPACING.h10}} />
        <View
          style={{
            width: '45%',
            paddingVertical: SPACING.h8,
            marginEnd: '5%',
          }}>
          {renderActionButton(item?.action)}
        </View>
      </Row>
    </Table>
  );
};

export default AppointmentTable;

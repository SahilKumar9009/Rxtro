import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import RetainSlotModal from '../RetainSlotButton';
import SlotFrequenciesModal from '../ReschedulceComponent';
import RequestApprovalModal from '../RequestApprovalModal';
import ConfirmModal from '../ConfirmModal';
import PlusIcon from '../../assets/Svg/plusIcon/index';
import ReloadIcon from '../../assets/Svg/ReloadIcon';
import Arrow from '../../assets/Svg/Arrow';
import {Colors, SPACING} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import combineReducer from '../../reducers';
import {
  Container,
  InnerContainer,
  Row,
  Label,
  VerticalLine,
  ButtonText,
  Value,
  Button,
  Card,
} from './styled';
import { takeClinicAppointmentApiGroup } from '../../api2/takeClinicAppointmenApi';
import { takeIndividualAppointmentApi } from '../../api2/postTakeIndividualApp';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const AppointmentItem = ({item, index}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const [modal, setModal] = useState(false);
  const [requestApproval, setRequestApproval] = useState(false);
  const [confirm, setConfirmModal] = useState(false);
  const [retainSlot, setRetainSlot] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [action, setAction] = useState();
  const [clinicId, setClinicId] = useState();
 
  const bookedBy = item['booked-by'];
  const approvalStatus = item.approval;
  const suburbName = item?.clinic?.address?.suburb_name;

  const attendantNames = item.attendants.map(
    attendant => `${attendant.first_name} ${attendant.last_name}`,
  );

  const individualId = useSelector(
    (state: any) => state.storeIdReducer.surgeryId,
  );
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );


  const handleConfirm = item => {
    console.log("in the handle confirm item", item)
    const appDate = item.app_date;
    const scheduleId = item.scheduleId;
    const clinicId = item?.clinic?.clinicId;

    const GroupData = {
      appDate: appDate,
      takenFrom: 2,
      scheduleId: appDate,
      clinicId: clinicId,
      userId: userData?.userId,
    };

    const individaulData = {
      appDate: appDate,
      individualId: individualId,
      takenFrom: 1,
      scheduleId: scheduleId,
      clinicId: clinicId,
      userId: userData?.userId
    };

    if (individualId > 0) {
      dispatch(takeIndividualAppointmentApi(individaulData));
    } else {
      dispatch(takeClinicAppointmentApiGroup(GroupData));
    }
    setConfirmModal(false);
  };

  const handleButtonPress = item => {
    switch (item.action) {
      case 0:
        if (item['booked-by'] === 'You') {
          setConfirmModal(true); 
        } else {
          setConfirmModal(true); 
        }
        setAction(item.action);
        break;
       
      case 1:
        // setRetainSlot(true);
        setConfirmModal(true);
        setAction(item.action);
        break;
      case 2:
        setConfirmModal(true);
        setAction(item.action);
        break;
        case 3:   
        setRequestApproval(true);
        setClinicId(item?.clinic?.clinicId)
        break;
      default:
        console.warn('Unhandled action:', action);
    }
  };

  const renderActionText = action => {
    console.log("in the render text action", action)
    switch (action) {
      case 0:
      return item['booked-by'] === 'You' ? 'Retain Slot' : 'Not Available';
      case 1:
        return 'Take Appointment';
      case 2:
        return 'Reschedule Slot';
      case 3:
        return 'Request Approval';
      case 4:
        return 'Waiting For Approval';
      // No default case, so it will return undefined for unrecognized actions
    }
  };

  return (
    <Container key={index}>
      <Card>
        <InnerContainer>
          <Row>
            <Label>When</Label>
            <VerticalLine />
            <Value style={{fontWeight: '600', color: Colors.BLACK_TEXT}}>
              {item.app_date_formatted} {item.app_date}
            </Value>
          </Row>
          <Row>
            <Label>With</Label>
            <VerticalLine
              style={{height: Platform.OS === 'ios' ? '250%' : '220%'}}
            />
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
              <Value
                style={{fontWeight: '600', color: Colors.BLACK_TEXT}}
                numberOfLines={isExpanded ? undefined : 2}
                onPress={() => setIsExpanded(!isExpanded)}>
                {suburbName}-{item.clinic.name}
                {attendantNames}
              </Value>
              <Arrow
                rotation={isExpanded ? 'downward' : undefined}
                style={{marginHorizontal: 6}}
                color={'#424242'}
                onPress={() => setIsExpanded(!isExpanded)}
              />
            </View>
          </Row>
          <Row>
            <Label>Meeting Type</Label>
            <VerticalLine style={{height: '240%'}} />
            <Value>{item.topic}</Value>
          </Row>
          <Row style={{borderBottomWidth: 0}}>
            <Label>Approval Required?</Label>
            <VerticalLine />
            <Value>{approvalStatus ? 'True' : 'False'}</Value>
          </Row>
        </InnerContainer>
        <Button
          style={{
            backgroundColor:
              bookedBy === 'Free Slot'
                ? '#293B8F'
                : item.action === 0 && bookedBy !== 'You'
                ? '#0000001F'
                : '#2979FF',
          }}
          onPress={() => handleButtonPress(item)}>
          {item.action === 1 ? (
    <PlusIcon style={{marginEnd: SPACING.h6}} />
  ) : item.action === 2 ? (
    <ReloadIcon style={{marginEnd: SPACING.h6}} />
  ) : item.action === 0 && bookedBy !== 'You' ? null : (
    <ReloadIcon style={{marginEnd: SPACING.h6}} />
  )}
          <ButtonText
            style={{
              color: item.action === 'Not Available' ? '#757575' : 'white',
            }}>
            {renderActionText(item.action)}
          </ButtonText>
        </Button>
      </Card>

      {confirm && (
        <ConfirmModal
          visible={confirm}
          message= {item.action === 0   && bookedBy !== 'You' ? "Retain Same Slot?":"Confirm appointment?"}
          onConfirm={() => handleConfirm(item)}
          Item={item}
          onCancel={() => setConfirmModal(false)}
        />
      )}

      {modal && (
        <SlotFrequenciesModal
          isvisible={modal}
          onClose={() => setModal(false)}
          teritoryId={undefined}
        />
      )}
      {requestApproval && (
        <RequestApprovalModal
          Item={item}
          clinicId = {clinicId}
          visible={requestApproval}
          onClose={() => setRequestApproval(false)}
        />
      )}
      {retainSlot && (
        <RetainSlotModal
          visible={retainSlot}
          onClose={() => setRetainSlot(false)}
          action={action}
          Item={item}
        />
      )}
    </Container>
  );
};

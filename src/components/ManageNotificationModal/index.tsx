import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ReUsableButton from '../ReUsableButton';
import { postEditNotifications } from '../../actions';
import getNotificationCenter from '../../apiActions/getNotificationCenter';
import {
  ManageNotificationModalMainContainer,
  ManageNotificationModalInnerContainer,
  ManageNotificationModalHeader,
  ManageNotificationModalHeadingText,
  EditText,
  ButtonContainer,
  MadalNotificationButtonWrapper,
} from './styled';
import { FONT_SIZE, isTablet, mainBackgroundColor, SPACING } from '../../constants';

interface Notification {
  id: number;
  name: string;
  accepted: boolean;
  enabled: boolean;
}

interface UserData {
  userId: number;
  // Add other user properties as needed
}

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
  territoryId: number;
};

    // Check if bookedBy filter is set to a valid option
const ManageNotificationModal: React.FC<Props> = ({
  isVisible,
  onBackdropPress,
  territoryId,
}) => {
  const dispatch = useDispatch();
  const [pushNotifications, setPushNotifications] = useState<Notification[]>([]);
  const [emailNotifications, setEmailNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const userData = useSelector((state: any) => state.userProfileReducer2.userProfile.result) as UserData;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await dispatch(getNotificationCenter(userData?.userId, territoryId));
        setPushNotifications(data['push-notifications'] || []);
        setEmailNotifications(data['email-notifications'] || []);
      } catch (error) {
        setError('Failed to fetch notifications. Please try again later.');
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.userId && territoryId) {
      fetchNotifications();
    }
  }, [dispatch, userData?.userId, territoryId]);

  const toggleNotification = (
    type: 'push' | 'email',
    id: number,
    field: 'accepted' | 'enabled',
    value: boolean
  ) => {
    const updateState = (notifications: Notification[]) =>
      notifications.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );

    if (type === 'push') {
      setPushNotifications(updateState(pushNotifications));
    } else {
      setEmailNotifications(updateState(emailNotifications));
    }
  };

  const onApplyNotification = async () => {
    const pushNotificationsData = pushNotifications.map((n) => ({
      name: n.name, 
      description: n.description,
      accepted: n.accepted,
      id: n.id,
      enabled: n.enabled, 
    }));
  
    const emailNotificationsData = emailNotifications.map((n) => ({
      name: n.name, 
      description: n.description, 
      accepted: n.accepted,
      id: n.id,
      enabled: n.enabled, 
    }));

    const requestBody = {
      'push-notifications': pushNotificationsData,
      'email-notifications': emailNotificationsData,
    };
    try {
      const userId = userData?.userId;
      await dispatch(postEditNotifications({ userId, territoryId, notifications: requestBody }));
      Alert.alert('Success', 'Notification preferences updated!');
      onBackdropPress();
    } catch (error) {
      setError('Failed to update notifications. Please try again later.');
      console.error('Error updating notifications:', error);
    }
  };

  const onCancel = () => {
    onBackdropPress();
  };

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.6} onBackdropPress={onBackdropPress}>
      <ManageNotificationModalMainContainer>
 <ManageNotificationModalInnerContainer>
          <ManageNotificationModalHeader>
            <ManageNotificationModalHeadingText>Edit Notifications</ManageNotificationModalHeadingText>
            <TouchableOpacity onPress={onBackdropPress}>
              <Icon name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </ManageNotificationModalHeader>

          <View style={{ borderBottomWidth: 1, marginBottom: SPACING.h10, borderBottomColor: '#ccc'}} />

          {loading && <ActivityIndicator size="small" />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <EditText>Email Notifications</EditText>
          {emailNotifications.map((notification) => (
            <Checkbox.Item
              key={notification.id}
              mode="android"
              label={notification.name}
              status={notification.accepted ? 'checked' : 'unchecked'}
              onPress={() =>
                toggleNotification('email', notification.id, 'accepted', !notification.accepted)
              }
              labelStyle={{
                width: '90%',
                fontSize:
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f9
                      : FONT_SIZE.f14
                    : isTablet
                    ? FONT_SIZE.f9
                    : FONT_SIZE.f14,
              }}
              color={mainBackgroundColor}
            />
          ))}

          <EditText>Push Notifications</EditText>
          {pushNotifications.map((notification) => (
            <Checkbox.Item
              key={notification.id}
              mode="android"
              label={notification.name}
              status={notification.accepted ? 'checked' : 'unchecked'}
              onPress={() =>
                toggleNotification('push', notification.id, 'accepted', !notification.accepted)
              }
              labelStyle={{
                width: '90%',
                fontSize:
                  Platform.OS === 'ios'
                    ? Platform.isPad
                      ? FONT_SIZE.f9
                      : FONT_SIZE.f14
                    : isTablet
                    ? FONT_SIZE.f9
                    : FONT_SIZE.f14,
              }}
              color={mainBackgroundColor}
            />
          ))}

          <ButtonContainer>
            <MadalNotificationButtonWrapper onPress={onApplyNotification}>
              <ReUsableButton title="Save" color="#007aff" />
            </MadalNotificationButtonWrapper>
            <MadalNotificationButtonWrapper onPress={onCancel}>
              <ReUsableButton title="Cancel" color="#e4e4e6" />
            </MadalNotificationButtonWrapper>
          </ButtonContainer>
        </ManageNotificationModalInnerContainer>
      </ManageNotificationModalMainContainer>
    </Modal>
  );
};

export default ManageNotificationModal
import { BASE_URL } from '../../constants/api';
import { AppThunk } from '../../apiActions/interface';
import navigateTo from '../../navigation/navigate';
import { ScreenNames } from '../../constants';
import { post } from '..';
import { Alert } from 'react-native';
import { getTokens } from '../../methods/tokens';

// Define an interface for the IndividualData
interface IndividualData {
  appDate: string;
  takenFrom: number;
  scheduleId: string;
  clinicId: string;
  individualId: string;
  userId: number;
}

export const takeIndividualAppointmentApi =
  (individualData: IndividualData) => async (dispatch: AppThunk) => {
    try {
      const path = `${BASE_URL}/o/representative-app/${individualData.userId}/take-appointment/clinic/${individualData.clinicId}/individual/${individualData.individualId}?appDate=${individualData.appDate}&takenFrom=1&scheduleId=${individualData.scheduleId}`;
      const response = await post({
        path,
        data:{},
        isUrlEncoded: false,
        multipart: false,
        onSuccess: () => {
          Alert.alert('Success', 'Appointment successfully taken');
          navigateTo(ScreenNames.APPOINTMENT);
         
        },
      });

    } catch (error) {
      console.error('Error taking appointment:', error);
      Alert.alert('Error', 'Failed to take appointment. Please try again.');
    }
  };
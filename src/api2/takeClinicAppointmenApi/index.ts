import { Path } from 'react-native-svg';
import { BASE_URL } from '../../constants/api';
import { AppThunk } from '../../apiActions/interface';
import navigateTo from '../../navigation/navigate';
import { ScreenNames } from '../../constants';
import { post } from '..';

// Define an interface for the GroupData
interface GroupData {
  userId: string;
  clinicId: string;
  appDate: string;
  scheduleId: string;
}

export const takeClinicAppointmentApiGroup =
  (groupData: GroupData) => async (dispatch: AppThunk) => {
    const Path = `${BASE_URL}o/representative-app/${groupData.userId}/take-appointment/clinic/${groupData.clinicId}?appDate=${groupData.appDate}&takenFrom=1&scheduleId=${groupData.scheduleId}`
    try {
      const response = await post({
        Path,
        data:{},
        isUrlEncoded: false,
        multipart: false, 
        onSuccess: () => {
          console.log('Appointment successfully taken');
         
        },
      });
      if (response?.statusCode === 200) {
        navigateTo(ScreenNames.APPOINTMENT);
      }

    } catch (error) {
      console.error('Error taking appointment:', error);
    }
  };
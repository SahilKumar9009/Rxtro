import {AsyncStorage} from 'react-native';

export const getStoredProfile = async () => {
  try {
    const profileData = await AsyncStorage.getItem('USER_PROFILE');
    if (profileData !== null) {
      const parsedProfileData = JSON.parse(profileData);
      return parsedProfileData;
    }
  } catch (error) {
    console.error('Error retrieving profile data:', error);
  }
};

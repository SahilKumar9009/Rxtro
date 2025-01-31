import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Function to set access and refresh tokens
export const setTokens = async (accessToken, refreshToken) => {
  try {
    // Stringify the tokens before storing them
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, JSON.stringify(accessToken)],
      [REFRESH_TOKEN_KEY, JSON.stringify(refreshToken)],
    ]);
    console.log('Tokens stored successfully');
  } catch (error) {
    console.error('Failed to store tokens:', error);
  }
};

// Function to get access and refresh tokens
export const getTokens = async () => {
  try {
    const values = await AsyncStorage.multiGet([
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
    ]);

    // Check if values are null before parsing
    const accessToken = values[0][1] !== null ? JSON.parse(values[0][1]) : null;
    const refreshToken =
      values[1][1] !== null ? JSON.parse(values[1][1]) : null;

    return {accessToken, refreshToken};
  } catch (error) {
    console.error('Failed to retrieve tokens:', error);
    return {accessToken: null, refreshToken: null};
  }
};

// Function to remove tokens
export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  } catch (error) {
    console.error('Failed to remove tokens:', error);
  }
};

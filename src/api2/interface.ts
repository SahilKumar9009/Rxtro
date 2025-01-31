import {API_RESPONSE} from '../constants/others';

export default interface Api {
  [API_RESPONSE.STATUS_CODE]: any;
  [API_RESPONSE.SUCCESS]: any;
  [API_RESPONSE.MESSAGE]?: any;
  data?: any;
}
export interface User {
  address: string | null;
  createdAt: string;
  currency: string | null;
  currencySymbol: string | null;
  dateOfBirth: string | null;
  email: string;
  firstName: string;
  gender: string | null;
  id: number;
  isAgreeAndContinue: boolean;
  isPhoneNumberVerified: boolean;
  isRecievePromotionalEmailsAndTips: boolean;
  lastName: string;
  phoneCountryCode: string | number | null;
  phoneNumber: string | number | null;
  preferredLanguage: string | null;
  profileImage: string | null;
  updatedAt: string;
  userConnectyCubePassword: string;
  userDecryptedConnectyCubePassword: string;
}

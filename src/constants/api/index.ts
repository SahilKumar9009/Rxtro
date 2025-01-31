import Config from 'react-native-config';

export enum API {
  GETACESSTOKEN = 'o/oauth2/token',
  REPINFO = 'o/representative/current',
  CREATEACCOUNT = '/api/jsonws/ws.rxtrouser/create-user?',
  FINDMYTERRITORY = 'o/rep-territory/:userId/find-my-territories',
  FINDMYGEO = 'o/rep-territory/:userId/find-my-territories-geo',
  GETCUSTOMERNOTIFICATION = 'o/rep-territory/:userId/notifications/:territoryId',
  GETNOTIFICATIONSCHEDULE = 'o/rep-territory/:territoryId/schedules-availability',
  GETALLCOMPANIES = '/api/jsonws/ws.visitor/get-companies',
  GETALLSTATES = 'o/locations/states/',
  GETBLOCKSBYSTATE = 'o/locations/states',
  GETSURBSSTATE = 'o/locations/states',

  //MY Customer
  FIND_MY_TERRITOYR = '/o/rep-territory/:userId/find-my-territories',
  FIND_MY_CUSTOMER_GEO = '/o/rep-territory/:userId/find-my-territories-geo',
  GET_CUSTOMER_NOTIFICATION = '/o/rep-territory/:userId/notifications/:territoryId',
  GET_AVAILABLE_APPS_BY_TERRITORY = '/o/representative-app/:userId/territory/:territoryId/available-take-apps',
  GET_AVAILABLE_APPS_BETWEEN_DATES = '/o/representative-app/:userId/available-take-apps?from=2024-07-22&to=2024-08-15',
  SWAP_APP = '/o/representative-app/:userId/swap-appointment/:appId?appDate=2024-07-08 06:00&takenFrom=1&scheduleId',
  TAKE_INDIVIDUAL_APP = '/o/representative-app/:userId/take-appointment/clinic/:clinicId/individual/:individualId?appDate=2024-07-24 10:00&takenFrom=1&scheduleId',
  TAKE_GROUP_APP = '/o/representative-app/:userId/take-appointment/clinic/:?appDate=2024-07-05 08:00&takenFrom=1&scheduleId',

  //Adding Customer
  ADD_CUSTOMER = 'o/rep-territory/',
  REMOVE_CUSTOMER = 'o/rep-territory'
}

export enum ENVIRONMENT {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
}

const ENV_VARS = {
  [ENVIRONMENT.DEVELOPMENT]: {
    API_URL: Config.DEV_BASE_URL, // * LOCAL URL
  },
  [ENVIRONMENT.PRODUCTION]: {
    API_URL: Config.PROD_BASE_URL, // * PRODUCTION URL
  },
  [ENVIRONMENT.STAGING]: {
    API_URL: 'https://staging.rxtro.com/', // * STAGING URL
  },
};

// ! Select ENV from here
export const SELECTED_ENVIRONMENT = ENVIRONMENT.STAGING;
// ! URLs
export const BASE_URL = 'https://staging.rxtro.com/';
export const S3_BUCKET_URL = Config.S3_BUCKET_URL;

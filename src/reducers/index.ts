import {combineReducers} from 'redux';
import userProfileReducer from './userProfile';
import getCompaniesReducer from './getCompanies';
import getTeamsReducer from './getTeams';
import getFutureAppointmentsReducer from './getFutureAppointments';
import getAppointmentInfoReducer from './getAppointmentInfo';
import getFilterClinicReducer from './getFilterClinic';
import getFilterRepresentativeReducer from './getFilterRepresentative';
import getPreviousAppointmentsReducer from './getPreviousAppointments';
import getPreviousLastAppointmentsReducer from './getPreviousLastAppointments';
import getTerritoryDrugRepReducer from './getTerritoryDrugRep';
import getStateFilterReducer from './getStateFilter';
import getSuburbFilterReducer from './getSuburbFilter';
import getSurgeryDetailReducer from './getSurgeryDetail';
import getCompleteAppointmentReducer from './getCompleteAppointment';
import getAvailableAppointmentsReducer from './getAvailableAppointments';
import getLastCancellationReducer from './getLastCancellations';
import getAvailableAppointmentInfoReducer from './getAvailableAppointmentInfo';
import postConfirmAppointmentReducer from './postConfrimAppointment';
import postTakeAppointmentReducer from './postTakeAppointment';
import postShowSwapAppointmentReducer from './postShowSwapAppointment';
import postCancelAppointmentReducer from './postCancelAppomitment';
import postShowEditNotificationsReducer from './postShowEditNotifications';
import postSearchTerritoriesReducer from './postSearchTerritories';
import postSwapAppointmentReducer from './postSwapAppointment';
import postEditProfileReducer from './postEditProfile';
import postFilterMyAppointmentsReducer from './postFilterMyAppointments';
import putLogoutReducer from './putLogout';
import getAllOrdersReducer from './getAllOrders';
import getMyOrdersReducer from './getMyOrders';
import postAssignOrderToMeReducer from './postAssignOrderToMe';
import postUnassignOrderReducer from './postUnassignOrder';
import postAddDrugRepresentativeReducer from './postAddDrugRepresentative';
import postEditNotificationsReducer from './postEditNotifications';
import postConfirmOrderItemReducer from './postConfirmOrderItem';
import setNotificationReducer from './setNotification';
import storeIdReducer from './storeActiveId';
import postCompleteAppointmentReducer from './postCompleteAppointments';
import representativeProfileReducer from './representativeProfile';
import getResponseReducer from './getResponseReducer';
import loaderReducer from './LoadingReducer';
import paramsSlice from './paramsSlice';
import userProfileReducer2 from './RepresentativeInfo';
import individualIdReducer from './storeDocterId';
import getBlockFilterReducer from './getBlockbyState';
import ProductReducer from './productReducer';

export default combineReducers({
  userProfileReducer,
  getCompaniesReducer,
  getTeamsReducer,
  getFutureAppointmentsReducer,
  getAppointmentInfoReducer,
  getFilterClinicReducer,
  getFilterRepresentativeReducer,
  getPreviousAppointmentsReducer,
  getPreviousLastAppointmentsReducer,
  getTerritoryDrugRepReducer,
  getStateFilterReducer,
  getSuburbFilterReducer,
  getSurgeryDetailReducer,
  getCompleteAppointmentReducer,
  getAvailableAppointmentsReducer,
  getLastCancellationReducer,
  getAvailableAppointmentInfoReducer,
  getAllOrdersReducer,
  getMyOrdersReducer,
  postConfirmAppointmentReducer,
  postTakeAppointmentReducer,
  postShowSwapAppointmentReducer,
  postCancelAppointmentReducer,
  postShowEditNotificationsReducer,
  postSearchTerritoriesReducer,
  postSwapAppointmentReducer,
  postEditProfileReducer,
  postFilterMyAppointmentsReducer,
  putLogoutReducer,
  postAssignOrderToMeReducer,
  postUnassignOrderReducer,
  postAddDrugRepresentativeReducer,
  postEditNotificationsReducer,
  postConfirmOrderItemReducer,
  setNotificationReducer,
  storeIdReducer,
  postCompleteAppointmentReducer,
  representativeProfileReducer,
  getResponse: getResponseReducer,
  loaderState: loaderReducer,
  paramsState: paramsSlice,
  userProfileReducer2,
  individualIdReducer,
  getBlockFilterReducer,
  ProductReducer,
});

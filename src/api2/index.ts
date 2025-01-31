import axios, {AxiosResponse} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Api from './interface';
import {API, BASE_URL} from '../constants/api';
import {getTokens, setTokens} from '../methods/tokens';
import {startLoader, stopLoader} from '../actions/globalLoader';
import {addGetResponse} from '../actions/getResponderSlice';
import {Alert} from 'react-native';
import qs from 'qs';
import {addParams} from '../reducers/paramsSlice';
import {logout} from '../methods/Logout';
import configureStore from '../store';


const { store, persistor } = configureStore();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
  async config => {
    const {accessToken} = await getTokens();

    if (accessToken) {
      console.log('in the config', accessToken);
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if(store){
      config.params = store.getState().paramsState.object;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Create a queue to hold pending requests
const requestQueue: ((token: string) => void)[] = [];
let isRefreshing = false;

export const refreshAccessToken = async () => {
  const {accessToken, refreshToken} = await getTokens();

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      if (!refreshToken) {
        console.log('if 401 error is not due to token invaidation');
        throw new Error('No refreshToken found');
      }

      const data = qs.stringify({
        grant_type: 'refresh_token',
        client_id: 'id-36f6c01e-dca3-9a9f-44b4-0a5d0aa4e23',
        client_secret: 'secret-a5a3ee88-60fa-e2ff-6eca-bf30396dee98',
        refresh_token: refreshToken,
      });

      const response = await axios.post(
        `${BASE_URL}${API.GETACESSTOKEN}`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response?.data) {
        const accessToken = response?.data?.access_token;
        const newRefreshToken = response?.data?.refresh_token;
        setTokens(accessToken, newRefreshToken);
      }

      requestQueue.forEach(resolve => resolve(accessToken));
      requestQueue.length = 0;
      isRefreshing = false;
      return accessToken;
    } catch (error) {
      logout();
    }
  } else {
    // If another request is already refreshing the token, wait for it to complete
    return new Promise<string>(resolve => {
      requestQueue.push(token => resolve(token));
    });
  }
};

const handleError = async (error: {
  config: any;
  response: {
    status: number;
    data: Api;
  };
}) => {
  const originalRequest = error.config;
  console.log("in the error", originalRequest)
  const status = error.response.status;
      const data = error.response.data?.errorMessage || 'something went wrong';
  // console.log('error in intercerpt', {error: data, status});

  if (status === 403) {
    try {
      const refreshToken = getTokens();
      if (!refreshToken) {
        Alert.alert( data?.message || 'Something went wrong');
        //! Toast message here
        return await Promise.reject(
          new Error(originalRequest.url + ': statusCode: ' + status),
        );
      }
      const token = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return await axiosInstance(originalRequest);
    } catch (error1) {
      return await Promise.reject(
        new Error(originalRequest.url + ': statusCode: ' + status),
      );
    }
  } else if (status === 409) {
    Alert.alert(data|| 'Something went wrong');
    // logout();
  } else if (status == 404) {
    Alert.alert(data || 'Something went wrong');
    //! Toast message here
    return await Promise.reject(
      new Error(originalRequest.url + ': statusCode: ' + status),
    );
  } else if (status >= 400) {
    store.dispatch(stopLoader());
    Alert.alert( data || 'Something went wrong');
    // Handle 404 (Not Found) errors
    //! Toast message here
    return await Promise.reject(
      new Error(originalRequest.url + ': statusCode: ' + status),
    );
  } else if (status >= 500) {
    Alert.alert(data);
    // !Toast message here
    return await Promise.reject(
      new Error(originalRequest.url + ': statusCode: ' + status),
    );
  }

  Alert.alert(data?.message || 'Something went wrong');
  // ! Handle other status codes here
  // For other status codes, return the error as is
  return Promise.reject(error);
};

// axiosInstance interceptor for handling token refresh
axiosInstance.interceptors.response.use(undefined, handleError);

const executeRequest = async <T>(
  requestFunction: (
    path: string,
    data?: any,
  ) => Promise<AxiosResponse<Api & T, any>>,
  path: string,
  data?: any,
  multipart: boolean = false,
  type: string = 'post',
  onSuccess?: () => void,
  dontShowMessage?: boolean,
) => {
  const {isConnected} = await NetInfo.fetch();

  try {
    if (!isConnected) {
      throw new Error('No Internet connection');
    }

    store.dispatch(startLoader());
    // store.dispatch(buttonLoader());
    // store.dispatch(clearParams());

    let response: AxiosResponse<Api & T, any>;
  
    if (multipart) {
      const config = {
        method: type,
        url: BASE_URL + path,
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [
          (data1: any) => {
            return data1;
          },
        ],
        data: data,
      };
      response = await axiosInstance.request(config);
    } else {
      response = await requestFunction(path, data);
    }
  
    if (response.status === 200) {  
      if (response.data.message && !dontShowMessage) {
        Alert.alert(response.data.message);
      }

    }

    // if (response.data.message && !dontShowMessage) {
    //   Alert.alert(response.data.message);
    // }
    //! Toast message here to show completion of POST/PUT request
    return {statusCode: response.status, data: response.data};
  } catch (error: any) {
    console.log("in the error", error)
    console.log(
      'Error in this path: ' +
        path +
        ' ( status : ' +
        error.status +
        ', message: ' +
        error.message +
        ' )',
    );
    Alert.alert('error', error.message ||  'something went wrong');
  } finally {
    store.dispatch(stopLoader());
  }
};

const get = async <T>({
  path,
  params,
  noLoader = false,
}: {
  path: string;
  params?: any;
  noLoader: boolean;
}): Promise<T> => {
  console.log("in the path", path)
  let persistedState = store.getState().getResponse[path];
  const {isConnected} = await NetInfo.fetch();

  try {
    if (!isConnected) {
      if (!persistedState) {
        throw new Error('No internet connection');
      }
      return persistedState;
    }
    if (!noLoader) {
      store.dispatch(startLoader());
    }
    store.dispatch(addParams(params));
    console.log('in the path param', path, params);

    const response = await axiosInstance.get<Api & T>(path);
    store.dispatch(addGetResponse({path, response: response?.data}));
    return response?.data;
  } catch (error: any) {
    console.log(
      'Error in this path: ' +
        path +
        ' ( status : ' +
        error.status +
        ', message: ' +
        error.message,
      +' )',
    );
    persistedState = store.getState().getResponse[path];

    if (!persistedState) {
      console.log('Persisted state in get req not found', error.message);
    }
    return persistedState;
  } finally {
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
  }
};

const post = async <T>({
  path,
  data,
  isUrlEncoded = false,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  isUrlEncoded?: boolean;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {

  console.log("in the path", path)
  if (isUrlEncoded) {
    const body = new URLSearchParams();
    const keys = Object.keys(data);
    keys.map(key => {
      body.append(key, data[key]);
    });
    return executeRequest<Api & T>(
      axiosInstance.post,
      path,
      body.toString(),
      multipart,
      'post',
      onSuccess,
    );
  }
  return executeRequest<Api & T>(
    axiosInstance.post,
    path,
    data,
    multipart,
    'post',
    onSuccess,
  );
};

const put = async <T>({
    path, data, multipart = false, onSuccess = () => { },
}: {
    path: string;
    data: any;
    multipart?: boolean;
    onSuccess?: () => void;
}, p0: string) => {
  return executeRequest<Api & T>(
    axiosInstance.put,
    path,
    data,
    multipart,
    'put',
    onSuccess,
  );
};

const patch = async <T>({
  path,
  data,
  multipart = false,
  dontShowMessage = false,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  multipart?: boolean;
  onSuccess?: () => void;
  dontShowMessage?: boolean;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.patch,
    path,
    data,
    multipart,
    'patch',
    onSuccess,
    dontShowMessage,
  );
};

const deleteApi = async <T>({
  path,
  data,
  multipart = false,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  multipart?: boolean;
  onSuccess?: () => void;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.delete,
    path,
    data,
    multipart,
    'delete',
    onSuccess,
  );
};

export {get, post, put, patch, deleteApi};

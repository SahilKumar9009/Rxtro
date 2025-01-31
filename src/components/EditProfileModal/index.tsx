import React, {useCallback, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DEVICE_ID,
  EMAIL_ID,
  FCM_TOKEN,
  FONT_SIZE,
  mainBackgroundColor,
  PASSWORD,
  USER_ID,
} from '../../constants';
import Input from '../Input';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import combineReducer from '../../reducers';
import ReUsableButton from '../ReUsableButton';
import * as ImagePicker from 'react-native-image-picker';
import {
  EditProfileModalMainContainer,
  EditProfileModalInnerContainer,
  EditProfileModalHeader,
  EditProfileModalHeadingText,
  EditProfileModalBodyWrapper,
  EditProfileModalImageContainer,
  EditProfileModalImage,
  EditProfileModalCard,
  EditProfileTouchableOpacityWrapper,
  EditProfileTouchableText,
  EditProfileTouchableIcon,
} from './styled';
import {MediaType, PhotoQuality} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  postEditProfile,
  postEditProfileLoading,
  updateProfile,
} from '../../actions/postEditProfile';
import UserDetailCard from '../UserDetailCard';
import postUploadVisiter from "../../apiActions/ProfileApi's/postUploadVisiter";
import postUpdateRep from '../../apiActions/ProfileApi\'s/postUpdateRep';

// import ImagePicker from 'react-native-image-crop-picker';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const EditProfileModal: React.FC<Props> = ({isVisible, onBackdropPress}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const user = useSelector(
    (state: any) =>
      state.representativeProfileReducer.representativeProfile.result,
  );
  const userData = useSelector(
    (state: any) => state.userProfileReducer2.userProfile.result,
  );
  console.log("userData", userData);

  const productData = useSelector(
    (state: any) => state.ProductReducer,
  );
  const [firstName, setFname] = useState(userData.firstName);
  const [lastName, setLname] = useState(userData.lastName);

  const [jobTitle, setJobTitile] = useState(userData.jobTitle);
  const [mobilePhone, setPhone] = useState(userData.mobilePhone);

  const [pickerResponse, setPickerResponse] = useState<any>(null);


  React.useEffect(() => {
    setFname(userData.firstName);
    setLname(userData.lastName);
    setJobTitile(userData.jobTitle);
    setPhone(userData.phone);
  }, [userData]);

  const onImageLibraryPress = useCallback(() => {
    const options: {
      selectionLimit: number;
      maxWidth: number;
      maxHeight: number;
      mediaType: MediaType;
      includeBase64: boolean;
      quality: PhotoQuality;
    } = {
      selectionLimit: 1,
      maxWidth: 256,
      maxHeight: 256,
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.6,
    };
    ImagePicker.launchImageLibrary(options, pickerResponse => {
      console.log({pickerResponse});
      if (pickerResponse.didCancel) {
        console.log('User cancelled image picker');
      } else if (pickerResponse.errorCode) {
        console.log('ImagePicker Error: ', pickerResponse.errorCode);
      } else {
        setPickerResponse(pickerResponse);
      }
    });
  }, []);

  const onSaveSubmit = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    const photoObject = await pickerResponse?.assets[0];
    console.log('in the photoObject', photoObject);
    const formData = new FormData();

    if (photoObject?.uri) {
      console.log('in the photoObject', photoObject);
      formData.append('file', {
        uri: photoObject.uri,
        type: photoObject.type,
        name: photoObject.fileName || 'photo.jpg',
      });

      await dispatch(postUploadVisiter(userId, formData));
      dispatch(postEditProfileLoading());
    }
    const data = {
      firstName: firstName,
      lastName: lastName,
      jobTitle: jobTitle,
      phone: mobilePhone,
    };

   if (data.phone.length < 8 || data.phone.length > 10) {
           Alert.alert('Please enter a valid phone number');
           setPhone(userData.phone);
           return;
         }

    try {
       dispatch(postUpdateRep(userId, data));
    } catch (error) {
      console.error('User  data update failed:', error);
  
    }

    onBackdropPress();
    setTimeout(() => {
      navigation.navigate('AppointmentScreen');
    }, 200);
  };

  const onClose = () => {
    setPickerResponse(null);
    setFname(userData.firstName);
    setLname(userData.lastName);
    setJobTitile(userData.jobTitle);
    setPhone(userData.phone);
    onBackdropPress();
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6}
      onBackdropPress={onClose}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <EditProfileModalMainContainer>
          <EditProfileModalInnerContainer>
            <EditProfileModalHeader
              style={{
                shadowColor: '#171717',
                shadowOffset: {width: 2, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}>
              <EditProfileModalHeadingText>
                Edit Profile
              </EditProfileModalHeadingText>
              <TouchableOpacity onPress={onClose}>
                <Icon
                  name="close-circle-outline"
                  size={FONT_SIZE.f18}
                  color="black"
                />
              </TouchableOpacity>
            </EditProfileModalHeader>
            <EditProfileModalBodyWrapper>
              <EditProfileModalImageContainer>
                <EditProfileModalImage
                  source={
                    pickerResponse
                      ? {
                          uri: `${
                            pickerResponse?.assets &&
                            pickerResponse?.assets[0]?.uri
                          }`,
                        }
                      : userData.portraitUrl
                      ? {uri:'https://staging.rxtro.com/'+ userData.portraitUrl}
                      : require('../../assets/defaultUser.png')
                  }
                />
                <EditProfileTouchableIcon
                  onPress={onImageLibraryPress}
                  activeOpacity={0.7}>
                  <Icon
                    name="cloud-upload-outline"
                    size={FONT_SIZE.f18}
                    color="white"
                  />
                </EditProfileTouchableIcon>
              </EditProfileModalImageContainer>
              <EditProfileModalCard
                style={{
                  shadowColor: '#171717',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}>
                <UserDetailCard heading="Name" />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Input
                    style={{width: '49%'}}
                    alignment="left"
                    value={firstName}
                    onChange={setFname}
                    canEdit
                  />
                  <Input
                    style={{width: '49%'}}
                    alignment="left"
                    value={lastName}
                    onChange={setLname}
                    canEdit
                  />
                </View>
                <UserDetailCard heading="Phone number" />
                <Input
                  alignment="left"
                  value={mobilePhone}
                  onChange={setPhone}
                  keyboardType='phone-pad'
                  maxLength={10}
                  canEdit
                />
                <UserDetailCard heading="Email Address" />
                <Input
                  alignment="left"
                  value={userData.emailAddress}
                  canEdit={false}
                />
                <UserDetailCard heading="Job Title" />
                <Input
                  alignment="left"
                  value={jobTitle}
                  onChange={setJobTitile}
                  bold
                  canEdit
                />
                {/* <UserDetailCard heading="Company Name" /> */}
                {/* <Input
                  alignment="left"
                  value={user.company.name}
                  canEdit={false}
                /> */}
                {/* <UserDetailCard heading="Products" /> */}
                {/* {productData?.products?.map((product, index) => {
                  return (
                    <Input
                      key={index.toString()}
                      alignment="left"
                      value={product.name}
                      canEdit={false}
                    />
                  );
                })}  */}
              </EditProfileModalCard>
            </EditProfileModalBodyWrapper>
            <EditProfileTouchableOpacityWrapper
              onPress={onSaveSubmit}
              activeOpacity={0.7}>
              <ReUsableButton title="Save" color={mainBackgroundColor} />
            </EditProfileTouchableOpacityWrapper>
            <EditProfileTouchableOpacityWrapper
              onPress={onClose}
              activeOpacity={0.7}>
              <EditProfileTouchableText>Cancel</EditProfileTouchableText>
            </EditProfileTouchableOpacityWrapper>
          </EditProfileModalInnerContainer>
        </EditProfileModalMainContainer>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default EditProfileModal;

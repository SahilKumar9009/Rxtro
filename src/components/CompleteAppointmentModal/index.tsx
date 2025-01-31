import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {
  TouchableOpacity,
  ScrollView,
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CompleteAppointmentModalMainContainer,
  CompleteAppointmentModalInnerContainer,
  CompleteAppointmentModalHeader,
  CompleteAppointmentModalHeadingText,
  CompleteAppointmentModalBody,
  CompleteAppointmentModalBodyPrimaryText,
} from './styled';
import {FONT_SIZE, HEIGHT, SPACING, WIDTH} from '../../constants';
import LoadingIndicator from '../LoadingIndicator';
import ReUsableButton from '../ReUsableButton';
import {postCompleteAppointment} from '../../actions/postCompleteAppointments';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
type Props = {
  isVisible: boolean;
  onBackdropPress?: () => void;
  appId?: string;
};
type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const CompletAppointmentModal: React.FC<Props> = ({
  isVisible,
  onBackdropPress,
  appId,
}) => {
  const attendantsObj = useSelector(
    (state: any) => state.getCompleteAppointmentReducer,
  );

  const [loading, setLoading] = useState(attendantsObj.dispatched);
  const [selectedID, setSelected] = React.useState<number[]>([]);
  const [selectOption, setSelectOption] = useState(true);
  const [comment, setComment] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const dispatch = useDispatch<TypedDispatch>();

  useEffect(() => {
    if (!Array.isArray(attendantsObj.appointmentDetail.attendants)) {
      return;
    }
    setLoading(false);
  }, [attendantsObj]);

  if (loading) {
    return <LoadingIndicator />;
  }

  useEffect(() => {
    if (!selectOption) {
      scrollRef.current?.scrollToEnd();
    }
  }, [selectOption]);

  const handleCompleteAppointment = () => {
    const attendantsIds = selectedID;
    const doctorsAccurate = +selectOption;
    const repComment = comment;
    if (appId)
      dispatch(
        postCompleteAppointment({
          appId: +appId,
          attendantsIds,
          doctorsAccurate,
          repComment,
        }),
      );
    setSelected([]);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.6}
      onBackdropPress={() => {
        setSelected([]);
        if (onBackdropPress) onBackdropPress();
      }}>
      <CompleteAppointmentModalMainContainer>
        <KeyboardAvoidingView behavior="position">
          <ScrollView
            ref={scrollRef}
            keyboardDismissMode="on-drag"
            style={{marginTop: 20}}>
            <CompleteAppointmentModalInnerContainer>
              <CompleteAppointmentModalHeader>
                <CompleteAppointmentModalHeadingText>
                  Complete An Appointment
                </CompleteAppointmentModalHeadingText>
                <TouchableOpacity
                  onPress={() => {
                    setSelected([]);
                    if (onBackdropPress) onBackdropPress();
                  }}
                  activeOpacity={0.7}>
                  <Icon
                    name="close-circle-outline"
                    size={FONT_SIZE.f18}
                    color="black"
                  />
                </TouchableOpacity>
              </CompleteAppointmentModalHeader>
              <View
                style={{
                  width: '100%',

                  backgroundColor: '#efefef',
                  alignItems: 'center',
                }}>
                {attendantsObj.appointmentDetail.attendants?.map(
                  (item, index) => (
                    <CompleteAppointmentModalBody
                      onPress={() => {
                        const idTemp = +item?.doctorId?.toString();
                        const idIndex = selectedID.findIndex(
                          item => item === idTemp,
                        );
                        if (idIndex === -1) {
                          setSelected(prev => [...prev, idTemp]);
                        } else {
                          const arrayRef = [...selectedID];
                          arrayRef.splice(idIndex, 1);
                          setSelected(arrayRef);
                        }
                      }}
                      style={{
                        shadowColor: '#171717',
                        shadowOffset: {width: 2, height: 2},
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                      }}
                      key={item.doctorId}>
                      <CompleteAppointmentModalBodyPrimaryText>
                        {item.name}
                      </CompleteAppointmentModalBodyPrimaryText>
                      {selectedID.includes(+item?.doctorId?.toString()) && (
                        <View
                          style={{
                            backgroundColor: 'orange',
                            height: SPACING.h10,
                            width: SPACING.h10,
                            borderRadius: 100,
                            marginRight: 20,
                          }}
                        />
                      )}
                    </CompleteAppointmentModalBody>
                  ),
                )}
              </View>

              <View
                style={{
                  width: '90%',
                  padding: SPACING.h10,
                  margin: SPACING.h10,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  shadowColor: '#171717',
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CompleteAppointmentModalBodyPrimaryText
                  style={{color: 'black', textAlign: 'center', width: '60%'}}>
                  Is the list of doctors at practice accurate?
                </CompleteAppointmentModalBodyPrimaryText>

                <View
                  style={{
                    width: 150,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    onPress={() => {
                      Keyboard.dismiss();
                      setSelectOption(true);
                    }}
                    style={[
                      styles.tapmeLeft,
                      {backgroundColor: selectOption ? 'white' : '#dfdfdf'},
                    ]}>
                    <Text style={{fontSize: 15}}>Yes</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setSelectOption(false);
                    }}
                    style={[
                      styles.tapmeRight,
                      {backgroundColor: !selectOption ? 'white' : '#dfdfdf'},
                    ]}>
                    <Text style={{fontSize: 15}}>No</Text>
                  </Pressable>
                </View>
                {!selectOption && (
                  <TextInput
                    scrollEnabled
                    multiline
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Your comment will be sent to the practice asking them to update their list"
                    style={{
                      borderWidth: 1,
                      borderColor: '#bcbcbc',
                      borderRadius: 10,
                      backgroundColor: 'white',
                      padding: SPACING.h20,
                      paddingLeft: 10,
                      marginVertical: SPACING.h20,
                      width: '95%',
                      height: 150,
                      fontSize: SPACING.h10,
                    }}
                  />
                )}
              </View>
              <Pressable
                style={{width: '90%'}}
                onPress={() => {
                  handleCompleteAppointment();
                  if (onBackdropPress) onBackdropPress();
                }}>
                <ReUsableButton title="Complete" />
              </Pressable>
            </CompleteAppointmentModalInnerContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </CompleteAppointmentModalMainContainer>
    </Modal>
  );
};

export default CompletAppointmentModal;

const styles = StyleSheet.create({
  tapmeLeft: {
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    borderColor: '#dfdfdf',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2.5,
  },
  tapmeRight: {
    width: '50%',
    height: '100%',
    overflow: 'hidden',
    borderColor: '#dfdfdf',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 2.5,
  },
});

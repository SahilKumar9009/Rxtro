import React, {useEffect, useState} from 'react';
import {
  FilterModalMainContainer,
  FilterModalInnerContainer,
  FilterModalHeader,
  FilterModalHeadingText,
  FilterModalBodyWrapper,
  FilterModalSubHeading,
  FilterModalSubHeadingText,
  FilterModalContentWrapper,
  FilterModalEachContentWrapper,
  FilterModalContentText,
  FilterModalButtonWrapper,
} from './styled';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import {TouchableOpacity} from 'react-native';
import ReUsableButton from '../ReUsableButton';
import {FONT_SIZE, mainBackgroundColor, USER_ID} from '../../constants';
import {useOrientation} from '../../hooks/useOrientation';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  getFilterClinic,
  getFilterClinicLoading,
  getFilterRepresentative,
  postFilterMyAppointments,
} from '../../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../LoadingIndicator';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const FilterModal: React.FC<Props> = ({isVisible, onBackdropPress}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const upcomingAppointmentObject = useSelector(
    (state: any) => state.getFutureAppointmentsReducer,
  );
  const clinics = useSelector(
    (state: any) => state.getFilterClinicReducer.clinics.result,
  );
  const representatives = useSelector(
    (state: any) => state.getFilterRepresentativeReducer.representatives.result,
  );
  const orientation = useOrientation();
  const [loading, setLoading] = useState(true);
  const SECTIONS = [
    {
      title: 'Clinic',
      icon: 'back',
    },
    {
      title: 'Representative',
      icon: 'back',
    },
  ];

  const [activeSections, setActiveSection] = useState([]);
  const [clinicCheck, setClinicCheck] = useState(null);
  const [clinicName, setClinicName] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const userId = await AsyncStorage.getItem(USER_ID);
  //     dispatch(getFilterClinic({drugRepId: userId}));
  //     dispatch(getFilterClinicLoading());
  //     dispatch(getFilterRepresentative({drugRepId: userId}));
  //   })();
  // }, [upcomingAppointmentObject]);

  const onApplyFilter = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    if (clinicCheck) {
      dispatch(
        postFilterMyAppointments({
          drugRepId: userId,
          surgeryId: clinicCheck,
          colleagueDrugRepId: '',
          filterClinic: clinicName,
        }),
      );
    }
    onBackdropPress();
  };

  const _updateSections = activeSections => {
    setActiveSection(activeSections);
  };

  const _renderHeader = (sections, _isActive) => {
    return (
      <FilterModalSubHeading>
        <FilterModalSubHeadingText>{sections.title}</FilterModalSubHeadingText>
        <Icon name="chevron-forward" color="white" size={FONT_SIZE.f18} />
      </FilterModalSubHeading>
    );
  };

  useEffect(() => {
    if (!Array.isArray(clinics) || !Array.isArray(representatives)) {
      return;
    }
    setLoading(false);
  }, [clinics, representatives]);

  const _renderContent = content => {
    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <FilterModalContentWrapper
        style={{height: orientation === 'LANDSCAPE' ? hp('35%') : hp('35%')}}>
        {content.title === 'Clinic'
          ? clinics &&
            clinics?.map(item => {
              const id = item.surgeryId;
              return (
                <FilterModalEachContentWrapper
                  key={id}
                  onPress={() => {
                    setClinicCheck(id);
                    setClinicName(item.surgeryname);
                  }}
                  activeOpacity={0.7}>
                  <FilterModalContentText>
                    {item.surgeryname}
                  </FilterModalContentText>
                  {id === clinicCheck ? (
                    <Icon
                      name="checkmark-circle"
                      size={FONT_SIZE.f18}
                      color={mainBackgroundColor}
                      style={{marginLeft: 'auto'}}
                    />
                  ) : null}
                </FilterModalEachContentWrapper>
              );
            })
          : content.title === 'Representative'
          ? representatives?.map(item => {
              return (
                <FilterModalEachContentWrapper
                  key={item.teamId ? item.teamId : item.name}
                  activeOpacity={0.7}>
                  <FilterModalContentText>{item.name}</FilterModalContentText>
                  <Icon
                    name="checkmark-circle"
                    size={FONT_SIZE.f18}
                    color={mainBackgroundColor}
                    style={{marginLeft: 'auto'}}
                  />
                </FilterModalEachContentWrapper>
              );
            })
          : null}
      </FilterModalContentWrapper>
    );
  };

  return (
    <FilterModalMainContainer>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.6}
        onBackdropPress={onBackdropPress}>
        <FilterModalInnerContainer>
          <FilterModalHeader
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}>
            <FilterModalHeadingText>Filter</FilterModalHeadingText>
            <TouchableOpacity onPress={onBackdropPress} activeOpacity={0.7}>
              <Icon
                name="close-circle-outline"
                size={FONT_SIZE.f18}
                color="black"
              />
            </TouchableOpacity>
          </FilterModalHeader>
          <FilterModalBodyWrapper>
            <Accordion
              activeSections={activeSections}
              sections={SECTIONS}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              underlayColor="transparent"
            />
          </FilterModalBodyWrapper>
          <FilterModalButtonWrapper onPress={onApplyFilter} activeOpacity={0.7}>
            <ReUsableButton title="Apply" />
          </FilterModalButtonWrapper>
        </FilterModalInnerContainer>
      </Modal>
    </FilterModalMainContainer>
  );
};

export default FilterModal;

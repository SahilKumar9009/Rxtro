import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import {FONT_SIZE, mainBackgroundColor, USER_ID} from '../../constants';
import {
  TerritoryFilterModalMainContainer,
  TerritoryFilterModalInnerContainer,
  TerritoryFilterModalHeader,
  TerritoryFilterModalHeadingText,
  TerritoryFilterModalBodyWrapper,
  TerritoryFilterModalSubHeading,
  TerritoryFilterModalSubHeadingText,
  TerritoryFilterModalContentWrapper,
  TerritoryFilterEachContentWrapper,
  TerritoryFilterModalText,
  TerritoryFilterModalButtonWrapper,
} from './styled';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../../reducers';
import {useOrientation} from '../../hooks/useOrientation';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getStateFilter,
  getSuburbFilter,
  postSearchTerritories,
} from '../../actions';
import ReUsableButton from '../ReUsableButton';
import LoadingIndicator from '../LoadingIndicator';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
};

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const TerritoryFilterModal: React.FC<Props> = ({
  isVisible,
  onBackdropPress,
}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const [stateCheck, setStateCheck] = useState(null);
  const [suburbCheck, setSuburbCheck] = useState<number>();
  const [loading, setLoading] = useState(true);
  const states = useSelector(
    (state: any) => state.getStateFilterReducer.states,
  );
  const suburbs = useSelector(
    (state: any) => state.getSuburbFilterReducer.suburbs.result,
  );
  const orientation = useOrientation();
  const SECTIONS = [
    {
      title: 'State',
      icon: 'back',
    },
    {
      title: 'Suburb',
      icon: 'back',
    },
  ];

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem(USER_ID);
      dispatch(getStateFilter());
      if (stateCheck) {
        dispatch(getSuburbFilter({drugRepId: userId, regionId: stateCheck}));
      }
    })();
  }, [stateCheck]);

  const onApplySearch = async () => {
    const userId = await AsyncStorage.getItem(USER_ID);
    if (stateCheck && suburbCheck) {
      dispatch(
        postSearchTerritories({
          drugRepId: userId,
          regionId: stateCheck,
          searchTerm: '',
          sizeResult: 10,
          suburbId: suburbCheck,
        }),
      );
    }
    onBackdropPress();
  };

  useEffect(() => {
    if (!Array.isArray(states)) {
      return;
    }
    setLoading(false);
  }, [states]);

  const [activeSections, setActiveSection] = useState([]);

  const _renderHeader = (sections, _isActive) => {
    return (
      <TerritoryFilterModalSubHeading>
        <TerritoryFilterModalSubHeadingText>
          {sections.title}
        </TerritoryFilterModalSubHeadingText>
        <Icon name="chevron-forward" color="white" size={FONT_SIZE.f18} />
      </TerritoryFilterModalSubHeading>
    );
  };
  const _updateSections = activeSections => {
    setActiveSection(activeSections);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  const _renderContent = content => {
    return (
      <TerritoryFilterModalContentWrapper
        style={{height: orientation === 'LANDSCAPE' ? hp('35%') : hp('35%')}}>
        {content.title === 'State' ? (
          states &&
          states?.map(item => {
            const id = item.regionId;
            return (
              <TerritoryFilterEachContentWrapper
                key={item.regionId}
                onPress={() => setStateCheck(id)}
                activeOpacity={0.7}>
                <TerritoryFilterModalText>{item.name}</TerritoryFilterModalText>
                {stateCheck === id ? (
                  <Icon
                    name="checkmark-circle"
                    size={FONT_SIZE.f18}
                    color={mainBackgroundColor}
                    style={{marginLeft: 'auto'}}
                  />
                ) : null}
              </TerritoryFilterEachContentWrapper>
            );
          })
        ) : content.title === 'Suburb' ? (
          stateCheck ? (
            suburbs &&
            suburbs?.map(item => {
              const id = item.suburbId;
              return (
                <TerritoryFilterEachContentWrapper
                  key={item.suburbId}
                  onPress={() => setSuburbCheck(id)}
                  activeOpacity={0.7}>
                  <TerritoryFilterModalText>
                    {item['suburb-name']}
                  </TerritoryFilterModalText>
                  {suburbCheck === id ? (
                    <Icon
                      name="checkmark-circle"
                      size={FONT_SIZE.f18}
                      color={mainBackgroundColor}
                      style={{marginLeft: 'auto'}}
                    />
                  ) : null}
                </TerritoryFilterEachContentWrapper>
              );
            })
          ) : (
            <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
              <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
                Please Select the State First!
              </Text>
            </View>
          )
        ) : null}
      </TerritoryFilterModalContentWrapper>
    );
  };

  return (
    <TerritoryFilterModalMainContainer>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.6}
        onBackdropPress={onBackdropPress}>
        <TerritoryFilterModalInnerContainer>
          <TerritoryFilterModalHeader
            style={{
              shadowColor: '#171717',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}>
            <TerritoryFilterModalHeadingText>
              Territory:Filter
            </TerritoryFilterModalHeadingText>
            <TouchableOpacity onPress={onBackdropPress} activeOpacity={0.7}>
              <Icon
                name="close-circle-outline"
                size={FONT_SIZE.f18}
                color="black"
              />
            </TouchableOpacity>
          </TerritoryFilterModalHeader>
          <TerritoryFilterModalBodyWrapper>
            <Accordion
              activeSections={activeSections}
              sections={SECTIONS}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
              underlayColor="transparent"
            />
          </TerritoryFilterModalBodyWrapper>
          <TerritoryFilterModalButtonWrapper
            onPress={onApplySearch}
            activeOpacity={0.7}>
            <ReUsableButton title="Apply" />
          </TerritoryFilterModalButtonWrapper>
        </TerritoryFilterModalInnerContainer>
      </Modal>
    </TerritoryFilterModalMainContainer>
  );
};

export default TerritoryFilterModal;

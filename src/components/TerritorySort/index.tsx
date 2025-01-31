import React, {useEffect, useState} from 'react';
import {Animated, Easing, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Props} from './interface';
import {mainBackgroundColor} from '../../constants';
import {Divider} from 'react-native-paper';
import {
  Container,
  FilterOption,
  CloseButton,
  CloseButtonText,
  FilterButton,
} from './styled';

const TerritorySort = ({
  visible,
  setVisible,
  setPage,
  setFilterKey,
  setIsTarget,
  onModalHide,
  defValue,
  headerHeight,
  filterKey,
  targetKey,
  containerStyle,
}: Props) => {
  const Sort_options = [
    {option: 'Manual', key: 2},
    {option: 'Automatic', key: 1},
    {option: 'Target'},
    {option: 'Show All', key: 0},
  ];
  const [normalClose, setNormalClose] = useState(true);
  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    if (!normalClose && !visible) {
      Animated.timing(defValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }).start(() => {
        onModalHide();
      });
    }
    if (visible) {
      Animated.timing(defValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.timing(defValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.linear),
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const isOptionSelected = (item: any) => {
    if (item.key === filterKey && targetKey === 0) {
      return true;
    } else if (item.key === undefined && targetKey === 1) {
      return true;
    }
  };

  return (
    <>
      <Modal
        isVisible={visible}
        style={{flex: 1, padding: 0, margin: 0}}
        animationIn="fadeIn">
        <Container
          style={{
            top: headerHeight,
            transform: [
              // {
              //   translateX: defValue.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: [0, screenWidth],
              //   }),
              // },
            ],
            ...containerStyle,
          }}>
          {Sort_options.map((item, index) => (
            <React.Fragment key={index.toString()}>
              <FilterButton
                onPress={() => {
                  if (item?.key === undefined) {
                    setIsTarget(1);
                    setFilterKey(0);
                    setPage(1);
                    closeModal();
                    setNormalClose(false);
                    return;
                  }
                  setNormalClose(false);
                  setIsTarget(0);
                  setFilterKey(item.key);
                  setPage(1);
                  closeModal();
                }}
                disabled={isOptionSelected(item)}>
                <FilterOption
                  style={{
                    color: isOptionSelected(item)
                      ? 'grey'
                      : mainBackgroundColor,
                  }}>
                  {item.option}
                </FilterOption>
              </FilterButton>
              <Divider />
            </React.Fragment>
          ))}
          <CloseButton
            onPress={() => {
              closeModal();
              setNormalClose(true);
            }}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </Container>
      </Modal>
    </>
  );
};

export default TerritorySort;

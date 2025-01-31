import React, {useState, useEffect} from 'react';
import {Modal, Pressable, LayoutAnimation, Dimensions, Platform} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Title } from 'react-native-paper';
import CrossIcon from '../../assets/Svg/CrossIcon';
import { FilterContainer, CrossIconContainer, DropdownContainer, FloatingLabel, SelectedTextStyle, PlaceHolderStyle, ApplyFilterButton, ButtonText, CancelButton } from './styled';
import { HEIGHT, SPACING, isTablet } from '../../constants';

const FilterButton = ({isVisible, onClose, setIsOpen, onApply, surbs}) => {
  const [dynamicWidth, setDynamicWidth] = useState(Dimensions.get('screen').width);
  
  

  const [filters, setFilters] = useState({
    state: 'state',
    areaBlock: 'area',
    bookingStatus: 'booking Status',
    automaticManual: 'automatic',
    meetingType: 'meeting type',
    customerType: 'customer Type',
  });

  const [isFocus, setIsFocus] = useState({});

  const handleChange = (key, value) => {
    setFilters(prev => ({...prev, [key]: value}));
  };

  const staticDropdownOptions = {
    bookingStatus: [
      {label: 'Booked', value: 'Booked'},
      {label: 'Pending', value: 'Pending'},
    ],
    automaticManual: [
      {label: 'Automatic', value: 'Automatic'},
      {label: 'Manual', value: 'Manual'},
    ],
    meetingType: [
      {label: 'Automatic', value: 'Automatic'},
      {label: 'Manual', value: 'Manual'},
    ],
    customerType: [
      {label: 'All', value: 'All'},
      {label: 'Type A', value: 'A'},
      {label: 'Type B', value: 'B'},
    ],
  };

  useEffect(() => {
    const handleDimensionChange = ({window}) => {
      setDynamicWidth(window.width);
    };
    const subscription = Dimensions.addEventListener('change', handleDimensionChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  const sortedStates = surbs?.states?.slice().sort((a, b) => a.name.localeCompare(b.name));
  const sortedBlocks = surbs?.blocks?.slice().sort((a, b) => a.name.localeCompare(b.name));
  console.log('in the sortedBlocks', sortedBlocks);
  console.log('in the sortedStates', sortedStates);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      style={{flex: 1}}
    >
      <Pressable
        style={{
          height: Platform.OS === 'ios' ?Platform.isPad ? '10%': '25%': isTablet? '10%': '20%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={onClose}
      />
      <FilterContainer style={{flex: 1,width: dynamicWidth, paddingHorizontal: SPACING.h20}}>
        <CrossIconContainer>
          <Title>Filter Results</Title>
          <Pressable onPress={() => setIsOpen(false)}>
            <CrossIcon />
          </Pressable>
        </CrossIconContainer>
        {Object.keys(filters).map(key => (
          <DropdownContainer key={key} style={{ width: dynamicWidth }}>
            <FloatingLabel>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </FloatingLabel>
            <Dropdown
              data={
                key === 'state'
                  ? sortedStates.map(state => ({
                      label: state?.name,
                      value: state?.name,
                    }))
                  : key === 'areaBlock'
                  ? sortedBlocks.map(block => ({
                      label: block?.name,
                      value: block?.name,
                    }))
                  : staticDropdownOptions[key]
              }
              labelField="label"
              valueField="value"
              placeholder={filters[key].charAt(0).toUpperCase() + filters[key].slice(1).toLowerCase()}
              value={filters[key]}
              onChange={item => handleChange(key, item.value)}
              onFocus={() => setIsFocus(prev => ({...prev, [key]: true}))}
              onBlur={() => setIsFocus(prev => ({...prev, [key]: false}))}
              style={[
                {
                  height: HEIGHT.h35,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: SPACING.h5,
                  paddingHorizontal: SPACING.h10,
                  justifyContent: 'center',
                  width: '90%', // Set Dropdown to full width
                },
                isFocus[key] && {borderColor: 'blue'},
              ]}
              selectedTextStyle={SelectedTextStyle}
              placeholderStyle={PlaceHolderStyle}
              itemTextStyle={SelectedTextStyle}
            />
          </DropdownContainer>
        ))}
        <ApplyFilterButton
          onPress={() => {
            const selectedState = surbs.states.find((state) => state.name === filters.state);
            const selectedAreaBlock = surbs.blocks.find((block) => block.name === filters.areaBlock);
            onApply({
              selectedState: selectedState,
      selectedAreaBlock: selectedAreaBlock,
            });
            onClose();
          }}
        >
          <ButtonText>Apply Filter</ButtonText>
        </ApplyFilterButton>
        <CancelButton onPress={onClose} > 
        <ButtonText>Cancel</ButtonText>
        </CancelButton>
      </FilterContainer>
    </Modal>
  );
};

export default FilterButton;
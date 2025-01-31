import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Pressable} from 'react-native';
import CrossIcon from '../../assets/Svg/CrossIcon';
import {
  FloatingLabel,
  StyledDropdown,
  SelectedTextStyle,
  PlaceholderStyle,
  ItemTextStyle,
  Container,
  UpperPressable,
  FilterContainer,
  CrossIconContainer,
  ApplyButton,
  ButtonText,
  CancelButton,
  CancelButtonText,
  LowerPressable,
  DropdownContainer,
  Title,
} from './styled';

const bookedByOptions = [
  {label: 'Free Slot', value: 'Free Slot'},
  {label: 'Other Visitor', value: 'Other Visitor'},
];

const topicOptions = [
  {label: 'CPD', value: 'CPD'},
  {label: 'Practice', value: 'Practice'},
];

const ClinicFilter = ({isVisible, onClose, setIsOpen, onApply}) => {
  const [clinicFilter, setClinicFilters] = useState({
    bookedBy: null,
    topic: null,
  });
  const [isFocus, setIsFocus] = useState({});

  const handleChange = (key, value) => {
    setClinicFilters(prev => ({...prev, [key]: value}));
  };

  const renderDropdown = (label, value, key, options) => (
    <DropdownContainer>
      <FloatingLabel>{label}</FloatingLabel>
      <StyledDropdown
        data={options}
        labelField="label"
        valueField="value"
        placeholder={!isFocus[key] && !value ? label : '...'}
        value={value}
        onChange={item => handleChange(key, item.value)}
        onFocus={() => setIsFocus(prev => ({...prev, [key]: true}))}
        onBlur={() => setIsFocus(prev => ({...prev, [key]: false}))}
        style={[isFocus[key] && {borderColor: 'blue'}]}
        selectedTextStyle={SelectedTextStyle}
        placeholderStyle={PlaceholderStyle}
        itemTextStyle={ItemTextStyle}
      />
    </DropdownContainer>
  );

  return (
    <Container>
      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={onClose}>
        <UpperPressable onPress={onClose} />
        <FilterContainer>
          <CrossIconContainer>
            <Title>Filter Results</Title>
            <Pressable onPress={() => setIsOpen(false)}>
              <CrossIcon />
            </Pressable>
          </CrossIconContainer>
          {renderDropdown(
            'Meeting Type',
            clinicFilter.bookedBy,
            'bookedBy',
            bookedByOptions,
          )}
          {renderDropdown(
            'Availability',
            clinicFilter.topic,
            'topic',
            topicOptions,
          )}

          <ApplyButton
            onPress={() => {
              onApply(clinicFilter);
              onClose();
            }}>
            <ButtonText>Apply Filter</ButtonText>
          </ApplyButton>

          <CancelButton onPress={onClose}>
            <CancelButtonText>Cancel</CancelButtonText>
          </CancelButton>
        </FilterContainer>
      </Modal>
      <LowerPressable
        onPress={() => {
          onClose();
          setClinicFilters({bookedBy: null, topic: null});
        }}
      />
    </Container>
  );
};

export default ClinicFilter;

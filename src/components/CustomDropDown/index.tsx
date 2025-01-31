import React, {useState} from 'react';
import {FlatList, LayoutAnimation, Linking, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {isTablet, mainBackgroundColor, WIDTH} from '../../constants';
import {
  Container,
  DropdownButton,
  IconContainer,
  ModalContainer,
  Option,
  OptionText,
  SelectedText,
} from './styled';

const CustomDropdown = ({
  options,
  placeholder,
  data,
  setShowModal,
  setTitle,
  setShownotification
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const handleSelect = option => {
    console.log("In the handleSelect", option.label);
    setSelectedOption(option);
    if (option.label === 'View Customer Schedules') {
      setTitle(option.title);
      setShowModal(true);
    }else if (option.value === 'option1' || option.value === 'option2' ) {
      const phoneNumber = option.label;
      Linking.openURL(`tel:${phoneNumber}`);
    }else if (option.label === 'Edit Notification') {
      setShownotification(true);
      console.log("In the Edit notification", option)
    } else if (option.label === 'Remove Territory') {
    
      
    }
    
  };

  return (
    <Container>
      <DropdownButton
        mainBackgroundColor={mainBackgroundColor}
        onPress={toggleDropdown} 
      >
        <SelectedText>
          {placeholder}
        </SelectedText>
        <Icon
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={24}
          color={mainBackgroundColor}
        />
      </DropdownButton>
      {isOpen && (
        <ModalContainer>
          <FlatList
            data={options}
            keyExtractor={(item, index) => item.value || index.toString()} 
            renderItem={({item, index}) => (
              <Option
                key={index}
                isLast={index === options.length - 1}
                onPress={() => handleSelect(item)}>
                <IconContainer>
                  <item.Icon />
                </IconContainer>
                <OptionText isRed={item.color} width={WIDTH.w150}>
                  {item.label}
                </OptionText>
              </Option>
            )}
          />
        </ModalContainer>
      )}
    </Container>
  );
};

export default CustomDropdown;

import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { commonBorderColor, FONT_SIZE, isTablet, SPACING } from '../../constants';
import { useSelector } from 'react-redux';
import combineReducer from '../../reducers';

type Props = {
  placeholder: string
  dropDownDirection: any,
}

const TeamsPicker:React.FC<Props> = ({placeholder, dropDownDirection}) => {
  const teams = useSelector((state:any) => state.getTeamsReducer.teams);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<typeof items>();
  const [items, setItems] = useState<typeof teams>([]);

  useEffect(() => {
     const items = () => {
      const listOfTeams = teams?.map(item => {
        const myObject: any = new Object();
        myObject.label = item.name;
        myObject.value = item.orgId;
        return myObject;
      });
      return listOfTeams;
    };
    setItems(items());
  }, [teams])


  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      dropDownContainerStyle={{
        backgroundColor: '#F6F6F6',
        borderColor: commonBorderColor
      }}
      dropDownDirection={dropDownDirection}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      style={{
        backgroundColor: '#F6F6F6',
        borderColor: commonBorderColor,
        marginVertical: SPACING.h10
      }}
      textStyle={{
        fontSize: Platform.OS === 'ios' ? Platform.isPad ? FONT_SIZE.f9 : FONT_SIZE.f13 : isTablet ? FONT_SIZE.f9 : FONT_SIZE.f13,
        color: 'black',
      }}
    />
  )
}

export default TeamsPicker;
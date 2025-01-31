import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonBorderColor, FONT_SIZE, isTablet, SPACING } from '../../constants';
// import { getTeams } from '../../actions/getTeams';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import combineReducer from '../../reducers';
import getTeams from '../../apiActions/RegisterScreen/getTeams';

type Props = {
  placeholder: string
  dropDownDirection: any,
  companies?:{name: string, orgId: string}[]
}

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const CompaniesPicker:React.FC<Props> = ({placeholder, dropDownDirection, companies}) => {
  const dispatch = useDispatch<TypedDispatch>();
  const listOfCompanies = companies?.map(item => {
    const myObject: any = new Object();
    myObject.label = item.name;
    myObject.value = item.orgId;
    return myObject;
  })

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<typeof items>();
  const [items, setItems] = useState<null | any>(listOfCompanies);

  useEffect(() => {
    (async () =>  {
      if (value) {
        dispatch(getTeams({orgId: value}))
      } else {
        return null;
      }
    })();
  }, [value])


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

export default CompaniesPicker;
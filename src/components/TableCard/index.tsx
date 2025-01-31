import React from 'react';
import {View} from 'react-native';
import {Colors, HEIGHT, SPACING} from '../../constants';
import {
  Card,
  Innercontainer,
  Label,
  Row,
  ValueText,
  StatusText,
} from './styled';

const AppointmentTable = ({item}) => {
  return (
    <Card>
      <Innercontainer>
        <Row>
          <Label>Day</Label>
          <View
            style={[
              {
                height: '120%',
                width: 1,
                backgroundColor: '#D1D1D6',
                marginHorizontal: SPACING.h10,
              },
            ]}
          />
          <View style={{flex: 2, justifyContent: 'flex-start'}}>
            <ValueText color="#646464">{item.app_date_formatted}</ValueText>
            <ValueText color={Colors.BLACK_TEXT}>02 September, 2024</ValueText>
          </View>
        </Row>
        <Row>
          <Label>Location</Label>
          <View
            style={[
              {
                height: '100%',
                width: 1,
                backgroundColor: '#D1D1D6',
                marginHorizontal: SPACING.h10,
              },
            ]}
          />
          <View style={{flex: 2, justifyContent: 'flex-start'}}>
            <ValueText color="#0000FF">Urban County</ValueText>
            <ValueText color="#00000099">Auburn-Blacksville, NSW</ValueText>
          </View>
        </Row>
        <Row>
          <Label>With</Label>
          <View
            style={[
              {
                height: '100%',
                width: 1,
                backgroundColor: '#D1D1D6',
                marginHorizontal: HEIGHT.h10,
              },
            ]}
          />
          <View style={{flex: 2, justifyContent: 'flex-start'}}>
            <ValueText
              color={Colors.BLACK_TEXT}
              numberOfLines={1}
              ellipsizeMode="tail">
              AA Chestwick Road Medical Superheroes & Occasional Ultravillains
              who are too OP to refuse treatment to.
            </ValueText>
            <ValueText color={Colors.BLACK_TEXT}>
              {'\u2022 Saul Goodma'}
            </ValueText>
          </View>
        </Row>
        <Row style={{borderBottomWidth: 0}}>
          <Label>Status</Label>
          <View
            style={[
              {
                height: '150%',
                width: 1,
                backgroundColor: '#D1D1D6',
                marginHorizontal: SPACING.h10,
              },
            ]}
          />
          <StatusText
            color={item.status === 'NO Conflict' ? '#2E7D32' : 'black'}>
            {item.status}
          </StatusText>
        </Row>
      </Innercontainer>
    </Card>
  );
};

export default AppointmentTable;

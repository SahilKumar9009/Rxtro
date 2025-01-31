import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import {HEIGHT, WIDTH} from '../../constants';

const Table = styled.View`
  margin: 0 14px;
  border: 1px;
  border-color: #121010;
  overflow: hidden;
`;

const Row = styled.View`
  flex-direction: row;
  border-color: #121010;
  background-color: white;
  height: ${HEIGHT.h35}px;
`;

const Cell = styled.Text`
   width: 15%;
  align-items: center;
  justify-content: center;
  padding: 8px;
  text-align: center;
  color: black;
  font-size: 14px;
`;

const ActionButton = styled(Pressable)`
  width: 45%;
  height: ${HEIGHT.h20}px;
  flex-direction: row;
  background-color: #293b8f;
  justify-content: center;
  align-items: center;
  margin-right: -3px;
  border-radius: 4px;
`;

const ActionButtonText = styled.Text`
  color: white;
  text-align: center;
`;

const Icon = styled.View`
  margin-right: 1px;
`;

const Line = styled.View`
  width: 1px;
  height: 180px;
  background-color: #121010;
`;

export {Table, Row, Cell, ActionButton, ActionButtonText, Icon, Line};

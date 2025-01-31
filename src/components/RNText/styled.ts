import {Text, Platform} from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled(Text)`
  font-family: ${Platform.OS === 'android' ? 'Roboto' : 'System'};
  font-size: ${Platform.OS === 'ios' && Platform.isPad ? 12 : 14}px;
  color: #333;
`;

export {StyledText};

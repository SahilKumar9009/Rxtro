import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12.0012 20C16.4195 20 20.0012 16.4183 20.0012 12C20.0012 7.58172 16.4195 4 12.0012 4C7.5829 4 4.00117 7.58172 4.00117 12C4.00117 16.4183 7.5829 20 12.0012 20Z"
      fill="white"
    />
    <Path
      d="M12.0015 8.44427V15.5554M15.5571 11.9998H8.44597"
      stroke="#2B3990"
      strokeWidth={1.77778}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;

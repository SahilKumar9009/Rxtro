import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={13} cy={13} r={13} fill="#E4E4E6" />
    <Path
      d="M18.3528 7.64697L8.41162 17.5881L18.3528 7.64697ZM18.3528 17.5881L8.41162 7.64697L18.3528 17.5881Z"
      fill="#494949"
    />
    <Path
      d="M18.3528 7.64697L8.41162 17.5881M18.3528 17.5881L8.41162 7.64697"
      stroke="#6A6A6A"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;

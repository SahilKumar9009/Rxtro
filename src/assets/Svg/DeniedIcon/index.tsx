import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
      fill="#E53935"
      stroke="#E53935"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.20864 8.20864C8.48682 7.93045 8.93784 7.93045 9.21602 8.20864L12 10.9926L14.784 8.20864C15.0622 7.93045 15.5132 7.93045 15.7914 8.20864C16.0695 8.48682 16.0695 8.93784 15.7914 9.21602L13.0074 12L15.7914 14.784C16.0695 15.0622 16.0695 15.5132 15.7914 15.7914C15.5132 16.0695 15.0622 16.0695 14.784 15.7914L12 13.0074L9.21602 15.7914C8.93784 16.0695 8.48682 16.0695 8.20864 15.7914C7.93045 15.5132 7.93045 15.0622 8.20864 14.784L10.9926 12L8.20864 9.21602C7.93045 8.93784 7.93045 8.48682 8.20864 8.20864Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;

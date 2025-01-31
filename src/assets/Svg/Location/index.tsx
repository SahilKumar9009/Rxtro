import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 37.019 51.107"
      {...props}>
      <Path
        data-name="Path 187573"
        d="M89.082 0a18.53 18.53 0 00-18.509 18.509c0 12.666 16.564 31.26 17.269 32.046a1.667 1.667 0 002.48 0c.705-.785 17.269-19.38 17.269-32.046A18.53 18.53 0 0089.082 0zm0 27.822a9.312 9.312 0 119.312-9.312 9.323 9.323 0 01-9.312 9.312z"
        fill={mainBackgroundColor}
        transform="translate(-70.573)"
      />
    </Svg>
  );
}

export default SvgComponent;

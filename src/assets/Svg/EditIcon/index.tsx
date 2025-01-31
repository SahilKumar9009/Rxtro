import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 72.973 72.618"
      {...props}>
      <Path
        data-name="Path 187578"
        d="M45.377 13.408l14.844 14.844-37.575 37.575L7.81 50.983zm26.108-3.58l-6.62-6.62a6.569 6.569 0 00-9.28 0l-6.341 6.341 14.845 14.844 7.4-7.4a5.061 5.061 0 000-7.169zM.042 71.848a1.689 1.689 0 002.043 2.01l16.542-4.011L3.791 55z"
        fill={mainBackgroundColor}
        transform="translate(-.001 -1.289)"
      />
    </Svg>
  );
}

export default SvgComponent;

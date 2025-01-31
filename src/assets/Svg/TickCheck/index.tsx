import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      data-name="Group 225296"
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 44.975 44.975"
      {...props}>
      <Path
        data-name="Path 187579"
        d="M22.487 0a22.487 22.487 0 1022.488 22.487A22.514 22.514 0 0022.487 0zm12.569 16.57L20.684 30.829a2.211 2.211 0 01-3.1.056l-7.608-6.932a2.286 2.286 0 01-.169-3.153 2.23 2.23 0 013.156-.113l6.03 5.523 12.85-12.85a2.272 2.272 0 113.212 3.212z"
        fill={mainBackgroundColor}
      />
    </Svg>
  );
}

export default SvgComponent;

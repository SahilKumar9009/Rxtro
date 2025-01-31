import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {HEIGHT, WIDTH} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 58.192 58.191"
      {...props}>
      <Path
        data-name="Path 187580"
        d="M34.427 29.232l22.66-22.66a3.77 3.77 0 10-5.331-5.331L29.1 23.9 6.437 1.241a3.77 3.77 0 00-5.331 5.331l22.659 22.66-22.659 22.66a3.77 3.77 0 105.331 5.331L29.1 34.563l22.66 22.66a3.77 3.77 0 005.331-5.331zm0 0"
        fill="#fe4444"
        transform="translate(0 -.136)"
      />
    </Svg>
  );
}

export default SvgComponent;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 32.152 32.152"
      {...props}>
      <Path
        data-name="Path 187575"
        d="M29.572 21.1a18.255 18.255 0 01-5.733-.913 2.62 2.62 0 00-2.549.537l-3.615 2.729a19.979 19.979 0 01-8.983-8.981l2.649-3.521a2.6 2.6 0 00.639-2.633 18.283 18.283 0 01-.917-5.742A2.583 2.583 0 008.485 0H2.58A2.583 2.583 0 000 2.58a29.605 29.605 0 0029.572 29.572 2.583 2.583 0 002.58-2.58v-5.888a2.583 2.583 0 00-2.58-2.584z"
        fill={mainBackgroundColor}
      />
    </Svg>
  );
}

export default SvgComponent;

import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants'; // Ensure this path is correct

const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 58.192 58.191" {...props}>
    <Path
      d="M10 0h6v4h18V0h6v4h8v44H2V4h8V0Zm2 2v6h2V2h-2Zm24 0v6h2V2h-2ZM4 6v7h42V6h-6v4h-6V6H16v4h-6V6H4Zm0 9v31h42V15H4Z"
      fill={mainBackgroundColor}
    />
    <Path
      d="M10 19h30v23H10V19Zm2 2v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Zm-21 7v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Zm-21 7v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Zm7 0v5h5v-5h-5Z"
      fill={mainBackgroundColor}
    />
  </Svg>
);

export default SvgComponent;

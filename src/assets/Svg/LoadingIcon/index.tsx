import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 18 20.002"
      {...props}>
      <Path
        data-name="Path 187574"
        d="M7.03 2.757a1 1 0 011.213-.727l4 1a1 1 0 01.59 1.525l-2 3a1 1 0 11-1.665-1.11l.755-1.132a7 7 0 00-2.735 11.77 1 1 0 11-1.376 1.453A9 9 0 017.875 4l-.118-.03a1 1 0 01-.727-1.213zm10.092 3.017a1 1 0 011.414.038 9 9 0 01-2.6 14.286 1 1 0 01-.707 1.864l-3.5-1a1 1 0 01-.557-1.517l2-3a1 1 0 111.664 1.11l-.755 1.132a7 7 0 003.006-11.5 1 1 0 01.035-1.413z"
        fill={mainBackgroundColor}
        fillRule="evenodd"
        transform="translate(-3 -2)"
      />
    </Svg>
  );
}

export default SvgComponent;

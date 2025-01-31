import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {mainBackgroundColor} from '../../../constants';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      style={{marginEnd: 5, marginStart: 8}}
      viewBox="0 0 51.789 43.932"
      {...props}>
      <G data-name="multiple user">
        <Path
          data-name="Path 187572"
          d="M44.313 62.558h-4.005a10.418 10.418 0 01.631 3.581v15.137a4.464 4.464 0 01-.257 1.5H47.3a4.491 4.491 0 004.486-4.486v-8.256a7.484 7.484 0 00-7.473-7.476zM10.85 66.139a10.418 10.418 0 01.631-3.581H7.476A7.484 7.484 0 000 70.034v8.252a4.491 4.491 0 004.486 4.486h6.621a4.465 4.465 0 01-.257-1.5zm19.623-7.476h-9.157a7.484 7.484 0 00-7.476 7.476v15.137a1.5 1.5 0 001.5 1.5h21.113a1.5 1.5 0 001.5-1.5V66.139a7.484 7.484 0 00-7.48-7.476zM25.894 38.84a8.989 8.989 0 108.991 8.991 9 9 0 00-8.991-8.991zm-15.787 8.38a6.721 6.721 0 106.724 6.724 6.731 6.731 0 00-6.724-6.724zm31.575 0a6.724 6.724 0 106.724 6.724 6.731 6.731 0 00-6.724-6.724z"
          transform="translate(-116.946 -138.043) translate(116.946 99.203)"
          fill={mainBackgroundColor}
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;

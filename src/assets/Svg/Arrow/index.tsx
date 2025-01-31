import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({
  color,
  rotation,
  style,
  onPress,
  ...props
}: {
  color?: string;
  rotation?: string;
  style?: any;
  onPress?: () => void;
}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={13}
      height={10}
      viewBox="0 0 46.001 24.628"
      {...props}
      style={[
        style,
        {transform: [{rotate: rotation === 'downward' ? '180deg' : '0deg'}]},
      ]}
      onPress={onPress}>
      <Path
        data-name="Path 187571"
        d="M54.921 20.3a1 1 0 00-.92-.611H10a1 1 0 00-.718 1.7l22 22.627a1 1 0 001.434 0l22-22.628a1 1 0 00.2-1.086z"
        fill={color ? color : '#293B8F'}
        transform="translate(-8.998 -19.686)"
      />
    </Svg>
  );
}

export default SvgComponent;

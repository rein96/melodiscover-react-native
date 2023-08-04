import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function DiscoverIcon(props: SvgProps) {
  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24"
      fill={props.color}
      width={24}
      height={24}
      {...props}>
      <Path
        d="M15.97 17.031a8.482 8.482 0 01-5.461 1.985C5.812 19.016 2 15.204 2 10.508S5.812 2 10.509 2c4.695 0 8.508 3.812 8.508 8.508a8.476 8.476 0 01-1.985 5.461l4.749 4.75a.748.748 0 01.219.531c0 .587-.537.75-.75.75a.748.748 0 01-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default DiscoverIcon;

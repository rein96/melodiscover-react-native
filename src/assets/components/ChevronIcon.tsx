import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import useTheme from '../../theme/useTheme';

type ChevronIconProps = SvgProps & {
  direction?: ChevronDirection;
};

type ChevronDirection = 'down' | 'up' | 'left' | 'right';

const getChevronDegree = (type: ChevronDirection) => {
  switch (type) {
    case 'down':
      return '90deg';
    case 'left':
      return '180deg';
    case 'up':
      return '270deg';
    default:
      return '0deg';
  }
};

const ChevronIcon = ({direction = 'right', ...props}: ChevronIconProps) => {
  const {
    theme: {colors},
  } = useTheme();

  const rotate = getChevronDegree(direction);

  return (
    <Svg
      height={14}
      transform={[{rotate}]}
      viewBox="0 0 9 14"
      width={9}
      {...props}>
      <Path
        d="M.21.43A.875.875 0 011.35.265l.094.072 7 6a.875.875 0 01.087 1.243l-.087.085-7 6A.875.875 0 01.221 12.42l.085-.083L6.53 7 .306 1.664A.875.875 0 01.139.526L.211.43z"
        fill={props.color ?? colors.inkPrimary}
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default ChevronIcon;

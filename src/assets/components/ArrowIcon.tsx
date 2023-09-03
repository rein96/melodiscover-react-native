import Svg, {Path, SvgProps} from 'react-native-svg';
import useTheme from '../../theme/useTheme';

type ArrowIconProps = SvgProps & {
  direction?: ArrowDirection;
};

type ArrowDirection = 'down' | 'up' | 'left' | 'right';

const getDegree = (type: ArrowDirection) => {
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

function ArrowIcon({direction = 'right', ...props}: ArrowIconProps) {
  const {
    theme: {colors},
  } = useTheme();

  const rotate = getDegree(direction);

  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      transform={[{rotate}]}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M14.523 18.787l6.255-6.26a.747.747 0 000-1.06l-6.255-6.258a.75.75 0 00-1.056.004.746.746 0 00-.004 1.056l4.978 4.978H3.749a.75.75 0 000 1.5h14.692l-4.979 4.979a.746.746 0 00.006 1.054.752.752 0 00.533.222c.19 0 .378-.072.522-.215z"
        fill={props.color ?? colors.inkPrimary}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default ArrowIcon;

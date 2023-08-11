import Svg, {Path, SvgProps} from 'react-native-svg';

function PlayIcon(props: SvgProps) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path d="M3 22V2l18 10L3 22z" fill={props.color} />
    </Svg>
  );
}

export default PlayIcon;

import Svg, {Path, SvgProps} from 'react-native-svg';

function PauseIcon(props: SvgProps) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path d="M11 22H7V2h4v20zm6-20h-4v20h4V2z" fill={props.color} />
    </Svg>
  );
}

export default PauseIcon;

import Svg, {Path, SvgProps} from 'react-native-svg';

function ConfigurationIcon(props: SvgProps) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M17 8a1.001 1.001 0 11-1 1c0-.551.448-1 1-1zm0-2a3 3 0 100 6 3 3 0 000-6zM7 12a3 3 0 100 6 3 3 0 000-6zm10-8c.343 0 .677.035 1 .101V2a1 1 0 10-2 0v2.101A4.988 4.988 0 0117 4zM7 10c.343 0 .677.035 1 .101V2a1 1 0 10-2 0v8.101A4.988 4.988 0 017 10zm10 4c-.343 0-.677-.035-1-.101V22a1 1 0 102 0v-8.101A4.988 4.988 0 0117 14zM7 20c-.343 0-.677-.035-1-.101V22a1 1 0 102 0v-2.101A4.988 4.988 0 017 20z"
        fill={props.color}
      />
    </Svg>
  );
}

export default ConfigurationIcon;

import type {SvgProps} from 'react-native-svg';
import Svg, {Circle, G, Path} from 'react-native-svg';

const CircleSuccessIcon = (props: SvgProps) => {
  return (
    <Svg height={16} viewBox="0 0 16 16" width={16} {...props}>
      <G fill="none" fillRule="evenodd" transform="translate(.667 .667)">
        <Circle cx={7.333} cy={7.333} fill="#1CCB21" r={7.333} />
        <Path
          d="M10.404 4.613a.724.724 0 011.015-.053.707.707 0 01.11.935l-.056.07-4.225 4.65c-.514.544-1.358.6-1.938.148l-.094-.08-2.321-2.148A.707.707 0 012.86 7.13a.724.724 0 01.947-.09l.07.056 2.32 2.148 4.207-4.63z"
          fill="#FFF"
        />
      </G>
    </Svg>
  );
};

export default CircleSuccessIcon;

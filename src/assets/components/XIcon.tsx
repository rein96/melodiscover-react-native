import Svg, {Path, SvgProps} from 'react-native-svg';

function XIcon(props: SvgProps) {
  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M12 10.93l5.719-5.72a.749.749 0 111.062 1.062l-5.72 5.719 5.719 5.719a.75.75 0 11-1.061 1.062L12 13.053l-5.719 5.719A.75.75 0 015.22 17.71l5.719-5.719-5.72-5.719A.752.752 0 016.281 5.21z"
        fill={props.color}
      />
    </Svg>
  );
}

export default XIcon;

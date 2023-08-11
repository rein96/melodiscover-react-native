import Svg, {Path, SvgProps} from 'react-native-svg';

function HeartPlusIcon(props: SvgProps) {
  return (
    <Svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      viewBox="0 0 24 24"
      {...props}>
      <Path
        d="M14.123 19.336l-1.426 1.381a.996.996 0 01-1.394 0C6.345 15.904 2 11.902 2 8.177c0-5.659 7.376-6.978 10-2.461 2.604-4.483 10-3.217 10 2.461 0 .68-.144 1.369-.41 2.07a5.885 5.885 0 00-4.09-1.648 5.903 5.903 0 00-5.9 5.9c0 2 .998 3.77 2.523 4.837zM17.501 10C20.081 10 22 12.107 22 14.499c0 2.58-2.105 4.499-4.499 4.499-2.586 0-4.5-2.112-4.5-4.499 0-2.406 1.934-4.499 4.5-4.499zm.5 3.999v-1.5c0-.265-.235-.5-.5-.5-.266 0-.5.235-.5.5v1.5h-1.5c-.266 0-.5.235-.5.5s.234.5.5.5h1.5v1.5c0 .265.234.5.5.5.265 0 .5-.235.5-.5v-1.5H19.5c.266 0 .5-.235.5-.5s-.234-.5-.5-.5z"
        fill={props.color}
        fillRule="nonzero"
      />
    </Svg>
  );
}

export default HeartPlusIcon;

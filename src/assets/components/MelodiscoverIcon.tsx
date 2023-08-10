import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps,
} from 'react-native-svg';

function MelodiscoverIcon(props: SvgProps) {
  return (
    <Svg fill="none" height={160} viewBox="0 0 512 512" width={160} {...props}>
      <G clipPath="url(#clip0_99_72)">
        <Path
          clipRule="evenodd"
          d="M469.333 277.333C468.757 160.064 373.397 64 256 64 138.603 64 43.243 160.064 42.667 277.333H96c17.664 0 32 14.336 32 32v149.334c0 17.664-14.336 32-32 32H32c-17.664 0-32-14.336-32-32V277.333c.576-140.821 115.072-256 256-256s255.424 115.179 256 256v181.334c0 17.664-14.336 32-32 32h-64c-17.664 0-32-14.336-32-32V309.333c0-17.664 14.336-32 32-32h53.333z"
          fill="url(#paint0_linear_99_72)"
          fillRule="evenodd"
        />
        <Path
          d="M154.182 292.818h48.545L254 417.909h2.182l51.273-125.091H356V479h-38.182V357.818h-1.545l-48.182 120.273h-26l-48.182-120.727h-1.545V479h-38.182V292.818z"
          fill="#E3E1E1"
        />
      </G>
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_99_72"
          x1={256}
          x2={256}
          y1={21.3334}
          y2={490.667}>
          <Stop stopColor="#1C51EF" />
          <Stop offset={1} stopColor="#1C51EF" stopOpacity={0.6} />
        </LinearGradient>
        <ClipPath id="clip0_99_72">
          <Path d="M0 0H512V512H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default MelodiscoverIcon;

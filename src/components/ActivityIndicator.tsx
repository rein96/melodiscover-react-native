import {ActivityIndicator as RNActivityIndicator} from 'react-native';
import {ActivityIndicatorProps} from 'react-native';
import useTheme from '../theme/useTheme';

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const {
    theme: {colors},
  } = useTheme();

  return (
    <RNActivityIndicator
      color={colors.darkPrimary}
      size={props.size || 'large'}
    />
  );
};

export default ActivityIndicator;

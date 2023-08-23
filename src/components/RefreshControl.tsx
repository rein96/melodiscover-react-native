import {
  RefreshControl as RNRefreshControl,
  RefreshControlProps,
} from 'react-native';
import useTheme from '../theme/useTheme';

const RefreshControl = (props: RefreshControlProps) => {
  const {
    theme: {colors},
  } = useTheme();
  return (
    <RNRefreshControl
      {...props}
      tintColor={colors.darkPrimary}
      title="Pull to refresh"
      titleColor={colors.darkPrimary}
    />
  );
};

export default RefreshControl;

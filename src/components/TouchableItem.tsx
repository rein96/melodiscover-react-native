import type {BoxProps} from '@shopify/restyle';
import {composeRestyleFunctions, useRestyle} from '@shopify/restyle';
import type {PropsWithChildren} from 'react';
import React, {useMemo} from 'react';
import {Platform, Pressable} from 'react-native';
import type {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';

import Box from './Box';
import {Theme} from '../theme/theme';
import useTheme from '../theme/useTheme';
import {boxRestyleFunctions} from '../libs/restyle/restyle';

type RestyleProps = BoxProps<Theme>;

export type TouchableItemProps = RestyleProps &
  Omit<ViewProps, keyof RestyleProps> & {
    disabled?: boolean;
    onPress?: () => void;
  };

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>(
  boxRestyleFunctions,
);

const TouchableItem = ({
  children,
  disabled,
  onPress,
  ...rest
}: PropsWithChildren<TouchableItemProps>) => {
  const props = useRestyle<Theme, RestyleProps, TouchableItemProps>(
    restyleFunctions,
    rest,
  );
  const {
    theme: {colors},
  } = useTheme();

  const style = useMemo(() => {
    return Platform.select({
      ios: ({pressed}: {pressed: boolean}) => ({
        opacity: pressed ? 0.5 : 1,
      }),
    });
  }, []);

  const handlePress = React.useCallback(() => {
    if (onPress) {
      requestAnimationFrame(onPress);
    }
  }, [onPress]);

  return (
    <Pressable
      android_ripple={{
        color: colors.inkTertiary,
        foreground: true,
      }}
      disabled={disabled}
      onPress={handlePress}
      style={style}>
      <Box {...props}>{children}</Box>
    </Pressable>
  );
};

export default TouchableItem;

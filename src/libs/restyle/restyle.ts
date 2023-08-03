/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import type {BaseTheme, ResponsiveValue} from '@shopify/restyle';
import {
  backgroundColor,
  backgroundColorShorthand,
  border,
  createRestyleComponent,
  layout,
  opacity,
  position,
  shadow,
  spacingShorthand,
  visible,
} from '@shopify/restyle';
import type React from 'react';
import {View} from 'react-native';

import type {
  BackgroundColorProps,
  BorderProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  ShadowProps,
  SpacingProps,
  VisibleProps,
} from './restyle.types';
import {Theme} from '../../theme/theme';

export type ResponsiveProps<Theme extends BaseTheme, Props> = {
  [P in keyof Props]?: ResponsiveValue<Props[P], Theme>;
};
export type BoxStyleProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  BorderProps &
  ShadowProps &
  PositionProps;
export const boxRestyleFunctions: any[] = [
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  visible,
  layout,
  spacingShorthand,
  border,
  shadow,
  position,
];

export function createBox<
  Component extends React.ComponentType<any> = typeof View,
>(BaseComponent?: Component) {
  return createRestyleComponent<
    BoxStyleProps &
      Omit<
        React.ComponentProps<Component> & {children?: React.ReactNode},
        keyof BoxStyleProps
      > & {
        children?: React.ReactNode;
      },
    Theme
  >(boxRestyleFunctions, BaseComponent ?? View);
}

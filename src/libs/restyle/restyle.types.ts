import type * as restyled from '@shopify/restyle';
import {Theme} from '../../theme/theme';

export type LayoutProps = restyled.LayoutProps<Theme>;
export type VisibleProps = restyled.VisibleProps<Theme>;
export type OpacityProps = restyled.OpacityProps<Theme>;
export type SpacingProps = restyled.SpacingShorthandProps<Theme>;
export type ShadowProps = restyled.ShadowProps<Theme>;
export type PositionProps = restyled.PositionProps<Theme>;
export type BackgroundColorProps =
  restyled.BackgroundColorShorthandProps<Theme> &
    restyled.BackgroundColorProps<Theme>;
export type BorderProps = restyled.BorderProps<Theme>;
export type ColorProps = restyled.ColorProps<Theme>;
export type TextVariantProps = restyled.VariantProps<Theme, 'textVariants'>;

export type TextShadowProps = restyled.TextShadowProps<Theme>;

export type TextType = TextVariantProps['variant'];

export type Color = ColorProps['color'];

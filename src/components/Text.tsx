import {createText} from '@shopify/restyle';
import {Theme} from '../theme/theme';
import {ComponentProps, PropsWithChildren} from 'react';

const RestyleText = createText<Theme>();

export type TextProps = ComponentProps<typeof RestyleText> & {
  fontFamily?:
    | 'Montserrat-Bold'
    | 'Montserrat-ExtraBold'
    | 'Montserrat-Italic'
    | 'Montserrat-Medium'
    | 'Montserrat-SemiBold';
};

const Text = (props: PropsWithChildren<TextProps>) => {
  return <RestyleText {...props} />;
};

export default Text;

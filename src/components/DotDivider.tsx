import {BoxStyleProps} from '../libs/restyle/restyle';
import Box from './Box';

const DotDivider = (props: BoxStyleProps) => {
  return (
    <Box bg="inkTertiary" borderRadius="full" height={4} width={4} {...props} />
  );
};

export default DotDivider;

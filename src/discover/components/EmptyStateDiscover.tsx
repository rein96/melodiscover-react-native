import Box from '../../components/Box';
import TouchableItem from '../../components/TouchableItem';
import Text from '../../components/Text';
import {Dimensions} from 'react-native';

const height = Dimensions.get('window').height;

type Props = {onPress: () => void};

const EmptyStateDiscover = ({onPress}: Props) => {
  return (
    <Box alignItems="center" height={height - 280} justifyContent="center">
      <TouchableItem
        backgroundColor="canvasProduct"
        borderRadius="m"
        onPress={onPress}
        px="m"
        py="m">
        <Text fontFamily="Montserrat-Bold" textAlign="center" variant="label16">
          Select a Playlist
        </Text>
      </TouchableItem>
    </Box>
  );
};

export default EmptyStateDiscover;

import {Dimensions} from 'react-native';
import ChevronIcon from '../../assets/components/ChevronIcon';
import Box from '../../components/Box';
import Text from '../../components/Text';
import TouchableItem from '../../components/TouchableItem';

type Props = {
  onPress: () => void;
  playlistName: string | undefined;
};

const SavePlaylist = ({onPress, playlistName}: Props) => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TouchableItem
        alignItems="center"
        backgroundColor="lightPrimary"
        borderRadius="xxl"
        flexDirection="row"
        mt="xxs"
        onPress={onPress}
        p="s">
        <Text
          fontFamily="Montserrat-Bold"
          fontSize={16}
          mr="xs"
          numberOfLines={1}
          style={{maxWidth: Dimensions.get('screen').width - 180}}>
          {playlistName ?? 'Playlist'}
        </Text>
        <ChevronIcon direction="down" />
      </TouchableItem>
    </Box>
  );
};

export default SavePlaylist;

import ChevronIcon from '../../assets/components/ChevronIcon';
import Box from '../../components/Box';
import Text from '../../components/Text';
import TouchableItem from '../../components/TouchableItem';

const SavePlaylist = () => {
  return (
    <Box alignItems="center" justifyContent="center">
      <TouchableItem
        alignItems="center"
        backgroundColor="lightPrimary"
        borderRadius="xxl"
        flexDirection="row"
        mt="xxs"
        p="s">
        <Text fontFamily="Montserrat-Bold" fontSize={16} mr="xs">
          Playlist
        </Text>
        <ChevronIcon direction="down" />
      </TouchableItem>
    </Box>
  );
};

export default SavePlaylist;

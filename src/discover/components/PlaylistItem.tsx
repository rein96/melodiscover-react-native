import type {PlaylistItemResponse} from '../types/myplaylist.types';
import TouchableItem from '../../components/TouchableItem';
import Box from '../../components/Box';
import Text from '../../components/Text';
import CircleSuccessIcon from '../../assets/components/CircleSuccessIcon';
import {Dimensions, Image} from 'react-native';

type Props = {
  item: PlaylistItemResponse;
  onPress: (item: PlaylistItemResponse) => void;
  selectedPlaylistId: string;
};

const PlaylistItem = ({item, onPress, selectedPlaylistId}: Props) => {
  const handleOnPress = () => {
    onPress(item);
  };

  return (
    <TouchableItem
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      my="xxs"
      onPress={handleOnPress}>
      <Box alignItems="center" flexDirection="row">
        {item?.images?.[0]?.url ? (
          <Image
            source={{
              height: 60,
              uri: item?.images?.[0]?.url,
              width: 60,
            }}
          />
        ) : (
          <Box
            alignItems="center"
            bg="darkNeutral"
            height={60}
            justifyContent="center"
            width={60}>
            <Text color="inkSecondary" fontSize={16}>
              ?
            </Text>
          </Box>
        )}
        <Box ml="xs">
          <Text
            ellipsizeMode="tail"
            fontFamily="Montserrat-SemiBold"
            fontSize={14}
            numberOfLines={1}
            style={{
              maxWidth: Dimensions.get('screen').width - 140,
            }}>
            {item?.name}
          </Text>
          <Box alignItems="center" flexDirection="row">
            <Text color="inkSecondary" fontSize={12}>
              {item?.tracks?.total}{' '}
              {item?.tracks?.total > 1 ? 'tracks' : 'track'}
            </Text>
          </Box>
        </Box>
      </Box>
      {item.id === selectedPlaylistId && (
        <Box>
          <CircleSuccessIcon />
        </Box>
      )}
    </TouchableItem>
  );
};

export default PlaylistItem;

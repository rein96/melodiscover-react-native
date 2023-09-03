import {FlatList, ListRenderItemInfo, Modal, Pressable} from 'react-native';
import Text from '../../components/Text';
import Box from '../../components/Box';
import ArrowIcon from '../../assets/components/ArrowIcon';
import type {PlaylistItemResponse} from '../types/myplaylist.types';
import {useCallback} from 'react';
import PlaylistItem from './PlaylistItem';

type Props = {
  onClose: () => void;
  playlistItems: PlaylistItemResponse[] | undefined;
  visible: boolean;
};

const SelectPlaylistModal = ({onClose, playlistItems, visible}: Props) => {
  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<PlaylistItemResponse>) => {
      return (
        // @TODO: integrate selectedPlaylistId
        <PlaylistItem item={item} selectedPlaylistId="6F3s15WgYKjeBq4SgpjATg" />
      );
    },
    [],
  );

  const keyExtractor = (item: PlaylistItemResponse) => item.id;

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="formSheet"
      visible={visible}>
      <Box bg="canvasPrimary" flex={1} p="m">
        {/* Header */}
        <Box flexDirection="row" pb="s">
          <Pressable hitSlop={8} onPress={onClose}>
            <ArrowIcon direction="left" height={28} width={24} />
          </Pressable>
          <Box alignItems="center" flex={1} mr="l">
            <Text fontFamily="Montserrat-Bold" fontSize={16} textAlign="center">
              Select a Playlist
            </Text>
          </Box>
          <Box />
        </Box>

        <FlatList
          data={playlistItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          scrollIndicatorInsets={{right: 1}}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Modal>
  );
};

export default SelectPlaylistModal;

import {View, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import Text from './Text';
import Box from './Box';

type Props = {
  text?: string;
  visible: boolean;
};

const SpinnerOverlay = ({text, visible}: Props) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.container}>
        <Box backgroundColor="black" borderRadius="l" p="xl">
          <ActivityIndicator color="#ffffff" size="large" />
          {text && (
            <Text fontFamily="Montserrat-SemiBold" mt="s" variant="label14">
              {text}
            </Text>
          )}
        </Box>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    // Transparent black overlay
    justifyContent: 'center',
  },
});

export default SpinnerOverlay;

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useQueryMySpotifyProfile from '../../user/login/hooks/useQueryMySpotifyProfile';
import {Button, Image, ScrollView, StyleSheet} from 'react-native';
import useAuthSpotify from '../../user/login/hooks/useAuthSpotify';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RefreshControl from '../../components/RefreshControl';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const {logoutSpotify} = useAuthSpotify();
  const {
    data: mySpotifyProfileData,
    isRefetching,
    refetch,
  } = useQueryMySpotifyProfile();

  const profilePictureData = mySpotifyProfileData?.images[1];

  const pictureUrl = profilePictureData?.url as string;
  const pictureWidth = profilePictureData?.width;
  const pictureHeight = profilePictureData?.height;

  const handleLogout = async () => {
    await logoutSpotify();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      }),
    );
  };

  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <LinearGradient
      colors={['#141E30', '#121212']}
      end={{x: 0, y: 1}}
      start={{x: 0, y: 0}}
      style={[styles.container, {paddingTop: top}]}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefetching} />
        }>
        <Image
          height={pictureHeight}
          source={{uri: pictureUrl}}
          width={pictureWidth}
        />
        <Button onPress={handleLogout} title="Logout" />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  linearGradient: {
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    width: 350,
  },
});

export default SettingsScreen;

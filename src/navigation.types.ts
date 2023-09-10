import type {RouteProp as RoutePropBase} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type NavigationProp<T extends keyof RootParamList> =
  NativeStackNavigationProp<RootParamList, T>;

export type RouteProp<T extends keyof RootParamList> = RoutePropBase<
  RootParamList,
  T
>;

export type RootParamList = {
  AccountTab: undefined;
  DiscoverTab: undefined;
  LoginScreen: undefined;
  MainStack?: {
    screen: string;
  };
  PlaylistModalScreen: {
    country: string;
    profileId: string;
  };
  SettingsTab: undefined;
};

export type MainStackScreenProps<Screen extends keyof RootParamList> = {
  navigation: NavigationProp<Screen>;
  route: RouteProp<Screen>;
};

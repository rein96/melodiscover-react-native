import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import useTheme from '../theme/useTheme';
import Box from '../components/Box';
import DiscoverIcon from '../assets/components/DiscoverIcon';
import SettingsIcon from '../assets/components/SettingsIcon';
import DiscoverScreen from '../discover/screens/DiscoverScreen';
import SettingsScreen from '../settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

type TabbarIconProps = {
  focused: boolean;
  icon: ({color, ...rest}: SvgProps) => JSX.Element;
};
const TabbarIcon = ({focused, icon}: TabbarIconProps) => {
  const {
    theme: {colors},
  } = useTheme();
  const Icon = icon;

  return (
    <Box style={styles.TabbarIcon}>
      <Icon color={focused ? colors.inkPrimary : colors.inkTertiary} />
    </Box>
  );
};

const styles = StyleSheet.create({
  TabbarIcon: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
});

const DiscoverTabIcon = ({focused}: {focused: boolean}) => (
  <TabbarIcon focused={focused} icon={DiscoverIcon} />
);

const SettingsTabIcon = ({focused}: {focused: boolean}) => (
  <TabbarIcon focused={focused} icon={SettingsIcon} />
);

const TabStack = () => {
  const {
    theme: {colors},
  } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.canvasPrimary,
        tabBarActiveTintColor: colors.inkPrimary,
        tabBarInactiveBackgroundColor: colors.canvasPrimary,
        tabBarInactiveTintColor: colors.inkTertiary,
        tabBarStyle: {
          backgroundColor: colors.canvasPrimary,
          borderTopColor: colors.canvasPrimary,
        },
      }}>
      <Tab.Screen
        component={DiscoverScreen}
        name="Discover"
        options={{
          tabBarIcon: DiscoverTabIcon,
        }}
      />
      <Tab.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          tabBarIcon: SettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;

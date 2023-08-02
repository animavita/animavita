import { useTheme } from 'native-base';
import { TextStyle } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabBar } from 'react-native-tab-view';

const CustomTabBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
  const theme = useTheme();

  return (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'transparent',
      }}
      indicatorContainerStyle={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[300],
        width: '100%',
      }}
      tabStyle={{ display: 'flex', height: 'auto', padding: 0 }}
      indicatorStyle={{ backgroundColor: theme.colors.green[500] }}
      activeColor={theme.colors.green[500]}
      labelStyle={{
        color: theme.colors.gray[400],
        fontFamily: theme.fonts.heading,
        textTransform: 'capitalize',
        fontWeight: theme.fontWeights.extrabold.toString() as TextStyle['fontWeight'],
      }}
      android_ripple={{ radius: 0 }}
    />
  );
};

export default CustomTabBar;

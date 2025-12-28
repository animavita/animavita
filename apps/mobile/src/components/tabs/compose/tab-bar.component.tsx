import { Text, useTheme } from 'native-base';
import { TextStyle, View } from 'react-native';
import { NavigationState, Route, SceneRendererProps, TabBar } from 'react-native-tab-view';

import { PulsingBadge } from '@/components/pulsing-badge/pulsing-badge';
import { useNewRequests } from '@/contexts/new-requests-context';

const CustomTabBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => {
  const theme = useTheme();
  const { hasNewRequests } = useNewRequests();

  const renderLabel = ({ route, focused }: { route: Route; focused: boolean }) => {
    const isRequestsTab = route.key === 'requests';
    const showBadge = isRequestsTab && hasNewRequests && !focused;

    return (
      <View style={{ position: 'relative' }}>
        <Text
          color={focused ? theme.colors.green[500] : theme.colors.gray[400]}
          fontFamily={theme.fonts.heading}
          textTransform="capitalize"
          fontWeight={theme.fontWeights.extrabold}
        >
          {route.title}
        </Text>
        <PulsingBadge show={showBadge} />
      </View>
    );
  };

  return (
    <TabBar
      {...props}
      renderLabel={renderLabel}
      style={{
        backgroundColor: 'transparent',
        marginHorizontal: theme.space[6],
      }}
      indicatorContainerStyle={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[300],
        width: '100%',
      }}
      tabStyle={{ display: 'flex', height: 'auto', padding: 0 }}
      indicatorStyle={{ backgroundColor: theme.colors.green[500] }}
      activeColor={theme.colors.green[500]}
      android_ripple={{ radius: 0 }}
    />
  );
};

export default CustomTabBar;

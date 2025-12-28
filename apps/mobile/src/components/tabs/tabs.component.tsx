import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import CustomTabBar from './compose/tab-bar.component';

type Tab = {
  key: string;
  title: string;
  component: React.ComponentType;
};

type Tabs = {
  tabs: Tab[];
  onIndexChange?: (index: number) => void;
};

const TabsComponent = (props: Tabs) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(() => props.tabs.map(({ key, title }) => ({ key, title })));

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    props.onIndexChange?.(newIndex);
  };

  const sceneObject = props.tabs.reduce((object, tab) => {
    return { ...object, [tab.key]: tab.component };
  }, {});

  const renderScene = SceneMap(sceneObject);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={CustomTabBar}
    />
  );
};

export default TabsComponent;

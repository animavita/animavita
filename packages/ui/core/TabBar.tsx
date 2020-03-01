import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';

import {PossibleThemes, px2ddp, StyledTheme, useTheme} from '@animavita/theme';

import Row from '../layout/Row';
import Space from '../layout/Space';

import Typography from './Typography';

const {timing} = Animated;

const Wrapper = styled.View`
  width: 100%;
`;
const ClickableArea = styled.TouchableOpacity``;
const LineWrapper = styled.View`
  position: relative;
`;
const BaseLine = styled.View<{themeName: PossibleThemes}>`
  position: absolute;
  background-color: ${({theme, themeName}) => (themeName === 'light' ? theme.black : theme.white)};
  height: ${StyleSheet.hairlineWidth}px;
  width: 100%;
  opacity: 0.4;
`;

function useWidthOfSelectedItem(selectedIndex: number, itemsLength: number) {
  const [widthOfSelected, setWidthOfSelected] = useState(0);

  const widthOfEachItem = useRef<number[]>([...Array(itemsLength).keys()]);

  useEffect(() => {
    setWidthOfSelected(widthOfEachItem.current[selectedIndex]);
  }, [selectedIndex]);

  const updateSelectedWidth = (event: LayoutChangeEvent, index: number) => {
    const {width} = event.nativeEvent.layout;
    widthOfEachItem.current[index] = width;
    if (index === selectedIndex) setWidthOfSelected(width);
  };
  return {widthOfSelected, updateSelectedWidth};
}

function useAnimatedLineWidth(widthOfSelected: number) {
  const widthValue = useRef<number>(0);
  const width = new Animated.Value<number>(widthValue.current);
  const [hasInteracted, setHasInteracted] = useState(false);

  function interact() {
    if (!hasInteracted) setHasInteracted(true);
  }

  useEffect(() => {
    const toValue = widthOfSelected;

    timing(width, {
      duration: 500,
      toValue,
      easing: Easing.inOut(Easing.ease),
    }).start();

    widthValue.current = toValue;
  }, [widthOfSelected]);

  return {width: hasInteracted ? width : widthOfSelected, interact};
}

interface Item {
  key: string;
  displayName: string;
}

interface TabBarProps {
  items: Item[];
  onPress: (key: string) => void;
  indexOfStartSelected?: number;
}

const TabBar: React.FC<TabBarProps> = ({items, onPress, indexOfStartSelected}) => {
  const {themeName} = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(indexOfStartSelected || 0);
  const {widthOfSelected, updateSelectedWidth} = useWidthOfSelectedItem(selectedIndex, items.length);

  const {width, interact} = useAnimatedLineWidth(widthOfSelected);

  const handleItemPress = (key: string, index: number) => {
    interact();
    onPress(key);
    setSelectedIndex(index);
  };

  return (
    <Wrapper>
      <LineWrapper>
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: themeName === 'light' ? StyledTheme.black : StyledTheme.white,
            height: StyleSheet.hairlineWidth,
            width,
          }}
        />
        <BaseLine themeName={themeName} />
      </LineWrapper>
      <Space height={px2ddp(2)} />
      <Row
        css={css`
          width: 100%;
          justify-content: space-between;
        `}>
        {items.map((item, index) => (
          <ClickableArea key={index} onPress={() => handleItemPress(item.key, index)}>
            <Typography
              onLayout={event => updateSelectedWidth(event, index)}
              variant="body"
              css={css`
                opacity: ${index === selectedIndex ? 1 : 0.4};
              `}>
              {item.displayName.toUpperCase()}
            </Typography>
          </ClickableArea>
        ))}
      </Row>
    </Wrapper>
  );
};

export default TabBar;

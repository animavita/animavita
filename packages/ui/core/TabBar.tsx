import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {LayoutChangeEvent, StyleSheet, TouchableOpacity} from 'react-native';

import {px2ddp} from '@animavita/theme';

import Row from '../layout/Row';

import Space from '../layout/Space';

import Typography from './Typography';

const Wrapper = styled.View`
  width: 100%;
`;
const ClickableArea = styled.TouchableOpacity``;
const LineWrapper = styled.View`
  position: relative;
`;
const Line = styled.View<{width: number}>`
  position: absolute;
  background-color: ${({theme}) => theme.black};
  height: ${StyleSheet.hairlineWidth}px;
  width: ${({width}) => width}px;
`;
const BaseLine = styled.View`
  position: absolute;
  background-color: ${({theme}) => theme.black};
  height: ${StyleSheet.hairlineWidth}px;
  width: 100%;
  opacity: 0.4;
`;

function useWidthOfSelectedItem(selectedIndex: number) {
  const [widthOfSelected, setWidthOfSelected] = useState(0);

  const widthOfEachItem = useRef<number[]>([]);

  useEffect(() => {
    setWidthOfSelected(widthOfEachItem.current[selectedIndex]);
  }, [selectedIndex]);

  const updateSelectedWidth = (event: LayoutChangeEvent, index: number) => {
    const {width} = event.nativeEvent.layout;
    widthOfEachItem.current.push(width);
    if (index === selectedIndex) setWidthOfSelected(width);
  };
  return {widthOfSelected, updateSelectedWidth};
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
  const [selectedIndex, setSelectedIndex] = useState(indexOfStartSelected || 0);
  const {widthOfSelected, updateSelectedWidth} = useWidthOfSelectedItem(selectedIndex);

  const handleItemPress = (key: string, index: number) => {
    onPress(key);
    setSelectedIndex(index);
  };

  return (
    <Wrapper>
      <LineWrapper>
        <Line width={widthOfSelected} />
        <BaseLine />
      </LineWrapper>
      <Space height={px2ddp(1)} />
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

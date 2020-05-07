import React from 'react';
import {View} from 'react-native';

import Button from '../core/Button/Button';
import Space from '../layout/Space';

export default {
  title: 'Button',
  component: Button,
};

export const type = () => (
  <View>
    <Button text="Primary" type="primary" size="large" />
    <Space height={20} />
    <Button text="Outline" type="outline" size="large" />
  </View>
);

export const size = () => (
  <View>
    <Button text="Large" type="primary" size="large" />
    <Space height={20} />
    <Button text="Small" type="primary" size="small" />
  </View>
);

export const disabled = () => (
  <View>
    <Button text="Large" type="primary" size="large" disabled />
    <Space height={10} />
    <Button text="Large" type="primary" size="small" disabled />
    <Space height={20} />
    <Button text="Outline" type="outline" size="large" disabled />
    <Space height={10} />
    <Button text="Outline" type="outline" size="small" disabled />
  </View>
);

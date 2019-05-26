import React from 'react';
import { LineChart } from 'react-native-chart-kit';

import { View, Dimensions } from 'react-native';

// import { Container } from './styles';

const Statistics = () => (
  <View style={{ alignItems: 'center' }}>
    <LineChart
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          },
        ],
      }}
      width={Dimensions.get('window').width - 20} // from react-native
      height={220}
      yAxisLabel="$"
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#0AC4BA',
        backgroundGradientTo: '#2BDA8E',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  </View>
);

export default Statistics;

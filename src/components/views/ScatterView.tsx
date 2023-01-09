import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useColorScheme } from '@mui/joy';
import View from './View';
import { gradientColors } from '../../utils/themes/charts/Dark';

export default function ScatterView({
  values,
}: {
  values: [number, number][];
}) {
  const { systemMode } = useColorScheme();

  return (
    <View
      info={`${values.length} points`}
      title="Two-dimensional scatter plot"
      description="This chart features a two-dimensional scatter plot of the generated points. The points are colored according to their distance from the origin."
    >
      <ReactECharts
        option={{
          tooltip: {},
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: Math.max(...values.map(([x, y]) => x ** 2 + y ** 2)),
            inRange: {
              color: gradientColors.slice().reverse(),
            }
          },
          xAxis: [{}],
          yAxis: [{}],
          series: [
            {
              type: 'scatter',
              name: 'Sample points',
              data: values.map(([x, y]) => [x, y, x ** 2 + y ** 2]),
              dimensions: ['x', 'y', 'distance from origin'],
              blendMode: 'source-over',
            }
          ]
        }}
        lazyUpdate
        style={{ height: '100%', width: '100%' }}
        theme={systemMode}
      />
      </View>
  );
}
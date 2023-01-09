import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useColorScheme } from '@mui/joy';
import Random from '../../utils/Random';
import { gradientColors, textColors } from '../../utils/themes/charts/Dark';
import View from './View';

export default function VolumeView({
  values,
  algorithm,
}: {
  values: [number, number][];
  algorithm: keyof typeof Random;
}) {
  const { systemMode } = useColorScheme();

  const bbox = useMemo(() => {
    if (!values.length) {
      return { x: [0, 1], y: [0, 1] };
    }

    const x = values.map(([x]) => x);
    const y = values.map(([, y]) => y);
    return {
      x: [Math.floor(Math.min(...x)), Math.ceil(Math.max(...x))],
      y: [Math.floor(Math.min(...y)), Math.ceil(Math.max(...y))],
    };
  }, [values]);

  return (
    <View
      info={`${values.length} points`}
      title="Three-dimensional surface plot"
      description='This chart features a three-dimensional surface plot of the probability density function of the random variable, and a scatter plot of the generated points.'
    >
      <ReactECharts
        option={{
          tooltip: {},
          visualMap: {
            show: false,
            dimension: 2,
            min: 0,
            max: 1,
            inRange: {
              color: gradientColors
            }
          },
          xAxis3D: {
            type: 'value',
            min: bbox.x[0],
            max: bbox.x[1]
          },
          yAxis3D: {
            type: 'value',
            min: bbox.y[0],
            max: bbox.y[1]
          },
          zAxis3D: {
            type: 'value',
            splitNumber: 2
          },
          grid3D: {
            boxHeight: 40,
            axisLine: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] },
            },
            splitLine: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] },
            },
            axisPointer: {
              lineStyle: { color: textColors[systemMode as 'dark' | 'light'] }
            },
          },
          series: [
            {
              type: 'surface',
              name: 'Probability',
              wireframe: {
                show: false
              },
              shading: 'color',
              dimension: ['x', 'y', 'probability'],
              equation: {
                x: {
                  step: 0.1,
                  min: bbox.x[0],
                  max: bbox.x[1]
                },
                y: {
                  step: 0.1,
                  min: bbox.y[0],
                  max: bbox.y[1]
                },
                z: Random[algorithm].probability
              },
              itemStyle: {
                opacity: 0.3
              }
            },
            {
              type: 'scatter3D',
              name: 'Sample points',
              symbolSize: 5,
              data: values.map(([x, y]) => [x, y, Random[algorithm].probability(x, y)]),
              dimensions: ['x', 'y', 'probability'],
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
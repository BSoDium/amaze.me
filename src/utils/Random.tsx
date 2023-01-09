import React from 'react';
import { Box, Typography } from '@mui/joy';


const Random: {
  [key: string]: {
    name: string;
    probability: (x: number, y: number, ...args: number[]) => number;
    generate: (...args: number[]) => number;
    code: string;
    formula: string;
    parameters: string[];
    description: JSX.Element;
  };
} = {
  gaussian: {
    name: 'Gaussian',
    probability: function (x: number, y: number, mean: number = 0, sigma: number = 1) {
      return Math.exp(-((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2));
    },
    generate: function (mean: number = 0, stdDev: number = 1): number {
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stdDev + mean;
    },
    code: `function gaussian(x, y, mean = 0, sigma = 1) {
  return Math.exp(-((x - mean) ** 2 + (y - mean) ** 2) / (2 * sigma ** 2));
}`,
    formula: `$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$`,
    parameters: [
      '$$f(x)$$ - probability density function',
      '$$\\mu$$ - mean',
      '$$\\sigma$$ - standard deviation',
    ],
    description: (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography>
          The Gaussian distribution, also known as the normal distribution, is a continuous probability distribution that is symmetrical about the mean. It is often used to describe the probability of a given variable taking on a certain value or range of values.
        </Typography>
        <Typography component={'span'}>
          The Gaussian distribution has several properties that make it useful for modeling data in many fields, including:
          <ul>
            <li>
              It is a continuous distribution, meaning that it can take on any value within a certain range.
            </li>
            <li>
              It is symmetrical about the mean, meaning that the probability of a variable taking on a value above the mean is the same as the probability of it taking on a value below the mean.
            </li>
            <li>
              It is defined by just two parameters: the mean and the standard deviation.
            </li>
            <li>
              It is a bell-shaped curve, with most values concentrated around the mean and fewer and fewer values as you move further away from the mean.
            </li>
          </ul>
        </Typography>
        <Typography>
          The Gaussian distribution is often used to model real-world data that is continuous and symmetrical, such as height, weight, and IQ scores. It is also commonly used in statistical analysis and machine learning.
        </Typography>
      </Box>
    ),
  },
  uniform: {
    name: 'Uniform',
    probability: function (x: number, y: number, min: number = -1, max: number = 1) {
      return (x >= min && x <= max && y >= min && y <= max) ? 1 : 0;
    },
    generate: function (min: number = -1, max: number = 1): number {
      return Math.random() * (max - min) + min;
    },
    code: `function uniform(x, y, min = -1, max = 1) {
  return (x >= min && x <= max && y >= min && y <= max) ? 1 : 0;
}`,
    formula: `$$f(x) = \\begin{cases}
  \\frac{1}{b-a} & a \\leq x \\leq b \\\\
  0 & \\text{otherwise}
\\end{cases}$$`,
    parameters: [
      '$$f(x)$$ - probability density function',
      '$$a$$ - minimum',
      '$$b$$ - maximum',
    ],
    description: (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography>
          The uniform distribution is a continuous probability distribution that has a constant probability over a given interval. It is often used to model situations where there is no inherent bias towards any particular value within the interval.
        </Typography>
        <Typography component={'span'}>
          <ul>
            <li>
              The uniform distribution has several properties that make it useful for modeling certain types of data:
            </li>
            <li>
              It is a continuous distribution, meaning that it can take on any value within a certain range.
            </li>

            <li>
              It is defined by just two parameters: the lower and upper bounds of the interval.
            </li>

            <li>
              It is a flat curve, meaning that the probability of a variable taking on any value within the interval is the same.
            </li>
          </ul>
        </Typography>
        <Typography>
          The uniform distribution is often used to model situations where there is no inherent bias towards any particular value within a given range, such as the roll of a fair die or the outcome of a coin flip. It is also used in statistical analysis and machine learning to model data that is uniformly distributed.
        </Typography>
      </Box>
    ),
  },
};

export default Random;
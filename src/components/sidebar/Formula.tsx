import { Box, Card, Divider, Typography } from '@mui/joy';
import React from 'react';
import Latex from 'react-latex';
import Random from '../../utils/Random';

export default function Formula({
  algorithm
}: {
  algorithm: string;
}) {
  return (
    <Card variant='outlined' sx={{
      width: '100%',
      p: 2,
      gap: 2,
    }}>
      <Typography level="h6">
        Formula - {Random[algorithm as keyof typeof Random].name} distribution
      </Typography>
      <Typography level="h5">
        <Latex>
          {Random[algorithm as keyof typeof Random].formula}
        </Latex>
      </Typography>
      <Divider />
      <Typography level="body1" component={'span'}>
        {Random[algorithm as keyof typeof Random].parameters.map((parameter) => (
          <Box key={parameter}>
            <Latex>
              {parameter}
            </Latex>
          </Box>
        ))}
      </Typography>
    </Card>
  )
}
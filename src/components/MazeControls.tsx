import { Box, Button, Card, Slider, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { Default, Mobile } from '../utils/Responsive';


function ControlPanel({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Default>
        <Card
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 300,
            p: 2,
            m: 2
          }}>
          {children}
        </Card>
      </Default>
      <Mobile>
        <Card
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            m: 2
          }}>
          {children}
        </Card>
      </Mobile>
    </>
  )
}

export default function MazeControls({
  updateMaze,
  loading
}: {
  updateMaze: (mazeSize: number) => void;
  loading: boolean;
}) {
  const [mazeSize, setMazeSize] = useState(3);

  return (
    <ControlPanel>
      <Typography level="h5" sx={{ mb: 2 }}>
        Maze properties
      </Typography>
      <Box component="div" sx={{ width: "100%", p: 2 }}>
        <Typography gutterBottom>
          Maze size
        </Typography>
        <Slider
          min={5}
          max={50}
          step={5}
          marks
          value={mazeSize}
          onChange={(e, value) => setMazeSize(value as number)}
          valueLabelDisplay="auto"
        />
      </Box>

      <Button
        loading={loading}
        onClick={() => updateMaze(mazeSize)}
      >
        Generate Maze
      </Button>
    </ControlPanel>
  );
}
import { Box, Button, Card, Divider, FormControl, FormLabel, Slider, Switch, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { Default, Mobile } from '../utils/Responsive';
import { MazeViewSettings } from './MazeView';


function ControlPanel({ children }: {
  children: React.ReactNode;
}) {
  const sx = {
    position: 'absolute',
    top: 0,
    left: 0,
    p: 2,
    m: 2,
    gap: 2
  }

  return (
    <>
      <Default>
        <Card
          component="div"
          sx={{
            ...sx,
            width: 300,
          }}>
          {children}
        </Card>
      </Default>
      <Mobile>
        <Card
          component="div"
          sx={{
            ...sx,
            right: 0,
          }}>
          {children}
        </Card>
      </Mobile>
    </>
  )
}

export default function MazeControls({
  settings,
  setSettings,
  loading
}: {
  settings: MazeViewSettings;
  setSettings: (settings: MazeViewSettings) => void;
  loading: boolean;
}) {
  const [mazeSize, setMazeSize] = useState(settings.mazeSize);
  const [wireframe, setWireframe] = useState(settings.wireframe);

  return (
    <ControlPanel>
      <Typography level="h5" >
        Maze properties
      </Typography>
      <Box component="div" sx={{ width: "100%" }}>
        <Typography gutterBottom>
          Maze size
        </Typography>
        <Slider
          min={5}
          max={55}
          step={5}
          marks={
            [
              { value: 5, label: '5' },
              { value: 15, label: '15' },
              { value: 30, label: '30' },
              { value: 45, label: '45' },
              { value: 55, label: '55' },
            ]
          }
          value={mazeSize}
          onChange={(e, value) => setMazeSize(value as number)}
          valueLabelDisplay="auto"
        />
      </Box>
      <Divider />
      <FormControl
        orientation="horizontal"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <FormLabel>Enable wireframe</FormLabel>
        <Switch
          checked={wireframe}
          onChange={(event) => {
            setWireframe(event.target.checked);
          }}
          color={wireframe ? 'success' : 'neutral'}
          variant="outlined"
          endDecorator={wireframe ? 'On' : 'Off'}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </FormControl>

      <Divider />

      <Button
        loading={loading}
        onClick={() => {
          setSettings({
            ...settings,
            wireframe,
            mazeSize
          })
        }}
      >
        Generate Maze
      </Button>
    </ControlPanel>
  );
}
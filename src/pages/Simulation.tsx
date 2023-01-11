import React from 'react';
import { Box, Button, Link } from '@mui/joy';

import { FiGithub } from 'react-icons/fi';
import MazeView from '../components/MazeView';


export default function Simulation() {
  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Link
        href="https://github.com/BSoDium/amaze.me/fork"
        underline="none"
        target="_blank"
        sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <Button
          color="neutral"
          variant='soft'
          size='lg'
          startDecorator={<FiGithub />}
          sx={{ boxShadow: "md", borderRadius: 9999 }}
        >
          Fork on GitHub
        </Button>
      </Link>

      <MazeView />
    </Box>
  );
}
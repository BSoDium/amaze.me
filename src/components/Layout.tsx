import React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import { Card, CardProps, Sheet, SheetProps } from '@mui/joy';
import { Default, Mobile } from '../utils/Responsive';

function Root(props: BoxProps) {
  const sx = {
    height: '100vh',
    width: '100vw',
  };

  return (
    <>
      <Default>
        <Box
          sx={{
            ...sx,
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: '100%',
            gridTemplateAreas: `
            "sidebar main"
          `,
          }}
          {...props}
        />
      </Default>
      <Mobile>
        <Box
          sx={{
            ...sx,
            display: 'flex',
            flexDirection: 'column',
          }}
          {...props}
        />
      </Mobile>
    </>
  );
}

function Sidebar(props: SheetProps) {
  return (
    <Sheet
      sx={{
        gridArea: 'sidebar',
        bgcolor: 'background.surface',
        color: 'text.primary',
        display: 'flex',
        p: 5,
        gap: 5,
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
      }}
      {...props}
    />
  );
}

function Main(props: BoxProps) {
  return (
    <Box
      sx={{
        gridArea: 'main',
        overflowY: 'auto',
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        gap: 2,
        p: 2,
      }}
      {...props}
    />
  );
}

function Tile(props: CardProps) {
  return (
    <Card
      sx={{
        bgcolor: 'background.surface',
        color: 'text.primary',
        width: "100%",
        height: "600px",
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
      {...props}
    />
  );
}

const Layout = {
  Root,
  Sidebar,
  Tile,
  Main,
};

export default Layout;
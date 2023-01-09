import React from 'react';
import { Button, Link } from '@mui/joy';

import { register } from '../utils/themes/charts/Dark';
import Layout from '../components/Layout';
import { FiGithub } from 'react-icons/fi';

export default function Simulation() {

  register();

  return (
    <Layout.Root>
      <Link
        href="https://github.com/BSoDium/amaze.me/fork"
        underline="none"
        target="_blank"
        sx={{ position: "fixed", bottom: 20, right: 30, zIndex: 1000 }}
      >
        <Button
          color="neutral"
          variant='soft'
          startDecorator={<FiGithub />}
          sx={{ boxShadow: "md", borderRadius: 9999 }} 
        >
          Fork on GitHub
        </Button>
      </Link>
      
      <Layout.Sidebar>
        Sidebar
      </Layout.Sidebar>
      <Layout.Main>
        Main
      </Layout.Main>
    </Layout.Root>
  );
}
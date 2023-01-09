import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {
  BrowserRouter, Outlet, Route, Routes,
} from 'react-router-dom';
import 'echarts-gl';

import appTheme from './utils/themes/app/Theme';
import Simulation from './pages/Simulation';
import './App.global.scss'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <CssVarsProvider
            disableTransitionOnChange
            theme={appTheme}
            defaultMode="system"
            modeStorageKey='app-apperance-mode'
          >
            <CssBaseline />
            <Outlet />
          </CssVarsProvider>
        }>
          <Route index element={<Simulation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container!);

const theme = createTheme(); // Or import your custom theme if defined

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);

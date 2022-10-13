import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

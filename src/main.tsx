import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import { Layout } from './layout';
import HomePage from './pages/home/HomePage';
import { IconsPage } from './pages/icons/IconsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/icons" element={<IconsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

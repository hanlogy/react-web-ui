import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import { Layout } from './layout';
import HomePage from './pages/home/HomePage';
import { IconsPage } from './pages/icons/IconsPage';
import { ButtonsPage } from './pages/buttons/ButtonsPage';
import { CollapsibleTreePage } from './pages/collapsible-tree/CollapsibleTreePage';
import { DropdownsPage } from './pages/dropdowns/DropdownsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/collapsible-tree" element={<CollapsibleTreePage />} />
          <Route path="/dropdowns" element={<DropdownsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

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
import { DialogsPage } from './pages/dialogs/DialogsPage';
import { FormPage as FormPageDeprecated } from './pages/form.deprecated/FormPage';
import { InputsPage } from './pages/inputs/InputsPage';
import { FormPage } from './pages/form/FormPage';

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
          <Route path="/dialogs" element={<DialogsPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/form-deprecated" element={<FormPageDeprecated />} />
          <Route path="/inputs" element={<InputsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

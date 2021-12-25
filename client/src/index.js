import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CoreLayout>
          <AppRoutes />
      </CoreLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

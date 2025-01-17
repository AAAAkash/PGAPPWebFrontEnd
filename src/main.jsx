import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Style.css';
import { DataProvider } from './DataContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <DataProvider>
      <App />
      </DataProvider>
  </React.StrictMode>,
)

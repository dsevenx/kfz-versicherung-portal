import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ContractPage from './pages/ContractPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ContractPage />
    </ThemeProvider>
  );
}

export default App;
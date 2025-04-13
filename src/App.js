import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ContractPage from './pages/ContractPage';
import './App.css';

function App({ vertrkey } ) {
  console.log("D7X App wird gestartet");
  return (
    <ThemeProvider>
      <ContractPage vertrkey={vertrkey+"Testy"}/>
    </ThemeProvider>
  );
}

export default App;
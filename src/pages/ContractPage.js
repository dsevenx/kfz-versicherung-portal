import React, { useState } from 'react';
import ContractOverview from '../components/contract/ContractOverview';
import VehicleDetails from '../components/vehicle/VehicleDetails';
import { Box } from '@mui/material';
import Layout from '../components/layout/Layout';

const ContractPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // TabPanel wird die activeTab-Zahl und die setActiveTab-Funktion nutzen
  return (
    <Layout>
      {activeTab === 0 && <ContractOverview />}
      {activeTab === 1 && <VehicleDetails />}
    </Layout>
  );
};

export default ContractPage;
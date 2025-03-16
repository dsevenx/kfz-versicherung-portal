import React, { useState } from 'react';
import ContractOverview from '../components/contract/ContractOverview';
import VehicleDetails from '../components/vehicle/VehicleDetails';
import Layout from '../components/layout/Layout';

const ContractPage = () => {
  const [activeTab, setActiveTab] = useState(0);

   return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 0 && <ContractOverview />}
      {activeTab === 1 && <VehicleDetails />}
    </Layout>
  );
};

export default ContractPage;
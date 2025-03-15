import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchContractData } from '../../api/contractService';
import { Paper, Typography, Grid, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { DirectionsCar, Speed, Event, LocalOffer, Add, Delete } from '@mui/icons-material';

const VehiclePaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const SectionTitle = styled(Typography)`
  font-weight: 500 !important;
  margin-bottom: 15px !important;
  color: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  color: ${props => props.theme.colors.accent};
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InfoLabel = styled(Typography)`
  font-weight: 500 !important;
  min-width: 180px;
`;

const InfoValue = styled(Typography)`
  flex: 1;
`;

const ActionButton = styled(Button)`
  margin-top: 8px !important;
  margin-right: 8px !important;
`;

const VehicleDetails = () => {
  const { theme } = useContext(ThemeContext);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContractData = async () => {
      try {
        const data = await fetchContractData();
        setContract(data);
      } catch (error) {
        console.error('Error loading contract data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContractData();
  }, []);

  if (loading) {
    return <Typography>Fahrzeugdaten werden geladen...</Typography>;
  }

  if (!contract || !contract.vehicle) {
    return <Typography>Keine Fahrzeugdaten gefunden.</Typography>;
  }

  const { vehicle } = contract;

  return (
    <>
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" theme={theme}>
          <IconWrapper theme={theme}><DirectionsCar /></IconWrapper>
          Fahrzeugdaten
        </SectionTitle>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <InfoLabel variant="body2">Kennzeichen:</InfoLabel>
              <InfoValue variant="body2">{vehicle.licensePlate}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Fahrzeug:</InfoLabel>
              <InfoValue variant="body2">{vehicle.make} {vehicle.model}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">HSN/TSN:</InfoLabel>
              <InfoValue variant="body2">{vehicle.hsnTsn}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Nutzungsart:</InfoLabel>
              <InfoValue variant="body2">{vehicle.usage}</InfoValue>
            </InfoRow>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <InfoRow>
              <InfoLabel variant="body2">Aktuelle Fahrleistung:</InfoLabel>
              <InfoValue variant="body2">{vehicle.mileage} km</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel variant="body2">Branchengruppe:</InfoLabel>
              <InfoValue variant="body2">{vehicle.industryGroup}</InfoValue>
            </InfoRow>
          </Grid>
        </Grid>
      </VehiclePaper>
      
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" theme={theme}>
          <IconWrapper theme={theme}><Speed /></IconWrapper>
          Kilometerstand
        </SectionTitle>
        
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Kilometerstand (km)</TableCell>
              <TableCell>Grund</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicle.mileageHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.km}</TableCell>
                <TableCell>{entry.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<Add />}
          size="small"
        >
          Hinzufügen
        </ActionButton>
        <ActionButton
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          size="small"
        >
          Entfernen
        </ActionButton>
      </VehiclePaper>
      
      <VehiclePaper elevation={2}>
        <SectionTitle variant="h6" theme={theme}>
          <IconWrapper theme={theme}><LocalOffer /></IconWrapper>
          Zubehör
        </SectionTitle>
        
        {vehicle.accessories && vehicle.accessories.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Bezeichnung</TableCell>
                <TableCell>Hersteller</TableCell>
                <TableCell>Neuwert (EUR)</TableCell>
                <TableCell>MwSt.</TableCell>
                <TableCell>Zuschlag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicle.accessories.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.tax}</TableCell>
                  <TableCell>{item.surcharge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body2">Kein Zubehör vorhanden</Typography>
        )}
        
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<Add />}
          size="small"
        >
          Hinzufügen
        </ActionButton>
      </VehiclePaper>
    </>
  );
};

export default VehicleDetails;
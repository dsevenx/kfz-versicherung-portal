import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Tabs, Tab, Box } from '@mui/material';
import { DirectionsCar, AddCircle, Category } from '@mui/icons-material';

const TabsContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
`;

const StyledTab = styled(Tab)`
  color: ${props => props.theme.colors.text} !important;
  opacity: 0.7;
  
  &.Mui-selected {
    opacity: 1;
  }
`;

const TabPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabsContainer theme={theme}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        <StyledTab icon={<DirectionsCar />} label="Fahrzeug" theme={theme} />
        <StyledTab icon={<AddCircle />} label="Zusatz" theme={theme} />
        <StyledTab icon={<Category />} label="Produkt" theme={theme} />
      </Tabs>
    </TabsContainer>
  );
};

export default TabPanel;
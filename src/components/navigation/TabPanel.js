import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Tabs, Tab, Box } from '@mui/material';
import { DirectionsCar, AddCircle, Category,TopicRounded } from '@mui/icons-material';

const TabsContainer = styled.div`
  background-color: ${props => props.customTheme.colors.primary};
  color: ${props => props.customTheme.colors.text};
`;

const StyledTab = styled(Tab)`
  color: ${props => props.customTheme.colors.text} !important;
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
    <TabsContainer customTheme={theme}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        indicatorColor="secondary"
        textColor="inherit"
        centered
      >
        <StyledTab icon={<TopicRounded />} label="Übersicht" customTheme={theme} />
        <StyledTab icon={<DirectionsCar />} label="Fahrzeug" customTheme={theme} />
        <StyledTab icon={<AddCircle />} label="Zusatz" customTheme={theme} />
        <StyledTab icon={<Category />} label="Produkt" customTheme={theme} />
      </Tabs>
    </TabsContainer>
  );
};

export default TabPanel;
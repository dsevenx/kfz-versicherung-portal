import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Menu, MenuItem } from '@mui/material';
import { ExpandLess, ExpandMore, Description, Person, DirectionsCar, BusinessCenter, HomeWork } from '@mui/icons-material';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const NestedList = styled(List)`
  padding-left: 16px !important;
`;

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState({
    contracts: true,
    customers: false,
    vehicles: false,
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (section) => {
    setOpen({
      ...open,
      [section]: !open[section],
    });
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({ mouseX: event.clientX, mouseY: event.clientY });
    setSelectedItem(item);
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  return (
    <SidebarContainer theme={theme}>
      <List component="nav">
        <ListItem button onClick={() => handleClick('contracts')}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Verträge" />
          {open.contracts ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.contracts} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem
              button
              onContextMenu={(e) => handleContextMenu(e, 'AS9838259145')}
              selected={selectedItem === 'AS9838259145'}
            >
              <ListItemText primary="Vertrag AS9838259145" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Offerte VN123456" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Abgelehnt AS7654321" />
            </ListItem>
          </NestedList>
        </Collapse>

        <ListItem button onClick={() => handleClick('customers')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Kunden" />
          {open.customers ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.customers} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Rokosch Frank" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Müller, Hans" />
            </ListItem>
          </NestedList>
        </Collapse>

        <ListItem button onClick={() => handleClick('vehicles')}>
          <ListItemIcon>
            <DirectionsCar />
          </ListItemIcon>
          <ListItemText primary="Fahrzeuge" />
          {open.vehicles ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open.vehicles} timeout="auto" unmountOnExit>
          <NestedList component="div" disablePadding>
            <ListItem button>
              <ListItemText primary="Mercedes GLC 250" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="VW Golf" />
            </ListItem>
          </NestedList>
        </Collapse>

        <ListItem button>
          <ListItemIcon>
            <BusinessCenter />
          </ListItemIcon>
          <ListItemText primary="Anträge" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeWork />
          </ListItemIcon>
          <ListItemText primary="Schadensfälle" />
        </ListItem>
      </List>

      <Menu
        open={contextMenu !== null}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleContextMenuClose}>Öffnen</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Bearbeiten</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Drucken</MenuItem>
        <MenuItem onClick={handleContextMenuClose}>Stornieren</MenuItem>
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
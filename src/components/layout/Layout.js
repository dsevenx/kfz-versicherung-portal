import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import TabPanel from './TabPanel';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: 10px 20px;
  text-align: center;
`;

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <LayoutContainer theme={theme}>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>{children}</ContentArea>
        <ChatPanel />
      </MainContent>
      <TabPanel />
      <Footer>
        © {new Date().getFullYear()} KFZ-Versicherungsportal
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
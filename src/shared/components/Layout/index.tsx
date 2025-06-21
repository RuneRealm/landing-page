import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(112, 82, 100, 0.8), rgba(186, 120, 103, 0.8));
  z-index: -2;
`;

const BackgroundPattern = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <BackgroundGradient />
      <BackgroundPattern />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;

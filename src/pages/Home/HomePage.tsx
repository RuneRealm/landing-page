import React from 'react';
import styled from 'styled-components';
import Header from '../../shared/components/Header';
import EmailSignup from '../../shared/components/EmailSignup';
import Features from '../../shared/components/Features';
import Footer from '../../shared/components/Footer';
import Hero from '../../shared/components/Hero';
import Ownership from '../../shared/components/Ownership';
import Socials from '../../shared/components/Socials';
import Experience from '../../shared/components/Experience';


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <Header />
      <Hero />
      <ContentWrapper>
        <Features />
        <Ownership />
        <Experience />
        <Socials />
        <EmailSignup />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default HomePage;

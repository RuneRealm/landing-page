import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sections from './Sections';
import { scrollToSection } from '../../utils/scroll';
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
  const [pathname, setPathname] = useState<string>(window.location.pathname);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  useEffect(() => {
    // Update pathname if URL changes
    const updatePathname = () => {
      setPathname(window.location.pathname);
    };
    
    // Listen for URL changes
    window.addEventListener('popstate', updatePathname);
    
    return () => {
      // Clean up event listener
      window.removeEventListener('popstate', updatePathname);
    };
  }, []);
  
  // Check if the current pathname matches any section ID
  useEffect(() => {
    // Remove leading slash and check if it matches a section ID
    const sectionId = pathname.replace('/', '');
    
    if (sectionId && Object.values(Sections).includes(sectionId)) {
      setCurrentSection(sectionId);
    } else {
      setCurrentSection(null);
    }
  }, [pathname]);
  
  // Scroll to section when currentSection changes
  useEffect(() => {
    if (currentSection) {
      // Use the scrollToSection utility with an offset to account for the fixed header
      scrollToSection(currentSection, { 
        offset: 80, // Offset for the fixed header height
        delay: 100, // Small delay to ensure the page is fully loaded
        updateUrl: false // Don't update URL here as we're responding to URL changes
      });
    }
  }, [currentSection]);
  
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

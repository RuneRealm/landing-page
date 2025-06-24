import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import { GameHero, GameFeatures, GameEndowment, GameMint } from "./components";
import Sections from "./Sections";
import { scrollToSection } from "../../utils/scroll";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow-x: hidden; /* Prevent horizontal scroll on mobile */
  width: 100%;
`;

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 1.5rem 2rem;
  transition: padding 0.3s ease;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 900px;
    padding: 70px 1.5rem 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 60px 1.2rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 50px 1rem 1rem;
  }
`;

// Background elements for visual appeal
const BackgroundGlow = styled.div`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 40vw;
  height: 40vw;
  background: radial-gradient(circle, rgba(var(--primary-color-rgb), 0.2) 0%, rgba(var(--primary-color-rgb), 0) 70%);
  border-radius: 50%;
  z-index: -1;
  transition: all 0.5s ease;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 50vw;
    height: 50vw;
    left: 0;
  }
  
  @media (max-width: 768px) {
    width: 80vw;
    height: 80vw;
    left: -20%;
    top: 15%;
  }
  
  @media (max-width: 480px) {
    width: 100vw;
    height: 100vw;
    left: -30%;
    top: 10%;
    opacity: 0.8;
  }
`;

const BackgroundGlowSecondary = styled.div`
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 30vw;
  height: 30vw;
  background: radial-gradient(circle, rgba(var(--secondary-color-rgb), 0.15) 0%, rgba(var(--secondary-color-rgb), 0) 70%);
  border-radius: 50%;
  z-index: -1;
  transition: all 0.5s ease;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    width: 40vw;
    height: 40vw;
    right: 0;
  }
  
  @media (max-width: 768px) {
    width: 60vw;
    height: 60vw;
    right: -10%;
    bottom: 5%;
  }
  
  @media (max-width: 480px) {
    width: 80vw;
    height: 80vw;
    right: -20%;
    bottom: 0;
    opacity: 0.7;
  }
`;

const GamePage: React.FC = () => {
  const { section } = useParams<{ section?: string }>();
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  // Check if the section param matches any section ID
  useEffect(() => {
    if (section) {
      // Check if it matches a section ID
      const sectionKey = Object.keys(Sections).find(
        key => Sections[key as keyof typeof Sections] === section
      );
      
      if (sectionKey) {
        setCurrentSection(Sections[sectionKey as keyof typeof Sections]);
      } else {
        setCurrentSection(null);
      }
    } else {
      setCurrentSection(null);
    }
  }, [section]);
  
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
      <ContentWrapper>
        <BackgroundGlow />
        <BackgroundGlowSecondary />
        <GameContainer>
          <div id={Sections.game}>
            <GameHero />
          </div>
          <div id={Sections.features}>
            <GameFeatures />
          </div>
          <div id={Sections.endowment}>
            <GameEndowment />
          </div>
          <div id={Sections.mint}>
            <GameMint />
          </div>
        </GameContainer>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default GamePage;

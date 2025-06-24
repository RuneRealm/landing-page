import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../../utils/scroll';
import Sections from '../../../pages/Home/Sections';
import Button from '../Button';
import { RUNEREALM } from '@arcaogaming/project-links';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  position: relative;
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  img {
    height: 80px;
    margin-right: 10px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    .logo-popup {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    img {
      height: 32px;
    }
    
    span {
      font-size: 1.2rem;
    }
  }
`;

const LogoPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 101;
  
  p {
    margin: 0;
    color: white;
    font-size: 0.9rem;
  }
  
  strong {
    color: var(--primary-color);
    display: block;
    margin-bottom: 5px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 20px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const GameLink = styled(NavLink)`
  position: relative;
  
  .game-coin {
    position: absolute;
    height: 1.25rem;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%) scale(0) rotateY(0deg);
    opacity: 0;
    z-index: 1;
    transform-style: preserve-3d;
    backface-visibility: visible;
  }
  
  &:hover .game-coin {
    animation: marioCoinFlip 1s ease forwards;
  }
  
  @keyframes marioCoinFlip {
    0% {
      transform: translate(-50%, 0) scale(0) rotateY(0deg);
      opacity: 0;
    }
    10% {
      transform: translate(-50%, -50%) scale(0.8) rotateY(90deg);
      opacity: 1;
    }
    25% {
      transform: translate(-50%, -120%) scale(1) rotateY(180deg);
      opacity: 1;
    }
    40% {
      transform: translate(-50%, -170%) scale(1) rotateY(270deg);
      opacity: 1;
    }
    55% {
      transform: translate(-50%, -200%) scale(1) rotateY(360deg);
      opacity: 1;
    }
    70% {
      transform: translate(-50%, -230%) scale(1) rotateY(450deg);
      opacity: 0.8;
    }
    85% {
      transform: translate(-50%, -250%) scale(0.8) rotateY(540deg);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -270%) scale(0.5) rotateY(630deg);
      opacity: 0;
    }
  }
`;

const ScrollLink = styled.a`
  margin: 0 20px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if we're on the home page
  const isHomePage = window.location.pathname === '/' || 
                     window.location.pathname === '/home' ||
                     Object.values(Sections).some(section => 
                       window.location.pathname === `/${section}`);
  
  // Handle section navigation
  const handleSectionClick = (sectionId: string) => {
    if (isHomePage) {
      // If we're on the home page, just scroll to the section
      scrollToSection(sectionId, { offset: 80 });
    } else {
      // If we're on another page, navigate to home page with the section in the URL
      navigate(sectionId === 'home' ? '/' : `/${sectionId}`);
    }
  };
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo onClick={() => handleSectionClick(Sections.home)}>
            <img src="/images/rune-realm-logo.png" alt="RuneRealm Logo" />
        </Logo>
        
        <NavMenu>
          <ScrollLink onClick={() => handleSectionClick(Sections.home)}>
            Home
          </ScrollLink>
          <NavLink 
            to="/roadmap" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Roadmap
          </NavLink>
          <ScrollLink onClick={() => handleSectionClick(Sections.ownership)}>
            Ownership
          </ScrollLink>
          <ScrollLink onClick={() => handleSectionClick(Sections.signup)}>
            Sign Up
          </ScrollLink>
          <GameLink 
            to="/game" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="game-text">$GAME</span>
            <img src="/arcao.png" alt="Game Icon" className="game-coin" />
          </GameLink>
        </NavMenu>
        
        <ActionButtons>
          <Button 
            primary 
            onClick={() => window.open(`${RUNEREALM.gameSite}`, '_blank')}
          >
            Play Now
          </Button>
        </ActionButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

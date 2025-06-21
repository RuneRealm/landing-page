import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

// We'll use the public path instead of imports

const NavbarContainer = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.isScrolled ? '15px 0' : '20px 0'};
  background: ${props => props.isScrolled ? 'rgba(18, 18, 18, 0.8)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 40px;
  transition: all 0.3s ease;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
    transition: right 0.3s ease;
    z-index: 1001;
  }
`;

const NavLinkStyled = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 10px 0;
  }
`;

const RouterLink = styled(Link)`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-light);
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 10px 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  z-index: 1002;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarContent>
        <LogoContainer to="/">
          <Logo src="/images/rune-realm-logo.png" alt="RuneRealm Logo" />
        </LogoContainer>
        
        <MobileMenuButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </MobileMenuButton>
        
        <NavLinks isOpen={isOpen}>
          <CloseButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          
          {isHomePage ? (
            <>
              <NavLinkStyled href="#features">Features</NavLinkStyled>
              <NavLinkStyled href="#ownership">Ownership</NavLinkStyled>
              <NavLinkStyled href="#experience">Experience</NavLinkStyled>
              <RouterLink to="/roadmap">Roadmap</RouterLink>
            </>
          ) : (
            <>
              <RouterLink to="/#features">Features</RouterLink>
              <RouterLink to="/#ownership">Ownership</RouterLink>
              <RouterLink to="/#experience">Experience</RouterLink>
              <RouterLink to="/roadmap">Roadmap</RouterLink>
            </>
          )}
          <Button>Play Now</Button>
        </NavLinks>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;

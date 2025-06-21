import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../Button';

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
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  img {
    height: 80px;
    margin-right: 10px;
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
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">
            <img src="/images/rune-realm-logo.png" alt="RuneRealm Logo" />
          </Link>
        </Logo>
        
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/#experience">Experience</NavLink>
          <NavLink to="/#ownership">Ownership</NavLink>
          <NavLink to="/#signup">Sign Up</NavLink>
        </NavMenu>
        
        <ActionButtons>
          <Button 
            primary 
            onClick={() => window.open('https://runerealm_game.ar.io/', '_blank')}
          >
            Play Now
          </Button>
        </ActionButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;

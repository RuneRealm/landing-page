import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';
import FooterBackground from '../FooterBackground';

const FooterSection = styled.footer`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0;
  z-index: 2;
`;

const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  backdrop-filter: blur(8px);
  border-top: 1px solid var(--glass-border);
  padding: 40px 0 20px;
  box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const StyledFooterBackground = styled(FooterBackground)`
  filter: blur(2px);
  opacity: 0.5;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    text-align: center;
  }
`;

const FooterColumn = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 20px;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &.twitter:hover {
    background: black;
  }
  
  &.discord:hover {
    background: #7289DA;
  }
  
  &.telegram:hover {
    background: #0088cc;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease, filter 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 2px 15px rgba(186, 120, 103, 0.5));
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-align: right;
  margin-top: 10px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterWrapper>
        <StyledFooterBackground />
        <ContentContainer>
          <FooterTop>
            <FooterColumn>
              <LogoContainer>
                <Logo src="/images/rune-realm-logo.png" alt="RuneRealm Logo" />
              </LogoContainer>
            </FooterColumn>
            
            <FooterColumn>
              <SocialIcons>
                <SocialIcon href="https://x.com/runerealm_ao" target="_blank" rel="noopener noreferrer" className="twitter">
                  <FontAwesomeIcon icon={faXTwitter} />
                </SocialIcon>
                <SocialIcon href="https://discord.gg/runerealm" target="_blank" rel="noopener noreferrer" className="discord">
                  <FontAwesomeIcon icon={faDiscord} />
                </SocialIcon>
                <SocialIcon href="https://t.me/runerealm" target="_blank" rel="noopener noreferrer" className="telegram">
                  <FontAwesomeIcon icon={faTelegram} />
                </SocialIcon>
              </SocialIcons>
              <Copyright>2025 RuneRealm. All rights reserved.</Copyright>
            </FooterColumn>
          </FooterTop>
        </ContentContainer>
      </FooterWrapper>
    </FooterSection>
  );
};

export default Footer;

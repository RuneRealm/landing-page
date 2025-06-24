import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../shared/components/Button';
import { AO } from '@arcaogaming/project-links';

const MintSection = styled.section`
  padding: 80px 0;
  position: relative;
  z-index: 2;
  text-align: center;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
  
  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-light);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: font-size 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 30px;
    max-width: 90%;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  
  .icon {
    font-size: 3rem;
    color: var(--primary-color);
    filter: drop-shadow(0 0 10px rgba(var(--primary-color-rgb), 0.6));
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Highlight = styled.span`
  color: var(--primary-color);
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  
  &:hover .arrow-icon {
    transform: translateX(5px);
  }
`;

const GameMint: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      }
    }
  };
  
  return (
    <MintSection ref={ref}>
      <SectionTitle
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        Support the Future of RuneRealm
      </SectionTitle>
      
      <ContentContainer
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <IconContainer>
          <FontAwesomeIcon icon={faHandHoldingHeart} className="icon" />
        </IconContainer>
        
        <Description>
          By delegating your AO Yield to the $GAME Fair Launch, you're not just redirecting resources—you're becoming an <Highlight>early-stage funder</Highlight> of the $GAME ecosystem.
        </Description>
        
        <Description>
          This exclusive delegation sets $GAME as your sole delegate, helping power its growth and development.
        </Description>
        
        <Description>
          Want more control? Visit the AO Delegations Page for granular options.
        </Description>
        
        <ButtonContainer>
          <ActionButton 
            primary
            onClick={() => window.open(AO.delegate, '_blank')}
          >
            Visit AO Delegations Page
            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
          </ActionButton>
        </ButtonContainer>
      </ContentContainer>
    </MintSection>
  );
};

export default GameMint;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../../../shared/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faGem, faDrumSteelpan } from '@fortawesome/free-solid-svg-icons';
import { RUNEREALM } from '@arcaogaming/project-links';

const EndowmentSection = styled.section`
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

const IconContainer = styled(motion.div)`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const GoldPotIcon = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  
  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
  
  .pot-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3.5rem;
    color: #4a3500; /* Dark brown for pot */
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
    z-index: 1;
    
    @media (max-width: 768px) {
      font-size: 3rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2.5rem;
    }
  }
  
  .coins-icon {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2.5rem;
    color: #ffd700; /* Gold color */
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
    z-index: 2;
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
      top: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
      top: 18px;
    }
  }
  
  .gem-icon {
    position: absolute;
    top: 5px;
    right: 25px;
    font-size: 1.5rem;
    color: #00ffff; /* Cyan for gem */
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.6));
    z-index: 3;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
      right: 22px;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      right: 20px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 15px;
    background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0) 70%);
    border-radius: 50%;
    
    @media (max-width: 768px) {
      width: 70px;
      height: 12px;
    }
    
    @media (max-width: 480px) {
      width: 60px;
      height: 10px;
    }
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: font-size 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ComingSoon = styled(motion.h3)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: font-size 0.3s ease, margin-bottom 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--text-light-secondary);
  transition: font-size 0.3s ease, margin-bottom 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 20px;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0 15px;
    margin-bottom: 2rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const DisabledButton = styled(Button)`
  opacity: 0.6;
  cursor: not-allowed;
  position: relative;
  
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

const ActiveButton = styled(Button)`
  position: relative;
`;

const ComingSoonNote = styled.span`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${DisabledButton}:hover & {
    opacity: 1;
  }
`;

const GameEndowment: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const iconVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
      }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.6,
      }
    }
  };
  
  return (
    <EndowmentSection ref={ref}>
      <IconContainer
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={iconVariants}
      >
        <GoldPotIcon>
          <FontAwesomeIcon icon={faDrumSteelpan} className="pot-icon" />
          <FontAwesomeIcon icon={faCoins} className="coins-icon" />
          <FontAwesomeIcon icon={faGem} className="gem-icon" />
        </GoldPotIcon>
      </IconContainer>
      
      <SectionTitle
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        The Game Endowment
      </SectionTitle>
      
      <ComingSoon
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={subtitleVariants}
      >
        Coming Soon
      </ComingSoon>
      
      <Description
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={descriptionVariants}
      >
        Every dollar of $GAME revenue from RuneRealm powers the $GAME Endowment—rewarding stakers and players with real, in-game earnings. The more you play and stake, the more you earn.
      </Description>
      
      <ButtonContainer
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={buttonVariants}
      >
        <DisabledButton>
          Stake $GAME Now
          <ComingSoonNote>Coming Soon</ComingSoonNote>
        </DisabledButton>
        
        <ActiveButton 
          primary
          onClick={() => window.open(`${RUNEREALM.gameSite}`, '_blank')}
        >
          Play Now
        </ActiveButton>
      </ButtonContainer>
    </EndowmentSection>
  );
};

export default GameEndowment;

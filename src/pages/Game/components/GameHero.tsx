import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  padding: 100px 0 60px;
  position: relative;
  z-index: 2;
  text-align: center;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 80px 0 40px;
  }
  
  @media (max-width: 480px) {
    padding: 60px 0 30px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: font-size 0.3s ease, margin 0.3s ease;
  
  span {
    color: var(--primary-color);
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: var(--text-light-secondary);
  transition: font-size 0.3s ease, padding 0.3s ease, margin 0.3s ease;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 1.3rem;
    max-width: 700px;
    padding: 0 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 20px;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 0 15px;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;

const GameHero: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
      }
    }
  };
  
  return (
    <HeroSection ref={ref}>
      <Title
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        $<span>GAME</span>
      </Title>
      <Description
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={descriptionVariants}
      >
        $GAME is the token powering the Gaming economy of RuneRealm & ArcAO, 
        enabling players to participate in a truly decentralized gaming experience.
      </Description>
    </HeroSection>
  );
};

export default GameHero;

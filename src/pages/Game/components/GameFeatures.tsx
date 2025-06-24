import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faBoxOpen, 
  faExchangeAlt, 
  faTicketAlt, 
  faKey,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = styled.section`
  padding: 60px 0 100px;
  position: relative;
  z-index: 2;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 40px 0 80px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 0 60px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  color: var(--text-light);
  transition: font-size 0.3s ease, margin-bottom 0.3s ease;
  
  span {
    color: var(--primary-color);
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 2.2rem;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  transition: gap 0.3s ease, padding 0.3s ease;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  padding: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #ffd54f; /* Golden yellow color */
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid rgba(255, 215, 0, 0.3); /* Golden border */
  transition: all 0.3s ease;
  
  svg {
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)); /* Golden glow */
  }
  
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: font-size 0.3s ease, margin-bottom 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-align: center;
  transition: font-size 0.3s ease, line-height 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

interface FeatureItem {
  icon: any;
  title: string;
  description: string;
}

// Create a separate feature card component to properly use hooks
const FeatureCardItem: React.FC<{ feature: FeatureItem; index: number }> = ({ feature, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
      }
    }
  };
  
  return (
    <FeatureCard
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={featureVariants}
    >
      <FeatureIcon>
        <FontAwesomeIcon icon={feature.icon} />
      </FeatureIcon>
      <FeatureTitle>{feature.title}</FeatureTitle>
      <FeatureDescription>{feature.description}</FeatureDescription>
    </FeatureCard>
  );
};

const GameFeatures: React.FC = () => {
  const features = [
    {
      icon: faShoppingCart,
      title: "In-Game Purchases",
      description: "Use $GAME tokens to buy weapons, armor, skins, and other items directly in the game marketplace."
    },
    {
      icon: faBoxOpen,
      title: "Lootboxes",
      description: "Open exclusive lootboxes with $GAME tokens for a chance to receive rare and legendary items."
    },
    {
      icon: faExchangeAlt,
      title: "P2P Trading",
      description: "Trade items securely with other players using $GAME as the medium of exchange with minimal fees."
    },
    {
      icon: faTicketAlt,
      title: "Subscriptions",
      description: "Subscribe to premium game features and receive exclusive monthly rewards with $GAME tokens."
    },
    {
      icon: faKey,
      title: "Access Codes",
      description: "Unlock special areas, events, and tournaments by purchasing access codes with $GAME tokens."
    },
    {
      icon: faTrophy,
      title: "Play to Earn Rewards",
      description: "Earn $GAME tokens by completing quests, winning battles, and participating in special events and tournaments."
    }
  ];
  
  return (
    <FeaturesSection>
      <SectionTitle>Token <span>Utility</span></SectionTitle>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCardItem key={index} feature={feature} index={index} />
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default GameFeatures;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faGem, faUserGroup, faWallet, faCrown, faShield } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = styled.section`
  padding: 100px 0;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
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
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #ffd54f; /* Golden yellow color that complements the brown/pink background */
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2); /* Darker background for better contrast */
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid rgba(255, 215, 0, 0.3); /* Golden border */
  
  svg {
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)); /* Golden glow */
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  text-align: center;
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

const Features: React.FC = () => {
  const features = [
    {
      icon: faGamepad,
      title: "Immersive Gameplay",
      description: "Engage in epic battles, challenging quests, and strategic gameplay in a vast fantasy world."
    },
    {
      icon: faWallet,
      title: "True Ownership",
      description: "Own your in-game assets as NFTs, with full control to trade, sell, or collect items as you wish."
    },
    {
      icon: faShield,
      title: "PvP Combat",
      description: "Test your skills against other players in thrilling player-versus-player combat arenas."
    },
    {
      icon: faUserGroup,
      title: "Community Driven",
      description: "Join guilds, make allies, and participate in a player-governed world with real impact."
    },
    {
      icon: faGem,
      title: "Rare Collectibles",
      description: "Discover and collect unique items with provable rarity and authenticity on the blockchain."
    },
    {
      icon: faCrown,
      title: "Play-to-Earn",
      description: "Earn rewards for your achievements and contributions to the RuneRealm world."
    }
  ];
  
  return (
    <FeaturesSection id="features">
      <SectionTitle>Game <span>Features</span></SectionTitle>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCardItem key={index} feature={feature} index={index} />
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;

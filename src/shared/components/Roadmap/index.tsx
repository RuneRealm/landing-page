import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const RoadmapSection = styled.section`
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  z-index: 2;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  span {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    width: 6px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isLeft: boolean }>`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.isLeft ? '0' : '50%'};
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 20px;
    left: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: var(--primary-color);
    border-radius: 50%;
    top: 15px;
    z-index: 1;
    
    right: ${props => props.isLeft ? '-12.5px' : 'auto'};
    left: ${props => props.isLeft ? 'auto' : '-12.5px'};
    
    @media (max-width: 768px) {
      left: 22px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 15px;
  padding: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    top: 15px;
    
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent rgba(255, 255, 255, 0.1);
    right: -10px;
    
    ${TimelineItem}:not([data-isleft='true']) & {
      border-width: 10px 10px 10px 0;
      border-color: transparent rgba(255, 255, 255, 0.1) transparent transparent;
      left: -10px;
      right: auto;
    }
    
    @media (max-width: 768px) {
      border-width: 10px 10px 10px 0 !important;
      border-color: transparent rgba(255, 255, 255, 0.1) transparent transparent !important;
      left: -10px !important;
      right: auto !important;
    }
  }
`;

const TimelineDate = styled.div`
  background: var(--primary-color);
  display: inline-block;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const TimelineList = styled.ul`
  list-style: none;
  margin-top: 15px;
`;

const TimelineListItem = styled.li`
  position: relative;
  padding-left: 25px;
  margin-bottom: 8px;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
  }
`;

interface Milestone {
  date: string;
  title: string;
  description: string;
  achievements: string[];
}

// Separate component for timeline items to properly use hooks
const TimelineMilestone: React.FC<{ milestone: Milestone; index: number }> = ({ milestone, index }) => {
  const isLeft = index % 2 === 0;
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  return (
    <TimelineItem
      key={index}
      isLeft={isLeft}
      data-isleft={isLeft}
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <TimelineContent>
        <TimelineDate>{milestone.date}</TimelineDate>
        <TimelineTitle>{milestone.title}</TimelineTitle>
        <TimelineDescription>
          {milestone.description}
        </TimelineDescription>
        
        <TimelineList>
          {milestone.achievements.map((achievement, i) => (
            <TimelineListItem key={i}>{achievement}</TimelineListItem>
          ))}
        </TimelineList>
      </TimelineContent>
    </TimelineItem>
  );
};

const Roadmap: React.FC = () => {
  const milestones = [
    {
      date: "Q4 2024",
      title: "Alpha Testing",
      description: "Our journey begins with a closed alpha test for our most dedicated community members.",
      achievements: [
        "Core gameplay mechanics",
        "Initial NFT minting for early supporters",
        "Basic marketplace functionality",
        "Community feedback integration system"
      ]
    },
    {
      date: "Q1 2025",
      title: "Beta Launch",
      description: "Expanding to a larger player base with improved systems based on alpha feedback.",
      achievements: [
        "Enhanced combat and progression systems",
        "Expanded world map with new regions",
        "Improved UI/UX based on community feedback",
        "Introduction of the governance token"
      ]
    },
    {
      date: "Q2 2025",
      title: "Guild Wars Update",
      description: "Introducing large-scale PvP and collaborative gameplay elements.",
      achievements: [
        "Guild formation and management system",
        "Territory control mechanics",
        "Guild vs Guild combat arenas",
        "Resource wars and economic competition"
      ]
    },
    {
      date: "Q3 2025",
      title: "Marketplace Expansion",
      description: "Opening up economic opportunities with a fully functional in game economomy & NFT marketplace.",
      achievements: [
        "Complete P2P trading system",
        "NFT rarity verification system",
        "Auction house implementation"
      ]
    },
    {
      date: "Q4 2025",
      title: "Mobile Launch",
      description: "Bringing the RuneRealm experience to iOS and Android devices.",
      achievements: [
        "Cross-platform progression",
        "Mobile-optimized controls",
        "Lite version for lower-end devices",
        "Mobile-exclusive collectibles"
      ]
    },
    {
      date: "2026 & Beyond",
      title: "Metaverse Integration",
      description: "Expanding RuneRealm into the broader metaverse ecosystem.",
      achievements: [
        "VR/AR support for immersive gameplay",
        "Cross-game asset compatibility",
        "3rd party developer API integration",
        "Community-created content marketplace"
      ]
    }
  ];
  
  return (
    <RoadmapSection id="roadmap">
      <Container>
        <SectionHeader>
          <SectionTitle>Our <span>Roadmap</span></SectionTitle>
          <SectionDescription>
            A glimpse into the future of RuneRealm. Our journey is just beginning, and we're excited to have you along for the ride.
          </SectionDescription>
        </SectionHeader>
        
        <Timeline>
          {milestones.map((milestone, index) => (
            <TimelineMilestone key={index} milestone={milestone} index={index} />
          ))}
        </Timeline>
      </Container>
    </RoadmapSection>
  );
};

export default Roadmap;

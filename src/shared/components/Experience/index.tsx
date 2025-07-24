import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../Button';
import { RUNEREALM } from '@arcaogaming/project-links';

const ExperienceSection = styled.section`
  padding: 100px 0;
  position: relative;
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

const ScreenshotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ScreenshotWrapper = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 0;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
  cursor: pointer;
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover::before {
    opacity: 0.3;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
    z-index: 1;
    transition: opacity 0.3s ease;
    opacity: 0.5;
  }
`;

const ScreenshotImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  z-index: 0;
`;

const ScreenshotFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  background: ${props => props.color || 'var(--primary-color)'};
  display: none;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-align: center;
  padding: 20px;
  z-index: -1;
  &.fallback {
    display: flex;
  }
`;

const ScreenshotCaption = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  z-index: 2;
  font-weight: 600;
`;

const TestimonialsContainer = styled.div`
  margin-top: 80px;
  text-align: center;
`;

const TestimonialsTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 40px;
  
  span {
    color: var(--primary-color);
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const TestimonialCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 15px;
  padding: 30px;
  text-align: left;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const CTAContainer = styled(motion.div)`
  text-align: center;
  margin-top: 80px;
`;

const CTATitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 30px;
`;

const Experience: React.FC = () => {
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [testimonialRef, testimonialInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [ctaRef, ctaInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const screenshots = [
    {
      color: "#705264",
      caption: "Epic Battle Systems",
      imagePath: "/images/screenshot-battle.jpg"
    },
    {
      color: "#ba7867",
      caption: "Stunning World Design",
      imagePath: "/images/screenshot-world.jpg"
    },
    {
      color: "#8b6276",
      caption: "Unique Character Customization",
      imagePath: "/images/screenshot-character.jpg"
    },
    {
      color: "#9c6c72",
      caption: "Rare Item Crafting",
      imagePath: "/images/screenshot-crafting.jpg"
    },
    {
      color: "#7a5968",
      caption: "Guild Warfare",
      imagePath: "/images/screenshot-guild.jpg"
    },
    {
      color: "#a76e6e",
      caption: "Legendary Boss Fights",
      imagePath: "/images/screenshot-boss.jpg"
    }
  ];
  
  const testimonials = [
    {
      text: "RuneRealm has completely changed my gaming experience. The ability to truly own my in-game items and trade them freely has made this more than just a game.",
      name: "Alex K.",
      title: "Guild Leader",
      initial: "A"
    },
    {
      text: "The world is incredibly immersive, and the gameplay is both challenging and rewarding. The integration of blockchain technology feels natural and enhances the experience.",
      name: "Sarah M.",
      title: "Veteran MMORPG Player",
      initial: "S"
    },
    {
      text: "I've been looking for a game that combines traditional MMORPG elements with true digital ownership. RuneRealm delivers on both fronts beautifully.",
      name: "Michael T.",
      title: "NFT Collector",
      initial: "M"
    }
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  
  return (
    <ExperienceSection id="experience" ref={sectionRef}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            Immersive <span>Experience</span>
          </SectionTitle>
          <SectionDescription>
            RuneRealm combines stunning visuals, engaging gameplay, and blockchain technology to create a one-of-a-kind gaming experience that puts players at the center.
          </SectionDescription>
        </SectionHeader>
        
        <ScreenshotsGrid>
          {screenshots.map((screenshot, index) => (
            <ScreenshotWrapper
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Try to load image first, fallback to colored div */}
              <ScreenshotImage 
                src={screenshot.imagePath} 
                alt={screenshot.caption} 
                onError={(e) => {
                  // If image fails to load, hide the img element
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show the fallback
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.fallback') as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }
                }}
              />
              <ScreenshotFallback className="fallback" color={screenshot.color}>
                {screenshot.caption}
              </ScreenshotFallback>
              <ScreenshotCaption>{screenshot.caption}</ScreenshotCaption>
            </ScreenshotWrapper>
          ))}
        </ScreenshotsGrid>
        
        <TestimonialsContainer ref={testimonialRef}>
          <TestimonialsTitle>
            What <span>Players</span> Say
          </TestimonialsTitle>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                custom={index}
                initial="hidden"
                animate={testimonialInView ? "visible" : "hidden"}
                variants={cardVariants}
              >
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {testimonial.initial}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorTitle>{testimonial.title}</AuthorTitle>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
        
        <CTAContainer
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <CTATitle>Ready to Begin Your Adventure?</CTATitle>
          <CTADescription>
            Join thousands of players already exploring the vast world of RuneRealm. Your legend awaits.
          </CTADescription>
          <Button
            onClick={() => window.open(RUNEREALM.gameSite, '_blank')}
            primary
            large
          >
            Play Now
          </Button>
        </CTAContainer>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;

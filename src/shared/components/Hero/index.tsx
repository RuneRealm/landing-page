import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../Button';
import { RUNEREALM } from '@arcaogaming/project-links';

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoBackground = styled.video<{ isBlurred: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${props => props.isBlurred ? 'brightness(0.7) blur(5px)' : 'brightness(0.8)'};
  transition: filter 0.5s ease;
`;

const FallbackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #705264, #ba7867);
`;

// Transparent overlay for video
const VideoOverlay = styled.div<{ opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${props => 0.3 + props.opacity * 0.3});
  z-index: 1;
  transition: background 0.5s ease;
`;

// Glassmorphism card that fades in on scroll
const GlassmorphismContent = styled(motion.div)<{ opacity: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  max-width: 800px;
  width: 90%;
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
  opacity: ${props => props.opacity};
  visibility: ${props => props.opacity > 0.05 ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  span {
    color: #ba7867;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PlayButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

// Enhanced button styling
const EnhancedButton = styled(Button)`
  font-size: 1.25rem;
  padding: 12px 36px;
  border-radius: 8px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px 30px;
  }
`;

const ScrollIndicator = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  z-index: 10;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  
  p {
    margin-bottom: 8px;
    font-size: 14px;
    opacity: 0.8;
  }
  
  .arrow {
    width: 30px;
    height: 30px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg);
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) rotate(-45deg);
    }
    40% {
      transform: translateY(-10px) rotate(-45deg);
    }
    60% {
      transform: translateY(-5px) rotate(-45deg);
    }
  }
`;

const ContinueIndicator = styled(motion.div)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: white;
  background: rgba(186, 120, 103, 0.8);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(186, 120, 103, 1);
  }
  
  .down-arrow {
    width: 12px;
    height: 12px;
    border-left: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(-45deg);
    margin-top: -5px;
  }
`;

const Hero: React.FC = () => {
  const [videoError, setVideoError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPast, setCanScrollPast] = useState(false);
  const [textFullyRevealed, setTextFullyRevealed] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScrollY = useRef(0);
  
  // Set video to start from second 6 and set playback speed to 2x
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 6;
      videoRef.current.playbackRate = 3.0; // Set playback speed to 2x
    }
  }, []);
  
  // Handle wheel events for text reveal
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!canScrollPast) {
        e.preventDefault();
        
        // Update scroll progress based on wheel delta
        const delta = e.deltaY;
        setScrollProgress(prev => {
          const newProgress = Math.max(0, Math.min(prev + delta / 500, 1));
          
          // Enable scrolling past when text is fully visible
          if (newProgress >= 1 && !canScrollPast) {
            setCanScrollPast(true);
            setTextFullyRevealed(true);
            setShowContinueButton(true);
          }
          
          return newProgress;
        });
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [canScrollPast]);
  
  // // Handle scroll events
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!heroRef.current) return;
      
  //     const scrollTop = window.scrollY;
      
  //     // If we can't scroll past yet, lock at the top
  //     if (!canScrollPast && scrollTop > 0) {
  //       window.scrollTo(0, 0);
  //     }
      
  //     // Store last scroll position
  //     lastScrollY.current = scrollTop;
  //   };
    
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [canScrollPast]);
  
  // Handle touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!canScrollPast) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        
        // Update scroll progress based on touch movement
        setScrollProgress(prev => {
          const newProgress = Math.max(0, Math.min(prev + deltaY / 300, 1));
          
          // Enable scrolling past when text is fully visible
          if (newProgress >= 1 && !canScrollPast) {
            setCanScrollPast(true);
            setTextFullyRevealed(true);
            setShowContinueButton(true);
          }
          
          return newProgress;
        });
        
        touchStartY = touchY;
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [canScrollPast]);
  
  // Handle keydown events for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canScrollPast && e.key === 'ArrowDown') {
        e.preventDefault();
        
        // Increase scroll progress on key down
        setScrollProgress(prev => {
          const newProgress = Math.min(prev + 0.1, 1);
          
          // Enable scrolling past when text is fully visible
          if (newProgress >= 1 && !canScrollPast) {
            setCanScrollPast(true);
            setTextFullyRevealed(true);
            setShowContinueButton(true);
          }
          
          return newProgress;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canScrollPast]);

  // Handle the continue button click
  const handleContinueClick = () => {
    setCanScrollPast(true);
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <HeroSection id="home" ref={heroRef}>
      {!videoError ? (
        <VideoBackground 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          onError={() => setVideoError(true)}
          src="/videos/rune-realm-video.mp4"
          isBlurred={scrollProgress > 0.2}
        />
      ) : (
        <FallbackBackground />
      )}
      
      <VideoOverlay opacity={scrollProgress} />
      
      {/* Glassmorphism content that fades in */}
      <GlassmorphismContent opacity={scrollProgress}>
        <Title>
          <span>#1 Onchain MMORPG</span>
        </Title>
        <Subtitle>
          Forge Your Legend in the RuneRealm
        </Subtitle>
        <Description>
          Experience a groundbreaking MMORPG where players truly own their in-game assets and destiny through blockchain technology.
        </Description>
        
        {/* Play button inside the glassmorphism panel */}
        <PlayButtonContainer>
          <EnhancedButton 
            primary
            onClick={() => window.open(`${RUNEREALM.gameSite}`, '_blank')}
          >
            Play Now
          </EnhancedButton>
        </PlayButtonContainer>
      </GlassmorphismContent>
      
      {/* Scroll indicator - hide when continue button is shown */}
      <ScrollIndicator visible={!canScrollPast && !showContinueButton}>
        <p>Scroll to discover</p>
        <div className="arrow"></div>
      </ScrollIndicator>
      
      {/* Continue button - only shows when text is fully revealed */}
      {showContinueButton && !canScrollPast && (
        <ContinueIndicator
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleContinueClick}
        >
          Continue <div className="down-arrow"></div>
        </ContinueIndicator>
      )}
    </HeroSection>
  );
};

export default Hero;

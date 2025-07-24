import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../Button';
import { BAZAR } from '@arcaogaming/project-links';

const OwnershipSection = styled.section`
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const OwnershipContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 992px) {
    flex: none;
    width: 100%;
  }
`;

const ImageColumn = styled(motion.div)`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 992px) {
    flex: none;
    width: 100%;
    order: -1;
    margin-bottom: 30px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  
  span {
    color: #ffd54f; /* Golden yellow color to match Feature icons */
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 40px;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  color: #ffd54f;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

const AssetImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 215, 0, 0.3);
`;

const AssetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.5s ease;
`;

const FallbackAssetImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 20px;
`;

const NFTLabel = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffd54f;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  z-index: 2;
  border: 1px solid rgba(255, 215, 0, 0.3);
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
`;

const CarouselDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ffd54f' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ffd54f' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const Ownership: React.FC = () => {
  const [contentRef, contentInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [imageRef, imageInView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [imageError, setImageError] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nftImages = [
    { src: "/images/earth-nft.png", alt: "Earth Element NFT", label: "Earth Element" },
    { src: "/images/fire-nft.png", alt: "Fire Element NFT", label: "Fire Element" },
    { src: "/images/water-nft.png", alt: "Water Element NFT", label: "Water Element" },
    { src: "/images/wind-nft.png", alt: "Wind Element NFT", label: "Wind Element" }
  ];
  
  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % nftImages.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [nftImages.length]);
  
  const features = [
    {
      title: "NFT-Backed Items",
      description: "Every weapon, armor, and rare item is tokenized on blockchain"
    },
    {
      title: "Player-to-Player Trading",
      description: "Trade directly with other players without intermediaries"
    },
    {
      title: "Provable Rarity",
      description: "Verify the authenticity and scarcity of your digital assets"
    }
  ];
  
  return (
    <OwnershipSection id="ownership">
      <OwnershipContainer>
        <ContentColumn
          ref={contentRef}
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>
            True <span>Ownership</span> of Your Adventure
          </SectionTitle>
          
          <SectionDescription>
            For the first time, players have complete ownership of their in-game assets through blockchain technology. Every item you earn or craft belongs to you - not just in the game, but in the real world too.
          </SectionDescription>
          
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FeatureIcon>
                  <span>✓</span>
                </FeatureIcon>
                <FeatureText>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureText>
              </FeatureItem>
            ))}
          </FeatureList>
          
          <Button
            onClick={() => window.open(BAZAR.website, '_blank')}
            primary
          >
            Explore NFT Marketplace
          </Button>
        </ContentColumn>
        
        <ImageColumn
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={imageInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8 }}
        >
          <AssetImageContainer>
            {!imageError ? (
              <>
                {nftImages.map((image, index) => (
                  <React.Fragment key={index}>
                    <AssetImage 
                      src={image.src}
                      alt={image.alt}
                      style={{ opacity: currentImageIndex === index ? 1 : 0, position: 'absolute', top: 0, left: 0 }}
                      onError={() => setImageError(true)}
                    />
                    {currentImageIndex === index && (
                      <NFTLabel>{image.label}</NFTLabel>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <FallbackAssetImage>
                RuneRealm NFT Items
              </FallbackAssetImage>
            )}
          </AssetImageContainer>
          
          <CarouselControls>
            {nftImages.map((_, index) => (
              <CarouselDot 
                key={index} 
                active={currentImageIndex === index}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </CarouselControls>
        </ImageColumn>
      </OwnershipContainer>
    </OwnershipSection>
  );
};

export default Ownership;

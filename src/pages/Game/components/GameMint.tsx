import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../shared/components/Button';
import { AO } from '@arcaogaming/project-links';
import { useDelegation } from '../../../shared/context';
import WalletConnection from '../../../shared/components/Wallet/WalletConnection';
import { useWallet } from '../../../shared/context/WalletContext';
import { AUTONOMOUS_FINANCE } from 'ao-js-sdk/src/processes/ids/autonomous-finance';

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
  gap: 15px;
  flex-wrap: wrap;
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

const DelegationContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: left;
`;

const DelegationTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--text-light);
`;

const DelegationItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DelegationName = styled.span`
  font-weight: 500;
`;

const DelegationValue = styled.span`
  color: var(--primary-color);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GameMint: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { isConnected } = useWallet()
  const { delegations, loading, settingDelegation, setGameDelegation } = useDelegation();

  // Delegation logic is now handled by the DelegationProvider

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
        Fuel RuneRealm’s Rise - Delegate to $GAME
      </SectionTitle>

      <ContentContainer
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <IconContainer>
          <FontAwesomeIcon icon={faHandHoldingHeart} className="icon" />
        </IconContainer>

        <WalletConnection />

        {isConnected && (
          <div style={{ minHeight: '150px' }}>
            {loading ? (
              <LoadingSpinner>
                <FontAwesomeIcon icon={faSpinner} className="spinner" size="2x" />
              </LoadingSpinner>
            ) : (
              <DelegationContainer>
                <DelegationTitle>Your Current Delegations</DelegationTitle>
                {delegations.length > 0 ? (
                  delegations.map((delegation, index) => (
                    <DelegationItem key={index}>
                      <DelegationName>
                        {Object.entries(AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES).find(
                          ([key, value]) => value === delegation.delegatee
                        ) 
                          ? Object.entries(AUTONOMOUS_FINANCE.FAIR_LAUNCH_PROCESSES).find(
                              ([key, value]) => value === delegation.delegatee
                            )[0]
                          : delegation.delegatee}
                      </DelegationName>
                      <DelegationValue>{delegation.percentage}%</DelegationValue>
                    </DelegationItem>
                  ))
                ) : (
                  <Description>No delegations found. Set $GAME as your delegate to support the project.</Description>
                )}
              </DelegationContainer>
            )}
            <ButtonContainer>
              {isConnected && (
                <ActionButton
                  primary
                  onClick={setGameDelegation}
                  disabled={settingDelegation}
                >
                  {settingDelegation ? (
                    <>
                      Setting Delegation...
                      <FontAwesomeIcon icon={faSpinner} className="spinner" spin />
                    </>
                  ) : (
                    <>
                      Set $GAME as Delegate
                      <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
                    </>
                  )}
                </ActionButton>
              )}
            </ButtonContainer>
          </div>
        )}

        <Description>
          Fuel RuneRealm’s Rise. By delegating your AO Yield to the $GAME Fair Launch, you are not just redirecting resources. You are stepping in as an <Highlight>early-stage funder</Highlight> of the $GAME ecosystem.
        </Description>

        <Description>
          This exclusive delegation makes $GAME your sole delegate, directly powering its growth, development, and onchain game economy.
        </Description>

        <Description>
          Prefer flexibility? Visit the AO Delegations Page to fine-tune your support.
        </Description>



        <ButtonContainer>

          <ActionButton
            primary={!isConnected}
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

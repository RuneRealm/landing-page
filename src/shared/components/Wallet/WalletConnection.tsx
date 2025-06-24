import React, { useState } from 'react';
import styled from 'styled-components';
import UserProfile from '../../UserProfile/UserProfile';
import { useWallet } from '../../context/WalletContext';
import Button from '../../components/Button';

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Custom styled Button for consistent spacing in the wallet container
const WalletButton = styled(Button)`
  @media (max-width: 768px) {
    padding: 8px 20px;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 6px 16px;
    font-size: 0.9rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

interface WalletConnectionProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  isConnected?: boolean;
}

const WalletConnection: React.FC<WalletConnectionProps> = ({
  onConnect,
  onDisconnect,
  isConnected: externalIsConnected,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { 
    isConnected: contextIsConnected, 
    connect: contextConnect, 
    disconnect: contextDisconnect,
    address,
    bazarProfile
  } = useWallet();

  // Use external isConnected prop if provided, otherwise use context value
  const isConnected = typeof externalIsConnected !== 'undefined' ? externalIsConnected : contextIsConnected;

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const address = await contextConnect();
      onConnect?.(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    contextDisconnect();
    onDisconnect?.();
  };

  const handleCopyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
  };

  return (
    <WalletContainer>
      {!isConnected ? (
        <WalletButton 
          primary 
          onClick={handleConnect} 
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </WalletButton>
      ) : (
        <>
          {address && (
            <ProfileContainer>
              <UserProfile 
                address={address}
                bazarProfile={bazarProfile}
                onCopyAddress={handleCopyAddress}
              />
            </ProfileContainer>
          )}
          <WalletButton 
            onClick={handleDisconnect}
          >
            Disconnect
          </WalletButton>
        </>
      )}
    </WalletContainer>
  );
};

export default WalletConnection;

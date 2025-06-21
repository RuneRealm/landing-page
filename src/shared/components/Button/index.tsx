import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  large?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.large ? '12px 32px' : '10px 24px'};
  font-size: ${props => props.large ? '1.1rem' : '1rem'};
  font-weight: 600;
  border-radius: 8px;
  transition: all var(--transition-speed);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  ${props => props.primary ? css`
    background: var(--primary-color);
    color: white;
    
    &:hover {
      background: #c98978;
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  ` : css`
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    color: white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
    z-index: -1;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const Button: React.FC<ButtonProps> = ({
  primary = false,
  large = false,
  type = 'button',
  disabled = false,
  className = '',
  children,
  onClick,
}) => {
  return (
    <StyledButton
      primary={primary}
      large={large}
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

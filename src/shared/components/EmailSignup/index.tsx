import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../Button';

const SignupSection = styled.section`
  padding: 100px 0;
  position: relative;
  z-index: 2;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const SignupCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SignupTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  span {
    color: #ffffff;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SignupDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CustomForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-light);
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(186, 120, 103, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-light);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(186, 120, 103, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled.div`
  background: rgba(38, 166, 91, 0.2);
  color: #4CAF50;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid rgba(38, 166, 91, 0.3);
`;

const ErrorMessage = styled.div`
  background: rgba(239, 83, 80, 0.2);
  color: #ef5350;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid rgba(239, 83, 80, 0.3);
`;

const EmailSignup: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // We'll use the same form ID from the iframe
      const formId = 'snVqxVq6MskSoOrJK6vB';
      const endpoint = `https://link.we-grow.agency/api/v1/form-capture/${formId}`;
      
      // Create form data
      const formData = new FormData();
      formData.append('email', email);
      
      if (message) {
        formData.append('message', message);
      }
      
      // Send the request
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }
      
      // Success!
      setSuccess(true);
      setEmail('');
      setMessage('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SignupSection id="signup">
      <Container>
        <SignupCard
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SignupTitle>
            Stay <span>Updated</span>
          </SignupTitle>
          
          <SignupDescription>
            Sign up to receive the latest news, exclusive drops, and special offers from RuneRealm.
          </SignupDescription>
          
          {success ? (
            <SuccessMessage>
              Thank you for subscribing! We'll keep you updated with the latest news and exclusive offers.
            </SuccessMessage>
          ) : (
            <CustomForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message (Optional)</Label>
                <TextArea 
                  id="message" 
                  placeholder="Any questions or comments?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <ButtonWrapper>
                <Button type="submit" disabled={loading}>
                  Subscribe {loading && <LoadingSpinner />}
                </Button>
              </ButtonWrapper>
            </CustomForm>
          )}
        </SignupCard>
      </Container>
    </SignupSection>
  );
};

export default EmailSignup;

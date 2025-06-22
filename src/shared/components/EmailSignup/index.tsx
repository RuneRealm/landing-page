import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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


const IframeContainer = styled.div`
  /* Reset styles but maintain box model */
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  
  /* Essential dimensions */
  width: 100%;
  height: 400px;
  margin-top: 20px;
  
  /* Create a new stacking context to isolate the iframe */
  position: relative;
  z-index: 1;
  display: block;
`;

const IframeStyled = styled.iframe`
  all: initial; /* Reset all properties */
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  display: block;
  background: transparent;
  color: inherit;
  font: inherit;
  /* Prevent inheritance */
  * {
    all: revert;
  }
`;

const EmailSignup: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Load the form embed script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.we-grow.agency/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <SignupSection id="signup">
      <Container>
        <SignupCard
          ref={ref}
          initial={{ opacity: 1, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <SignupTitle>
            Stay <span>Updated</span>
          </SignupTitle>
          
          <SignupDescription>
            Sign up to receive the latest news, exclusive drops, and special offers from RuneRealm.
          </SignupDescription>
          
          <IframeContainer>
            <IframeStyled
              src="https://link.we-grow.agency/widget/form/gARpJ5UzRBcl2xt3B9PR"
              id="inline-gARpJ5UzRBcl2xt3B9PR" 
              data-layout={`{"id":"INLINE"}`}
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="RuneRealm Email Signup"
              data-height="400"
              data-layout-iframe-id="inline-gARpJ5UzRBcl2xt3B9PR"
              data-form-id="gARpJ5UzRBcl2xt3B9PR"
              title="RuneRealm Email Signup"
            />
          </IframeContainer>
        </SignupCard>
      </Container>
    </SignupSection>
  );
};

export default EmailSignup;

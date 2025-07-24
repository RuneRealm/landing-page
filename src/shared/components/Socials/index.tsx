  import React from 'react';
  import styled from 'styled-components';
  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faDiscord, faTelegram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
  import { RUNEREALM } from '@arcaogaming/project-links';

  // We'll use the public path instead of imports

  const SocialsSection = styled.section`
    padding: 80px 0;
    position: relative;
    z-index: 2;
  `;

  const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `;

  const SectionTitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 50px;
    text-align: center;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  `;


  const SocialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      max-width: 400px;
      margin: 0 auto;
    }
  `;

  const SocialCard = styled(motion.a)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 15px;
    padding: 40px 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: var(--text-light);
    
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  `;

  const SocialIcon = styled.div`
    font-size: 2.5rem;
    margin-bottom: 20px;
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &.twitter {
      color: black;
      text-shadow: 0 0 10px rgba(29, 161, 242, 0.5);
    }
    
    &.discord {
      color: #7289DA;
      text-shadow: 0 0 10px rgba(114, 137, 218, 0.5);
    }
    
    &.telegram {
      color: #0088cc;
      text-shadow: 0 0 10px rgba(0, 136, 204, 0.5);
    }

    &.youtube {
      color: #FF0000;
      text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }

    ${SocialCard}:hover & {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  `;

  const SocialTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 10px;
  `;

  const SocialDescription = styled.p`
    font-size: 1rem;
    opacity: 0.9;
  `;

  const Socials: React.FC = () => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });
    
    const socialLinks = [
      {
        icon: faXTwitter,
        title: "Twitter",
        description: "Follow us for the latest updates and announcements",
        url: RUNEREALM.twitterFollow,
        className: "twitter"
      },
      {
        icon: faDiscord,
        title: "Discord",
        description: "Join our community to connect with other players",
        url: RUNEREALM.discord,
        className: "discord"
      },
      {
        icon: faTelegram,
        title: "Telegram",
        description: "Stay updated with news and chat with the team",
        url: RUNEREALM.telegram,
        className: "telegram"
      },
      {
        icon: faYoutube,
        title: "YouTube",
        description: "Watch gameplay videos, trailers, and updates",
        url: RUNEREALM.youtube,
        className: "youtube"
      }
    ];
    
    const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.2,
          duration: 0.5
        }
      })
    };
    
    return (
      <SocialsSection id="socials" ref={ref}>
        <Container>
          <SectionTitle>Connect With Us</SectionTitle>
          
          <SocialsGrid>
            {socialLinks.map((social, index) => (
              <SocialCard
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
              >
                <SocialIcon className={social.className}>
                  <FontAwesomeIcon icon={social.icon} />
                </SocialIcon>
                <SocialTitle>{social.title}</SocialTitle>
                <SocialDescription>{social.description}</SocialDescription>
              </SocialCard>
            ))}
          </SocialsGrid>
        </Container>
      </SocialsSection>
    );
  };

  export default Socials;
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter } from 'react-icons/fa';
import branding from '../branding.json';

const ContactContainer = styled.section`
  padding: 100px 0;
  background: #f0f2f5;
  text-align: center;
`;

const ContactContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactInfo = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 20px;
  font-size: 1.1rem;

  svg {
    margin-right: 10px;
    color: ${branding.brand.colors.primary};
  }
`;

const SocialLinks = styled.div`
  margin-top: 30px;

  a {
    color: #333;
    font-size: 2rem;
    margin: 0 15px;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${branding.brand.colors.primary};
    }
  }
`;

const Contact = () => {
  return (
    <ContactContainer id="contact">
      <ContactContent
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1>Contact Us</h1>
        <ContactInfo>
          <ContactItem>
            <FaEnvelope />
            <span>{branding.brand.email}</span>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <span>{branding.brand.mobile}</span>
          </ContactItem>
        </ContactInfo>
        <SocialLinks>
          <a href={branding.brand.socialMedia.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href={branding.brand.socialMedia.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        </SocialLinks>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
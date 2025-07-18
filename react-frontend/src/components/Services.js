import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ServicesContainer = styled.section`
  padding: 100px 0;
  background: #fff;
  text-align: center;
`;

const ServicesContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServiceCard = styled(motion.div)`
  background: #f0f2f5;
  padding: 30px;
  border-radius: 10px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: inline-block;
  width: 30%;
  vertical-align: top;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesContent
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1>Our Services</h1>
        <ServiceCard
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>AI Product Engineering</h3>
          <p>From concept to deployment, we build robust AI-powered products.</p>
        </ServiceCard>
        <ServiceCard
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Multi-Agent Orchestration</h3>
          <p>Develop and manage complex AI systems with multiple interacting agents.</p>
        </ServiceCard>
        <ServiceCard
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>Custom AI Solutions</h3>
          <p>Tailored AI solutions to meet your unique business challenges.</p>
        </ServiceCard>
      </ServicesContent>
    </ServicesContainer>
  );
};

export default Services;
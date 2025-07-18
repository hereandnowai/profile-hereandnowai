import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  padding: 100px 0;
  background: #f0f2f5;
  text-align: center;
`;

const AboutContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <AboutContent
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1>About Us</h1>
        <p>
          HERE AND NOW AI specializes in AI product engineering, delivering cutting-edge solutions from data science prototypes to multi-agent orchestration frameworks. We are committed to building innovative AI applications and agents that scale with your needs.
        </p>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
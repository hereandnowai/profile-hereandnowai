import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LeadershipContainer = styled.section`
  padding: 100px 0;
  background: #f9f9f9;
  text-align: center;
`;

const LeadershipContent = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TeamMemberCard = styled(motion.div)`
  background: #fff;
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

const Leadership = () => {
  return (
    <LeadershipContainer id="leadership">
      <LeadershipContent
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1>Our Leadership</h1>
        <TeamMemberCard
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>John Doe</h3>
          <p>CEO & Founder</p>
          <p>John is a visionary leader with over 20 years of experience in AI and machine learning.</p>
        </TeamMemberCard>
        <TeamMemberCard
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Jane Smith</h3>
          <p>CTO</p>
          <p>Jane leads our technical team, driving innovation and developing cutting-edge AI solutions.</p>
        </TeamMemberCard>
      </LeadershipContent>
    </LeadershipContainer>
  );
};

export default Leadership;
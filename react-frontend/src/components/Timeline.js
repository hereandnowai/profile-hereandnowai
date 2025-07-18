import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt } from 'react-icons/fa';
import branding from '../branding.json';

const TimelineContainer = styled.section`
  padding: 100px 0;
  background: #f9f9f9;
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80%;
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;

  &:nth-child(odd) {
    left: 0;
  }

  &:nth-child(even) {
    left: 50%;
  }
`;

const TimelineContent = styled(motion.div)`
  padding: 20px 30px;
  background: #fff;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const TimelineYear = styled.span`
  font-weight: bold;
  color: ${branding.brand.colors.primary};
`;

const TimelineIcon = styled.div`
    position: absolute;
    top: 20px;
    right: -20px;
    background-color: ${branding.brand.colors.secondary};
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

const timelineData = [
    { year: "2011–2017", text: "Built data‑science & language‑processing prototypes" },
    { year: "2018", text: "Transitioned into AI product development; launched first GPT‑2‑powered enterprise chatbot called Caramel AI" },
    { year: "2019–2022", text: "Delivered RPA solutions and multi‑agent orchestration frameworks to clients" },
    { year: "2023–Present", text: "Building AI Applications, AI Agents, Scaling Model Context Protocol (MCP) and Agent‑to‑Agent (A2A) integrations; deploying ~10 AI agents daily" },
];

const Timeline = () => {
  return (
    <TimelineContainer id="timeline">
        <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Our Journey</h1>
      <TimelineWrapper>
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineContent
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineYear>{item.year}</TimelineYear>
              <p>{item.text}</p>
              <TimelineIcon><FaRegCalendarAlt /></TimelineIcon>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline;
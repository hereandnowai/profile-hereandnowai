import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import branding from '../branding.json';

const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroH1 = styled(motion.h1)`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const HeroP = styled(motion.p)`
  margin-top: 24px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Hero = () => {
  return (
    <HeroContainer id="hero">
      <HeroBg />
      <HeroContent>
        <HeroH1 initial={{ y: -250 }} animate={{ y: -10 }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
          {branding.brand.organizationName}
        </HeroH1>
        <HeroP initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          {branding.brand.slogan}
        </HeroP>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Services from './components/Services';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import branding from './branding.json';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Chau Philomene One', cursive;
    background-color: #fff;
    color: #333;
    line-height: 1.6;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <Chatbot />
        <Hero />
        <About />
        <Timeline />
        <Services />
        <Leadership />
        <Contact />
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
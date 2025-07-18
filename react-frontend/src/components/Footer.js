import React from 'react';
import styled from 'styled-components';
import branding from '../branding.json';

const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  padding: 40px 0;
  text-align: center;
  font-size: 0.9rem;
`;

const FooterLink = styled.a`
  color: ${branding.brand.colors.primary};
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} {branding.brand.organizationName}. All rights reserved.</p>
      <p>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
      </p>
    </FooterContainer>
  );
};

export default Footer;
import React from 'react';
import { Box, Container, Column, Row, FooterLink, Heading } from './FooterStyles';

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="/about">Company</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Rentals</FooterLink>
            <FooterLink href="#">Sales</FooterLink>
            <FooterLink href="#">Property Management</FooterLink>
          </Column>
          <Column>
            <Heading>Resources</Heading>
            <FooterLink href="#">FAQs</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
          </Column>
          <Column>
            <Heading>Follow Us</Heading>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footer;

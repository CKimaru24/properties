import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';

import house1 from '../images/house-1.jpg';
import house3 from '../images/house-3.jpg';
import search from '../images/search.png'
import application from '../images/application.jpg'
import communication from '../images/communication.avif'
import payment from '../images/payment.avif'
import maintenance from '../images/maintenance.avif'
import feedback from '../images/feedback.avif'
import management from '../images/management.avif'
import notification from '../images/notification.avif'
import mission from '../images/mission.avif'
import list from '../images/list.avif'

const About = () => {
  const aboutData = [
    {
      heading: 'SmartRentals',
      content: 'Discover the best rental properties for your next stay. Whether you are a tenant looking for a comfortable and convenient place to live, or a landlord seeking reliable and responsible tenants, SmartRentals has you covered.',
      image: house1,
    },
    {
      heading: 'Our Mission',
      content: 'Providing a seamless and enjoyable rental experience for both tenants and landlords is our mission. We strive to match tenants with their ideal rental properties and assist landlords in finding trustworthy tenants, making the rental process efficient and hassle-free for all parties involved.',
      image: mission,
    },
    {
      heading: 'Rental Property Listings',
      content: 'Browse and search through a comprehensive database of rental properties available for tenants.',
      image: house3, // Add image URL for this service
    },
    {
      heading: 'Tenant Search',
      content: 'Enable landlords to search for potential tenants based on their requirements and preferences.',
      image: search, // Add image URL for this service
    },
    {
      heading: 'Tenant Applications',
      content: 'Allow tenants to submit rental applications online with their personal and employment details.',
      image: application, // Add image URL for this service
    },
    {
      heading: 'Landlord Listings',
      content: 'Enable landlords to create and manage listings for their rental properties.',
      image: list, // Add image URL for this service
    },
    {
      heading: 'Communication',
      content: 'Facilitate direct communication between tenants and landlords for inquiries, agreements, and requests.',
      image: communication, // Add image URL for this service
    },
    {
      heading: 'Rental Payments',
      content: 'Provide a secure and convenient online payment system for tenants to make rental payments.',
      image: payment, // Add image URL for this service
    },
    {
      heading: 'Maintenance Requests',
      content: 'Allow tenants to submit maintenance requests for timely repairs and issue resolution.',
      image: maintenance, // Add image URL for this service
    },
    {
      heading: 'Reviews and Ratings',
      content: 'Enable tenants to provide feedback and reviews about their rental experience and landlords.',
      image: feedback, // Add image URL for this service
    },
    {
      heading: 'Account Management',
      content: 'Offer user account management functionality for tenants and landlords to update their profiles and access relevant features.',
      image: management, // Add image URL for this service
    },
    {
      heading: 'Notifications',
      content: 'Send notifications to users regarding property updates, payments, requests, and important information.',
      image: notification, // Add image URL for this service
    },
    // Add more sections as needed
  ];

  return (
    <>
      <StyledAbout>
        <h1>About Us</h1>
        <p>Welcome to SmartRentals! We offer the best rental properties for your next stay. Whether you are a tenant looking for a comfortable and convenient place to live, or a landlord seeking reliable and responsible tenants, SmartRentals has you covered. Our mission is to provide a seamless and enjoyable rental experience for both tenants and landlords. We strive to match tenants with their ideal rental properties and assist landlords in finding trustworthy tenants, making the rental process efficient and hassle-free for all parties involved and also a platform for them to manage their properties.</p>

        {aboutData.map((section, index) => (
          <StyledSection key={index}>
            <div className="image-container">
              <img src={section.image} alt={`Image ${index + 1}`} />
            </div>
            <div className="content-container">
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
            </div>
          </StyledSection>
        ))}
      </StyledAbout>
      <Footer/>
    </>
  );
};

const StyledAbout = styled.div`
  padding: 2rem;

  h1 {
    font-size: 28px;
    font-weight: bold;
    padding-top: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #333; /* Set the desired color for the title */
  }

  p {
    font-size: 16px;
    margin-bottom: 2rem;
  }
`;

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1.5rem;

  .image-container {
    flex: 1;
    text-align: center;
    padding: 1rem;

    img {
      width: 100%;
      max-width: 400px;
      height: auto;
    }
  }

  .content-container {
    flex: 1;
    padding: 1rem;

    h2 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 16px;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    .image-container {
      order: 2;
    }

    .content-container {
      order: 1;
    }
  }
`;

export default About;

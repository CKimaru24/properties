import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import { FaBed, FaCreditCard, FaFilePdf } from "react-icons/fa";
import Sidenav from "./Layout/Sidenav";
import Topbar from "./Layout/Topbar";
// import { BsBed, BsCreditCard, BsFillFileEarmarkPdf } from "react-icons/bs";

const Properties = () => {
    const [properties, setProperties] = useState([]);
  
    // Simulated fetch from database
    useEffect(() => {
      // Fetch properties data from the database here
      // Example:
      const fetchProperties = async () => {
        try {
          const response = await fetch("/properties");
          const data = await response.json();
          setProperties(data);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
  
      fetchProperties();
    }, []);
  
    return (
        <>
        <Topbar/>
      <Container>
        
        <Header>
          <Button>
            <AiOutlinePlus />
            Add Listing
          </Button>
          <Button>
            <AiOutlineEye />
            View All Listings
          </Button>
        </Header>
        <Body>
          {properties.map((property) => (
            <Card key={property.id}>
              <ApartmentName>{property.name}</ApartmentName>
              <Location>{property.location}</Location>
              <PropertyInfo>
                <Icon>
                  <FaBed />
                </Icon>
                <Info>Beds: {property.beds}</Info>
              </PropertyInfo>
              <PropertyInfo>
                <Icon>
                  <FaCreditCard />
                </Icon>
                <Info>Price: ${property.price}</Info>
              </PropertyInfo>
              <PropertyInfo>
                <Icon>
                  <FaFilePdf />
                </Icon>
                <Info>
                  Floor Plan:{" "}
                  <PdfLink href={property.floorPlan}>View</PdfLink>
                </Info>
              </PropertyInfo>
              <Links>
                <Link>ENQUIRIES</Link>
                <Link>DETAILS</Link>
              </Links>
            </Card>
          ))}
        </Body>
      </Container>
      </>
    );
  };

const Container = styled.div`
//   display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  background-color: #f1f1f1;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
`;

const ApartmentName = styled.h3`
  margin-bottom: 10px;
`;

const Location = styled.p`
  margin-bottom: 10px;
`;

const PropertyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const Info = styled.span``;

const PdfLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Link = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export default Properties;

import React, {useEffect, useState, useRef} from "react";
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import { FaBed, FaCreditCard, FaFilePdf } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import Topbar from "./Layout/Topbar";
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { IoMdArrowBack, IoMdArrowForward, IoMdArrowRoundForward } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { Button } from './Button';

const LandlordTenants = () => {
    const [tenants, setTenants] = useState([]);

    const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back
    navigate(-1);
  };
  
    // Simulated fetch from database
    useEffect(() => {
      // Fetch tenants data from the database here
      // Example:
      const fetchTenants = async () => {
        try {
          const response = await fetch("/tenants");
          const data = await response.json();
          setTenants(data);
        } catch (error) {
          console.error("Error fetching tenants:", error);
        }
      };
  
      fetchTenants();
    }, []);

    const [listings, setListings] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState([]);

  useEffect(() => {
    fetch('/listings')
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
        setActiveImageIndex(Array(data.length).fill(0));
      });
  }, []);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setActiveImageIndex((activeImageIndex) =>
        activeImageIndex.map((index, i) =>
          index === listings[i].images.length - 1 ? 0 : index + 1
        )
      );
    };

    timeoutRef.current = setTimeout(nextSlide, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeImageIndex, listings]);

  const nextSlide = (index) => {
    setActiveImageIndex((activeImageIndex) =>
      activeImageIndex.map((imageIndex, i) =>
        i === index
          ? imageIndex === listings[i].images.length - 1
            ? 0
            : imageIndex + 1
          : imageIndex
      )
    );
  };

  const prevSlide = (index) => {
    setActiveImageIndex((activeImageIndex) =>
      activeImageIndex.map((imageIndex, i) =>
        i === index
          ? imageIndex === 0
            ? listings[i].images.length - 1
            : imageIndex - 1
          : imageIndex
      )
    );
  };
  
    return (
        <>
        <Topbar/>
      <Container>
        
        <Header>
          <NavLink to="/addTenants">
            <AiOutlinePlus />
            Add Tenant
          </NavLink>
          <NavLink to="/tenants">
            <AiOutlineEye />
            View All Tenants
          </NavLink>
        </Header>
        <Body>
          {/*  */}
        </Body>
      </Container>
      <div>
        <h2>Tenants</h2>
        <Table>
          <thead>
            <tr>
              <TableHeader>Id</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Apartment's Name</TableHeader>
              <TableHeader>Phone Number</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.id}</TableCell>
                <TableCell>{tenant.fullname}</TableCell>
                <TableCell>{tenant.propertyname}</TableCell>
                <TableCell>{tenant.phonenumber}</TableCell>
                <TableCell>{tenant.emailaddress}</TableCell>
                <TableCell>
                  <Button as={Link} to={`/tenant/${tenant.id}`}  primary="true" css={`max-width: 160px;`}>
                      <Arrow />
                      View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
      <BottomRightButton onClick={handleBackClick}>
        <FiArrowLeft />
        Back
    </BottomRightButton>
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

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   border: none;
//   background-color: #f1f1f1;
//   cursor: pointer;

//   svg {
//     margin-right: 5px;
//   }
// `;

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


const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  svg {
    margin-right: 10px;
  }

  &.active {
    font-weight: bold;
    color: #ff0000;
  }
`;

const ListingContent = styled.div`
  flex: 1;
  padding: 16px;
`;

const ListingTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ListingPrice = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ListingImages = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
`;

const ListingImage = styled.img`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`;

const SliderButtons = styled.div`
  position: absolute; /* Add this line to position the buttons */
  top: 90%; /* Adjust the top value as needed */
  transform: translateY(-50%); /* Center vertically */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin: 0 8px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    background: #cd853f;
    transform: scale(1.05);
  }
`;

const H1 = styled.h1`
  text-align: center;
  color: #8f32a8;
  /* Add more styling properties as needed */
`;

const PrevArrow = styled(IoMdArrowBack)`
  ${arrowButtons}
`;

const NextArrow = styled(IoMdArrowForward)`
  ${arrowButtons}
`;

const ListingCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BottomRightButton = styled.button`
  position: fixed;
  // margin-left: 50%
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
`;

const ViewDetailsButton = styled.button`
  padding: 8px 16px;
`;


export default LandlordTenants;

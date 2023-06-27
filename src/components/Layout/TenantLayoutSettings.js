import React from "react";
import styled from "styled-components";
import {
  FaListAlt,
  FaComments,
  FaTools,
  FaBuilding,
} from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";
import { BiBuildingHouse, BiBarChartAlt, BiCalendar } from "react-icons/bi";
import { RiCheckLine } from "react-icons/ri";
import { IoDocumentsSharp, IoDocuments} from "react-icons/io5"

import Topbar from "./Topbar";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";



const TenantLayoutSettings = ({children}) => {
  return (
    <>
    <Container>
      <SidenavContainer>
        <h1 style={{marginBottom: "20px", fontSize: "22px", color: "purple"}}><MdHome /> SmartRentals</h1>
        <Section>
          <SectionTitle>LIST</SectionTitle>
          <NavLink>
            <FaListAlt />
            Tenant List
          </NavLink>
        </Section>
        <Section>
          <SectionTitle>COMMUNICATIONS</SectionTitle>
          <NavLink>
            <FaComments />
            Messages
          </NavLink>
          <NavLink>
            <AiOutlineBell />
            Notifications
          </NavLink>
        </Section>
        <Section>
          <SectionTitle>DOCUMENTS</SectionTitle>
          <NavLink>
            <IoDocumentsSharp />
            Lease Agreements
          </NavLink>
          <NavLink>
            <IoDocuments />
            Other Documents
          </NavLink>
        </Section>
        <Section>
          <SectionTitle>TENANT REQUESTS</SectionTitle>
          <NavLink>
            <FaTools />
            Maintenance Requests
          </NavLink>
        </Section>
        <Section>
          <SectionTitle>TENANT STATUS</SectionTitle>
          <NavLink>
            <RiCheckLine />
            Active Tenants
          </NavLink>
          <NavLink>
            <FaBuilding />
            Vacant Units
          </NavLink>
          <NavLink>
            <BiCalendar />
            Lease Expirations
          </NavLink>
        </Section>
        <Section>
          <SectionTitle>REPORTS</SectionTitle>
          <NavLink>
            <BiBarChartAlt />
            Rent Collection Report
          </NavLink>
          <NavLink>
            <BiBuildingHouse />
            Occupancy Report
          </NavLink>
        </Section>
      </SidenavContainer>
      <ContentContainer>
        <LinksContainer>
          {children}
        </LinksContainer>
      </ContentContainer>
      
    </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const SidenavContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  width: 25%; /* 1/4 of the left-hand side */
  // height: 100vh;
  padding: 20px;
  border-right: 1px solid #566A44; /* Add border style */
  border-radius: 5px; /* Add border radius */
`;

const LandlordName = styled.h2`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
  color: grey;
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

const TopbarContainer = styled.div`
  flex: 1;
  background-color: #f1f1f1;
  padding: 10px;
  // margin-left: 25%; /* 1/4 of the left-hand side */
  margin-top: 0px;
  
  
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const LinksContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f1f1f1;
`;

export default TenantLayoutSettings;
// import React from "react";
// import styled from "styled-components";
// import {
//   FaHome,
//   FaUserFriends,
//   FaBuilding,
//   FaMoneyBill,
//   FaComments,
//   FaChartBar,
//   FaCheckSquare,
//   FaCalendarAlt,
//   FaStickyNote,
// } from "react-icons/fa";
// import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
// import Topbar from "../components/Layout/Topbar";
// import Properties from "../components/Properties";

// const LandlordDashboard = () => {
//   return (
//     <>
//     <Container>
//       <SidenavContainer>
//         {/* <img src="/images/logos.png" alt="Logo" style={{height: "200px"}}/> */}
//         <h1 style={{marginBottom: "20px"}}>SmartRentals</h1>
//         {/* <LandlordName>Collins's Dashboard</LandlordName> */}
//         <Section>
//           <SectionTitle>MANAGEMENT</SectionTitle>
//           <NavLink>
//             <FaBuilding />
//             Properties
//           </NavLink>
//           <NavLink>
//             <FaUserFriends />
//             Tenants
//           </NavLink>
//           <NavLink>
//             <FaBuilding />
//             Apartments Manager
//           </NavLink>
//           <NavLink>
//             <FaUserFriends />
//             Agents
//           </NavLink>
//         </Section>
//         <Section>
//           <SectionTitle>COMMUNICATIONS</SectionTitle>
//           <NavLink>
//             <FaComments />
//             Chat
//           </NavLink>
//           <NavLink>
//             <AiOutlineMail />
//             Email
//           </NavLink>
//           <NavLink>
//             <AiOutlinePhone />
//             Call
//           </NavLink>
//         </Section>
//         <Section>
//           <SectionTitle>FINANCIAL RECORDS</SectionTitle>
//           <NavLink>
//             <FaMoneyBill />
//             Expenses
//           </NavLink>
//           <NavLink>
//             <FaMoneyBill />
//             Payments (from tenants)
//           </NavLink>
//           <NavLink>
//             <FaMoneyBill />
//             Dues (from tenants)
//           </NavLink>
//           <NavLink>
//             <FaChartBar />
//             Bank Report
//           </NavLink>
//           <NavLink>
//             <FaChartBar />
//             Reports
//           </NavLink>
//           <NavLink>
//             <FaChartBar />
//             Financial Progress
//           </NavLink>
//         </Section>
//         <Section>
//           <SectionTitle>UTILITIES</SectionTitle>
//           <NavLink>
//             <FaCheckSquare />
//             To-Do
//           </NavLink>
//           <NavLink>
//             <FaCalendarAlt />
//             Calendar
//           </NavLink>
//           <NavLink>
//             <FaStickyNote />
//             Notes
//           </NavLink>
//         </Section>
//       </SidenavContainer>
//       {/* <TopbarContainer> */}
//         {/* Your Topbar component code here */}
//         {/* <Topbar /> */}
//       {/* </TopbarContainer> */}
      
//     </Container>
//     <Properties />
//     </>
//   );
// };

// const Container = styled.div`
//   display: flex;
// `;

// const SidenavContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: #f1f1f1;
//   width: 25%; /* 1/4 of the left-hand side */
//   // height: 100vh;
//   padding: 20px;
//   border-right: 1px solid #566A44; /* Add border style */
//   border-radius: 5px; /* Add border radius */
// `;

// const LandlordName = styled.h2`
//   margin-bottom: 20px;
// `;

// const Section = styled.div`
//   margin-bottom: 30px;
// `;

// const SectionTitle = styled.h3`
//   margin-bottom: 10px;
// `;

// const NavLink = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
//   cursor: pointer;

//   svg {
//     margin-right: 10px;
//   }
// `;

// const TopbarContainer = styled.div`
//   flex: 1;
//   background-color: #f1f1f1;
//   padding: 10px;
//   // margin-left: 25%; /* 1/4 of the left-hand side */
//   margin-top: 0px;
  
  
// `;

// export default LandlordDashboard;

import React from "react";
import styled from "styled-components";
import Sidenav from "../components/Layout/Sidenav";
import Topbar from "../components/Layout/Topbar";
import Properties from "../components/Properties";

const LandlordDashboard = () => {
  return (
    <>
      <Properties/>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
`;

export default LandlordDashboard;


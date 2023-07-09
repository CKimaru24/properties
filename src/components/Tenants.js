import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Topbar from './Layout/Topbar';
import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoMdArrowBack, IoMdArrowForward, IoMdArrowRoundForward } from 'react-icons/io';
import { Button } from './Button';

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
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

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`;

const Tenants = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    fetch('/tenants')
      .then((response) => response.json())
      .then((data) => {
        setTenants(data);
      })
      .catch((error) => {
        console.error('Error fetching tenants:', error);
      });
  }, []);

  return (
    <>
    <Topbar/>

    <Header>
        <NavLink to="/addTenants">
        <AiOutlinePlus />
        Add A Tenant
        </NavLink>
        <NavLink to="/tenants">
        <AiOutlineEye />
        View All Tenants
        </NavLink>
    </Header>
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
    </>
  );
};

export default Tenants;

// import React from 'react';
// import styled from 'styled-components';
// import Topbar from './Layout/Topbar';
// import { AiOutlinePlus, AiOutlineEye } from "react-icons/ai";
// import { Link } from 'react-router-dom';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHeader = styled.th`
//   padding: 12px;
//   text-align: left;
//   border-bottom: 1px solid #ddd;
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `;

// const TableCell = styled.td`
//   padding: 12px;
// `;

// const ViewDetailsButton = styled.button`
//   padding: 8px 16px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
//   margin-top: 20px;
// `;

// const NavLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
//   cursor: pointer;
//   text-decoration: none;
//   color: #000;

//   svg {
//     margin-right: 10px;
//   }

//   &.active {
//     font-weight: bold;
//     color: #ff0000;
//   }
// `;

// const ApartmentsManagers = () => {
//   // Sample data for demonstration
//   const managers = [
//     {
//       id: 1,
//       name: 'John Doe',
//       apartmentName: 'ABC Apartments',
//       phoneNumber: '123456789',
//       email: 'johndoe@example.com',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       apartmentName: 'XYZ Apartments',
//       phoneNumber: '987654321',
//       email: 'janesmith@example.com',
//     },
//     // Add more manager objects as needed
//   ];

//   return (
//     <>
//     <Topbar/>

//     <Header>
//         <NavLink to="/addManager">
//         <AiOutlinePlus />
//         Add Property Manager
//         </NavLink>
//         <NavLink to="/apartmentsManagers">
//         <AiOutlineEye />
//         View All Property Managers
//         </NavLink>
//     </Header>
//     <div>
//       <h2>Apartment Managers</h2>
//       <Table>
//         <thead>
//           <tr>
//             <TableHeader>Id</TableHeader>
//             <TableHeader>Name</TableHeader>
//             <TableHeader>Apartment's Name</TableHeader>
//             <TableHeader>Phone Number</TableHeader>
//             <TableHeader>Email</TableHeader>
//             <TableHeader>Actions</TableHeader>
//           </tr>
//         </thead>
//         <tbody>
//           {managers.map((manager) => (
//             <TableRow key={manager.id}>
//               <TableCell>{manager.id}</TableCell>
//               <TableCell>{manager.name}</TableCell>
//               <TableCell>{manager.apartmentName}</TableCell>
//               <TableCell>{manager.phoneNumber}</TableCell>
//               <TableCell>{manager.email}</TableCell>
//               <TableCell>
//                 <ViewDetailsButton>View Details</ViewDetailsButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//     </>
//   );
// };

// export default ApartmentsManagers;

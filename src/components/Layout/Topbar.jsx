import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu, AiOutlineMail, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { MdHome, MdSettings, MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom"
import Sidenav from "./Sidenav";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <TopbarContainer>
      
      <LeftSection>
        <MenuToggle onClick={() => setShowMenu(!showMenu)}>
          <AiOutlineMenu />
        </MenuToggle>
        <MailIcon to="/mail">
          <AiOutlineMail />
        </MailIcon>
      </LeftSection>
      <RightSection>
        <SearchIcon>
          <AiOutlineSearch />
        </SearchIcon>
        <NotificationIcon>
          <AiOutlineBell />
        </NotificationIcon>
        <Avatar onClick={handleAvatarClick}>
          <FiUser />
          {showMenu && (
            <AvatarMenu>
              <AvatarMenuItem>
                <MdHome />
                Home
              </AvatarMenuItem>
              <AvatarMenuItem>
                <FiUser />
                Profile
              </AvatarMenuItem>
              <AvatarMenuItem>
                <MdSettings />
                Settings
              </AvatarMenuItem>
              <AvatarMenuItem onClick={handleLogout}>
                <MdExitToApp />
                Logout
              </AvatarMenuItem>
            </AvatarMenu>
          )}
        </Avatar>
      </RightSection>
    </TopbarContainer>
  );
};

// const TopbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #f1f1f1;
//   padding: 10px;
//   margin-top: 0;
//   border: 1px solid #566A44; /* Add border style */
//   border-radius: 5px; /* Add border radius */
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Add box shadow */
// `;

const TopbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Make the container relatively positioned */
  background-color: #f1f1f1;
  padding: 10px;
  margin-top: 0;
  border: 1px solid #566A44; /* Add border style */
  border-radius: 5px; /* Add border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); /* Add box shadow */
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 25%; /* 1/4 of the top part to the left */
`;

const MenuToggle = styled.div`
  cursor: pointer;
  margin-right: 15px;
`;

const MailIcon = styled(Link)`
  cursor: pointer;
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  cursor: pointer;
  margin-right: 20px;
`;

const NotificationIcon = styled.div`
  cursor: pointer;
  margin-right: 20px;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AvatarMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const AvatarMenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;

  svg {
    margin-right: 5px;
  }
`;

export default Topbar;

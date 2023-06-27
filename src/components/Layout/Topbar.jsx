import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu, AiOutlineMail, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { MdHome, MdSettings, MdExitToApp } from "react-icons/md";
import { Link } from "react-router-dom"
import Sidenav from "./Sidenav";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const [avatar, setAvatar] = useState(null); // Add the avatar state

  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || null;
  });
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setShowMenu(!showMenu);
  };

  const handleHome = () => {
    navigate("/properties")
  };

  const handleSettings = () => {
    navigate("/toggleDark")
  };

  const handleProfile = () => {
    navigate("/profile")
  };
  
  const handleLogout = () => {
    // Implement logout logic here
    // Clear the token from localStorage or secure cookie
    localStorage.removeItem('token');

    // Redirect to the login page or any other desired page
    window.location.href = '/';
  };

  const preset_key = "profiles";
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    setLoading(true);
  
    try {
      // Upload the image to Cloudinary
      const res = await fetch("https://api.cloudinary.com/v1_1/djiqwujg4/image/upload", {
        method: 'POST',
        body: formData
      });
  
      const filee = await res.json();
      console.log(filee);
  
      // Set the avatar state to the secure_url from the API response
      setAvatar(filee.secure_url);
      localStorage.setItem('avatar', filee.secure_url); // Save the image URL in local storage
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  
    setLoading(false);
  };
  
  

  return (
    <TopbarContainer>
      <LeftSection>
        <MenuToggle onClick={() => setShowMenu(!showMenu)}>
          <AiOutlineMenu />
        </MenuToggle>
        <MailIcon to="http://localhost:4000/inbox">
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
          {avatar ? (
            <AvatarImage src={avatar} alt="Avatar" />
          ) : (
            <FiUser />
          )}
          {showMenu && (
            <AvatarMenu>
              <AvatarMenuItem onClick={handleHome}>
                <MdHome />
                Home
              </AvatarMenuItem>
              <AvatarMenuItem onClick={handleProfile}>
                <FiUser />
                Profile
              </AvatarMenuItem>
              {/* <AvatarMenuItem onClick={handleSettings}>
                <MdSettings />
                Settings
              </AvatarMenuItem> */}
              <AvatarMenuItem onClick={handleLogout}>
                <MdExitToApp />
                Logout
              </AvatarMenuItem>
            </AvatarMenu>
          )}
        </Avatar>
      </RightSection>
      <UploadInput
        type="file"
        id="avatar-input"
        accept="image/*"
        onChange={handleAvatarChange}
      />
    </TopbarContainer>
  );
};

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

// const AvatarMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 0;
//   background-color: #fff;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 10px;
// `;

const AvatarMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 999; /* Add a higher z-index value */
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

const AvatarImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadInput = styled.input`
  display: none;
`;

export default Topbar;

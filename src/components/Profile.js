import React, { useState } from 'react';
import styled from 'styled-components';
import Topbar from './Layout/Topbar';
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: grey;
  color: #333;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const preset_key = "profiles";

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    
    setLoading(true);
    
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/djiqwujg4/image/upload", {
        method: 'POST',
        body: formData
      });
      
      const filee = await res.json();
      console.log(filee);
      localStorage.setItem('avatar', filee.secure_url);
      setAvatar(filee.secure_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoBack = () => {
    // Handle the go back functionality
    navigate(-1);
  };
  return (
    <>
    <BackButton onClick={handleGoBack}>
        <FiArrowLeft size={20} />
    </BackButton>
    <ProfileContainer>
      <h2>Profile</h2>
      <Avatar src={avatar || localStorage.getItem('avatar')} alt="Avatar" />
      <UploadInput
        type="file"
        id="avatar-input"
        onChange={handleAvatarChange}
      />
      <button className={loading ? "btn btn-primary" : "btn btn-secondary"} type="submit" disabled={loading}>
        {loading ? "Loading..." : "Upload"}
      </button>


      <UploadButton as="label" htmlFor="avatar-input">Change Avatar Here</UploadButton>

    </ProfileContainer>
    </>
  );
};

export default Profile;

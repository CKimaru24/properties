import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

const PropertyManagerContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const ManagerDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Value = styled.span``;

const Button = styled.button`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.p`
  color: green;
  margin-top: 1rem;
`;

const PropertyManager = () => {
  const { id } = useParams();
  const [manager, setManager] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedManager, setEditedManager] = useState(null);

  const [deleted, setDeleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the manager details from the "/managers" endpoint
    fetch("/managers")
      .then((response) => response.json())
      .then((data) => {
        const selectedManager = data.find((item) => item.id === parseInt(id));
        setManager(selectedManager);
        setEditedManager(selectedManager);
      })
      .catch((error) => {
        console.log("Error fetching manager details:", error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    navigate (-1)
  }

  const handleButton = () => {
    navigate("/apartmentsManagers")
  }

  const handleSave = () => {
    // Send a PUT request to update the manager details
    fetch(`/managers/${manager.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedManager),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the manager details in the state or perform any necessary actions
        setManager(data);
        setIsEditing(false);

        // // Reload the page to reflect the changes (this is done in ManagersController under update method where we render json :@manager)
        // window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating manager details:", error);
      });
  };

  const handleDelete = () => {
    // Perform the delete operation and remove the property manager from the database
    fetch(`/managers/${manager.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Manager deleted successfully
          setDeleted(true);
          console.log('Manager deleted successfully');
        } else {
          // Handle error response
          console.error('Failed to delete manager');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('An error occurred while deleting manager', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedManager((prevManager) => ({
      ...prevManager,
      [name]: value,
    }));
  };

  if (!manager) {
    return(
      <>
        <div>Loading...</div>
        <div style={{marginTop: "20px"}}>Sorry. Seems the manager is unavailable</div>
        <Button onClick={handleBack} style={{marginTop: "30px"}}>Back</Button>
      </>
    ) 
  }

  return (
    <>
    {deleted ? (
      <>
        <Message>The Property Manager has been deleted</Message>
      </>
    ) : (
    <PropertyManagerContainer key={manager.id}>
      <h2>Property Manager Details</h2>
      <ManagerDetails>
        <Label>Name:</Label>
        {isEditing ? (
          <input
            type="text"
            name="fullname"
            value={editedManager.fullname}
            onChange={handleChange}
          />
        ) : (
          <Value>{manager.fullname}</Value>
        )}
      </ManagerDetails>
      <ManagerDetails>
        <Label>Apartment Name:</Label>
        {isEditing ? (
          <input
            type="text"
            name="propertyname"
            value={editedManager.propertyname}
            onChange={handleChange}
          />
        ) : (
          <Value>{manager.propertyname}</Value>
        )}
      </ManagerDetails>
      <ManagerDetails>
        <Label>Phone Number:</Label>
        {isEditing ? (
          <input
            type="text"
            name="phonenumber"
            value={editedManager.phonenumber}
            onChange={handleChange}
          />
        ) : (
          <Value>{manager.phonenumber}</Value>
        )}
      </ManagerDetails>
      <ManagerDetails>
        <Label>Email:</Label>
        {isEditing ? (
          <input
            type="text"
            name="emailaddress"
            value={editedManager.emailaddress}
            onChange={handleChange}
          />
        ) : (
          <Value>{manager.emailaddress}</Value>
        )}
      </ManagerDetails>
      {isEditing ? (
        <>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
      )}
    </PropertyManagerContainer>
    )}
    </>
  );
};

export default PropertyManager;

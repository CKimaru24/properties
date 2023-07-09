import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const PropertyTenantContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const TenantDetails = styled.div`
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

const Tenant = () => {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTenant, setEditedTenant] = useState(null);

  useEffect(() => {
    // Fetch the manager details from the "/managers" endpoint
    fetch("/tenants")
      .then((response) => response.json())
      .then((data) => {
        const selectedTenant = data.find((item) => item.id === parseInt(id));
        setTenant(selectedTenant);
        setEditedTenant(selectedTenant);
      })
      .catch((error) => {
        console.log("Error fetching tenant details:", error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Send a PUT request to update the manager details
    fetch(`/tenants/${tenant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTenant),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the tenant details in the state or perform any necessary actions
        setTenant(data);
        console.log(data)
        setIsEditing(false);

        // Reload the page to reflect the changes
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating tenant details:", error);
      });
  };

  const handleDelete = () => {
    // Perform the delete operation and remove the property manager from the database
    // ...

    // Optionally, you can display a confirmation dialog before deleting

    // After deleting, you can redirect or show a success message
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return (
    <PropertyTenantContainer key={tenant.id}>
      <h2>Property Manager Details</h2>
      <TenantDetails>
        <Label>Name:</Label>
        {isEditing ? (
          <input
            type="text"
            name="fullname"
            value={editedTenant.fullname}
            onChange={handleChange}
          />
        ) : (
          <Value>{tenant.fullname}</Value>
        )}
      </TenantDetails>
      <TenantDetails>
        <Label>Apartment Name:</Label>
        {isEditing ? (
          <input
            type="text"
            name="propertyname"
            value={editedTenant.propertyname}
            onChange={handleChange}
          />
        ) : (
          <Value>{tenant.propertyname}</Value>
        )}
      </TenantDetails>
      <TenantDetails>
        <Label>Phone Number:</Label>
        {isEditing ? (
          <input
            type="text"
            name="phonenumber"
            value={editedTenant.phonenumber}
            onChange={handleChange}
          />
        ) : (
          <Value>{tenant.phonenumber}</Value>
        )}
      </TenantDetails>
      <TenantDetails>
        <Label>Email:</Label>
        {isEditing ? (
          <input
            type="text"
            name="emailaddress"
            value={editedTenant.emailaddress}
            onChange={handleChange}
          />
        ) : (
          <Value>{tenant.emailaddress}</Value>
        )}
      </TenantDetails>
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
    </PropertyTenantContainer>
  );
};

export default Tenant;

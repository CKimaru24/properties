import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
`;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const AttachmentsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-bottom: 8px;
`;

const AttachmentItem = styled.li`
  font-size: 14px;
  color: #777;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Message = styled.p`
  color: green;
  margin-top: 1rem;
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

const AddManager = () => {
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [idnumber, setIdnumber] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const [nssfnumber, setNssfnumber] = useState('');
  const [nhifnumber, setNhifnumber] = useState('');
  const [krapin, setKrapin] = useState('');
  const [propertyname, setPropertyname] = useState('');
  const [idimage, setIdimage] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [addedManager, setAddedManager] = useState(false);

  const [fullnameError, setFullnameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [idnumberError, setIdnumberError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");
  const [emailaddressError, setEmailaddressError] = useState("");
  const [nssfnumberError, setNssfnumberError] = useState("");
  const [nhifnumberError, setNhifnumberError] = useState("");
  const [krapinError, setKrapinError] = useState("");
  const [propertynameError, setPropertynameError] = useState("");
  const [idimageError, setIdimageError] = useState("");

  const navigate = useNavigate

  // Initialize the state variables with empty strings
  useEffect(() => {
    setFullname('');
    setDob('');
    setIdnumber('');
    setPhonenumber('');
    setEmailaddress('');
    setNssfnumber('');
    setNhifnumber('');
    setKrapin('');
    setPropertyname('');
    setIdimage(null);
  }, []);

  const [selectedListingId, setSelectedListingId] = useState('');

  const [loading, setLoading] = useState(false);

  const [properties, setProperties] = useState([]); // State variable to store the property data

  // Fetch property data from the backend when the component mounts
  useEffect(() => {
    fetch("/listings")
      .then((response) => response.json())
      .then((data) => {
        // Update the properties state variable with the fetched data
        setProperties(data);
        setAddedManager(true);
        console.log(properties)
      })
      .catch((error) => {
        console.error("Error occurred while fetching property data", error);
      });
  }, []);

   // Update the handlePropertyname function to store the selected listing ID and name
   const handlePropertyname = (event) => {
    const selectedProperty = properties.find((property) => property.name === event.target.value);
    if (selectedProperty) {
      setSelectedListingId(selectedProperty.id);
      setPropertyname(selectedProperty.name);
    } else {
      setSelectedListingId(''); // Set the selectedListingId to empty if no property is found
      setPropertyname(''); // Set the propertyname to empty if no property is found
    }
  };


  const preset_key = "idimage";

  const handleFiles = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    setLoading(true);
  
    const res = await fetch("https://api.cloudinary.com/v1_1/djiqwujg4/image/upload", {
      method: 'POST',
      body: formData
    });
  
    const uploadedFile = await res.json();
    const { secure_url, original_filename } = uploadedFile;
    const newImage = { url: secure_url, name: original_filename };
  
    setIdimage(newImage);
    setLoading(false);
  };
  

  const handleDeleteImage = () => {
    setIdimage(null);
  };

  const handleBack = () => {
    navigate("/addManager")
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!fullname) {
        setFullnameError("Please enter your name");
    } else if (!/^[A-Za-z]+$/.test(fullname)) {
        setFullnameError("Name should contain letters only");
    } else {
        setFullnameError("");
    }

    // Validate DOB
    if (!dob) {
        setDobError("Date of Birth is required");
    } else {
        setDobError("");
    }
    
    // Validate ID Number
    if (!dob) {
        setDobError("Date of Birth is required");
    } else {
        const currentDate = new Date();
        const selectedDate = new Date(dob);
        const yearsDifference = currentDate.getFullYear() - selectedDate.getFullYear();
    if (yearsDifference < 18) {
        setDobError("Must be 18 years and above");
    } else {
        setDobError("");
    }
    }
      

    // Validate phone number format
    const phoneRegex = /^0\d{9}$/; // Assuming a 10-digit phone number starting with 0
  
    if (!phonenumber) {
      setPhonenumberError("Please enter a phone number");
    } else if (!phoneRegex.test(phonenumber)) {
      setPhonenumberError("Invalid phone number format");
      return;
    } else {
      setPhonenumberError("");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailaddress) {
        setEmailaddressError("Please enter an email address");
    } else if (!emailRegex.test(emailaddress)) {
        setEmailaddressError("Invalid email format");
    } else {
        setEmailaddressError("");
    }

    // Validate ID Image
    if (!idimage) {
        setIdimageError("ID Image is required");
    } else {
        setIdimageError("");
    }

    // Validate NSSF Number
    if (!nssfnumber) {
        setNssfnumberError("NSSF Number is required");
    } else {
        setNssfnumberError("");
    }
    
    // Validate NHIF Number
    if (!nhifnumber) {
        setNhifnumberError("NHIF Number is required");
    } else {
        setNhifnumberError("");
    }
    
    // Validate KRA PIN
    if (!krapin) {
        setKrapinError("KRA PIN is required");
    } else if (!/^[A-Z]/.test(krapin)) {
        setKrapinError("KRA PIN should start with a capital letter");
    } else {
        setKrapinError("");
    }
      

    // Validate Property Name
    if (!propertyname) {
        setPropertynameError("Property Name is required");
    } else {
        setPropertynameError("");
    }
      

    // Create an object with the manager data
    const managerData = {
      fullname,
      dob,
      idnumber,
      phonenumber,
      emailaddress,
      nssfnumber,
      nhifnumber,
      krapin,
      propertyname,
      idimage,
      listing_id: selectedListingId,
    };

    console.log("Token:", localStorage.getItem("token"));

    // Send a POST request to the backend API to add the manager
    fetch('/managers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from local storage
      },
      body: JSON.stringify(managerData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Apartment manager added successfully');
          setSubmitSuccess(true);
          // Reset the form or perform any other actions
          setFullname('');
          setDob('');
          setIdnumber('');
          setPhonenumber('');
          setEmailaddress('');
          setNssfnumber('');
          setNhifnumber('');
          setKrapin('');
          setPropertyname('');
          setIdimage(null);
          setFullnameError('');
          setDobError('');
          setIdnumberError('');
          setPhonenumberError('');
          setEmailaddressError('');
          setNssfnumberError('');
          setNhifnumberError('');
          setKrapinError('');
          setPropertynameError('');
          setIdimageError('');

        } else {
          console.error('Failed to add apartment manager');
          // Handle the error
        }
      })
      .catch((error) => {
        console.error('Error occurred while adding apartment manager', error);
        // Handle the error
      });
  };

  return (
    // <>
    // {addedManager ? (
    //   <>
    //     <Message>The Property Manager has been added successfully!!</Message>
    //     <NavLink to="/apartmentsManagers">
    //       Back
    //     </NavLink>
    //   </>
    // ) : (
    <Container>
      <h2>Add Apartment Manager</h2>
      <Form onSubmit={handleSubmit}>
        {submitSuccess && !fullnameError && !dobError && !idnumberError && !phonenumberError && !emailaddressError && !idimageError && !nssfnumberError && !nhifnumberError && !krapinError && !propertynameError && (
          <SuccessMessage>The Manager has been added successfully!</SuccessMessage>
        )}
        <FormGroup>
          <Label htmlFor="fullname">Full Name:</Label>
          <Input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter full name" 
            required 
          />
        </FormGroup>
        {fullnameError && <ErrorMessage>{fullnameError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="dob">Date of Birth:</Label>
          <Input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter date of birth" 
            required 
          />
        </FormGroup>
        {dobError && <ErrorMessage>{dobError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="idnumber">ID Number:</Label>
          <Input
            type="text"
            id="idnumber"
            value={idnumber}
            onChange={(e) => setIdnumber(e.target.value)}
            placeholder="Enter ID Number" 
            required 
          />
        </FormGroup>
        {idnumberError && <ErrorMessage>{idnumberError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="phonenumber">Phone Number:</Label>
          <Input
            type="tel"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Enter phone number" 
            required 
          />
        </FormGroup>
        {phonenumberError && <ErrorMessage>{phonenumberError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="emailaddress">Email Address:</Label>
          <Input
            type="email"
            id="emailaddress"
            value={emailaddress}
            onChange={(e) => setEmailaddress(e.target.value)}
            placeholder="Enter email address" 
            required 
          />
        </FormGroup>
        {emailaddressError && <ErrorMessage>{emailaddressError}</ErrorMessage>}
        <FormGroup>
            <Label htmlFor="idimage">Photo of your ID:</Label>
            <Input 
                type="file" 
                id="idimage" 
                onChange={handleFiles} 
            />
            <button variant="primary" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Upload"}
            </button>
        </FormGroup>
        {idimageError && <ErrorMessage>{idimageError}</ErrorMessage>}
        { idimage && (
        <AttachmentsList>
            <AttachmentItem>
            <p>{idimage.name} <button onClick={handleDeleteImage} style={{ margin: "10px" }}>Delete</button></p>
            
            </AttachmentItem>
        </AttachmentsList>
        )}
        <FormGroup>
          <Label htmlFor="nssfnumber">NSSF Number:</Label>
          <Input
            type="text"
            id="nssfnumber"
            value={nssfnumber}
            onChange={(e) => setNssfnumber(e.target.value)}
            placeholder="Enter NSSF Number" 
            required 
          />
        </FormGroup>
        {nssfnumberError && <ErrorMessage>{nssfnumberError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="nhifnumber">NHIF Number:</Label>
          <Input
            type="text"
            id="nhifnumber"
            value={nhifnumber}
            onChange={(e) => setNhifnumber(e.target.value)}
            placeholder="Enter NHIF Number" 
            required 
          />
        </FormGroup>
        {nhifnumberError && <ErrorMessage>{nhifnumberError}</ErrorMessage>}
        <FormGroup>
          <Label htmlFor="krapin">KRA PIN:</Label>
          <Input
            type="text"
            id="krapin"
            value={krapin}
            onChange={(e) => setKrapin(e.target.value)}
            placeholder="Enter KRA PIN" 
            required 
          />
        </FormGroup>
        {krapinError && <ErrorMessage>{krapinError}</ErrorMessage>}
        <FormGroup>
          <label htmlFor="propertyname">Property Name:</label>
          <Select id="propertyname" value={propertyname} onChange={handlePropertyname}>
            <option value="">-- Select Property --</option>
            {properties.map((property) => (
              <option key={property.id} value={property.name}>{property.name}</option>
            ))}
          </Select>
        </FormGroup>
        {propertynameError && <ErrorMessage>{propertynameError}</ErrorMessage>}
        <Button type="submit">Add Manager</Button>
      </Form>
    </Container>
    // )}
    // </>
  );
};

export default AddManager;

import React, { useState } from 'react';
import styled from 'styled-components';
import {useNavigate, Link} from "react-router-dom"
// import { Button } from "react-bootstrap";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
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
const AddListing = () => {
  const [listingType, setListingType] = useState('');
  const [town, setTown] = useState('');
  const [name, setName] = useState('');
  const [listingStatus, setListingStatus] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceUpTo, setPriceUpTo] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleListingTypeChange = (e) => {
    setListingType(e.target.value);
  };

  const handleTownChange = (e) => {
    setTown(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleListingStatusChange = (e) => {
    setListingStatus(e.target.value);
  };

  const handlePriceFromChange = (e) => {
    setPriceFrom(e.target.value);
  };

  const handlePriceUpToChange = (e) => {
    setPriceUpTo(e.target.value);
  };

  const handleBedroomsChange = (e) => {
    setBedrooms(e.target.value);
  };

  const handleBathroomsChange = (e) => {
    setBathrooms(e.target.value);
  };

  const handleGoBack = () => {
    navigate('/properties');
  };

  const [loading, setLoading] = useState(false);

  const preset_key = "properties";
  const handleFiles = async event => {
    const file = event.target.files[0];
    console.log(file)
    const formData = new FormData();;
    formData.append('file', file);
    formData.append('upload_preset', preset_key);
    setLoading(true);

    const res = await fetch("https://api.cloudinary.com/v1_1/djiqwujg4/image/upload", 
    {
      method: 'POST',
      body: formData
    })

    // const filee = await res.json();
    // console.log(filee);
    // // setImages(filee.secure_url)
    // setImages((prevImages) => [...prevImages, filee.secure_url]);
    // setLoading(false);

    const uploadedFile = await res.json();
    const { secure_url, original_filename } = uploadedFile;
    const newImage = { url: secure_url, name: original_filename };
    
    setImages((prevImages) => [...prevImages, newImage]);
    setLoading(false);
  }

  const handleDeleteImage = (index) => {
    // Remove the image at the given index from the images array
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => file);
  
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handler for adding a new image input field
  const handleAddImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.addEventListener('change', handleFiles);
    input.click();
  };
  const handleAddListing = () => {

    // Create an object with the form values
    const listingData = {
      listingType,
      town,
      name,
      listingStatus,
      priceFrom,
      priceUpTo,
      bedrooms,
      bathrooms,
      images,
  };
  
    // Retrieving the token for subsequent requests
    // const token = localStorage.getItem("token"); 

    console.log("Token:", localStorage.getItem("token"));

    // Send the data to the backend using an API call
    fetch('/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from local storage
        },
        body: JSON.stringify(listingData),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Form data sent to the database');
          } else {
            console.log('Failed to send form data to the database');
          }
          
        })
        .catch((error) => {
          console.log('Error sending form data:', error);
        });

        // Reset the form inputs and image URLs after submitting
        setListingType('');
        setTown('');
        setName('');
        setListingStatus('');
        setPriceFrom('');
        setPriceUpTo('');
        setBedrooms('');
        setBathrooms('');
        setImages([]);
  };
  

  return (
    <Container>
      <Title>
        Add Listing
        <Button onClick={handleGoBack} style={{marginLeft: "190px", background: "grey"}}>Back</Button>
      </Title>
      <FormGroup>
        <Label htmlFor="listingType">Listing Type:</Label>
        <Select id="listingType" value={listingType} onChange={handleListingTypeChange}>
          <option value="">-- Select Listing Type --</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="town">Town:</Label>
        <Input type="text" id="town" value={town} onChange={handleTownChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="name">Name of the property:</Label>
        <Input type="text" id="name" value={name} onChange={handleNameChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="listingStatus">Listing Status:</Label>
        <Select id="listingStatus" value={listingStatus} onChange={handleListingStatusChange}>
          <option value="">-- Select Listing Status --</option>
          <option value="On Sale">On Sale</option>
          <option value="On Rent">On Rent</option>
          <option value="Sold">Sold</option>
          <option value="Rented">Rented</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="priceFrom">Price From:</Label>
        <Input type="number" id="priceFrom" value={priceFrom} onChange={handlePriceFromChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="priceUpTo">Price Up To:</Label>
        <Input type="number" id="priceUpTo" value={priceUpTo} onChange={handlePriceUpToChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bedrooms">Bedrooms:</Label>
        <Select id="bedrooms" value={bedrooms} onChange={handleBedroomsChange}>
          <option value="">-- Select Bedrooms --</option>
          <option value="Studio">Studio</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10+">10+</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="bathrooms">Bathrooms:</Label>
        <Select id="bathrooms" value={bathrooms} onChange={handleBathroomsChange}>
          <option value="">-- Select Bathrooms --</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10+">10+</option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="images">Images:</Label>
        <Input type="file" id="images" multiple onChange={handleFiles} />
        <button variant="primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Upload"}
        </button>
      </FormGroup>
      {/* <AttachmentsList>
        {images.map((imageUrl, index) => (
          <AttachmentItem key={index}>
            <img src={imageUrl} alt={`Attachment ${index}`} />
          </AttachmentItem>
        ))}
      </AttachmentsList> */}
      {/* <AttachmentsList>
        {images.map((imageUrl, index) => (
          <AttachmentItem key={index}>
            {imageUrl}
          </AttachmentItem>
        ))}
      </AttachmentsList> */}
      {/* <AttachmentsList>
        {images.map((imageUrl, index) => {
          const imageName = imageUrl.split('/').pop();
          return (
            <AttachmentItem key={index}>
              {imageName}
            </AttachmentItem>
          );
        })}
      </AttachmentsList> */}

      
      {/* <AttachmentsList>
        {images.map((imageUrl, index) => {
          const imageName = imageUrl.split('/').pop();
          return (
            <AttachmentItem key={index}>
              {imageName}
              <button onClick={() => handleDeleteImage(index)} style={{margin: "10px"}}>Delete</button>
            </AttachmentItem>
          );
        })}
      </AttachmentsList> */}

      <AttachmentsList>
        {images.map((image, index) => (
          <AttachmentItem key={index}>
            {image.name}
            <button onClick={() => handleDeleteImage(index)} style={{margin: "10px"}}>Delete</button>
          </AttachmentItem>
        ))}
      </AttachmentsList>


      <Button onClick={handleAddImage} style={{marginRight: "105px"}}>Another Image?</Button>
      <Button onClick={handleAddListing}>Add Listing</Button>
    </Container>
  );
};

export default AddListing;

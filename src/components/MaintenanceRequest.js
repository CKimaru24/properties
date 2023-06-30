import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 16px;
`;

const Select = styled.select`
  width: 50%;
  padding: 8px;
  margin-bottom: 8px;
`;

const Option = styled.option``;

const TextArea = styled.textarea`
  width: 50%;
  padding: 8px;
  margin-bottom: 8px;
  resize: vertical;
  margin-right: 350px;
`;

const Input = styled.input`
  width: 50%;
  padding: 8px;
  font-size: 1rem;
  margin-right: 50px;
`;

const Button = styled.button`
  padding: 8px 16px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
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

const MaintenanceRequest = () => {
  const [item, setItem] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const preset_key = "maintenance";
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

    const uploadedFile = await res.json();
    console.log(uploadedFile); 
    const { secure_url, original_filename } = uploadedFile;
    const newImage = { url: secure_url, name: original_filename };
    
    setImages((prevImages) => [...prevImages, newImage]);
    setLoading(false);
  }

  const handleDeleteImage = (index) => {
    // Remove the image at the given index from the images array
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create an object with the maintenance data
    const maintenanceData = {
      item,
      details,
      images,
    };
  
    fetch('/maintenances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maintenanceData),
    })
      .then(response => {
        if (response.ok) {
          console.log('Maintenance request submitted successfully');
          setIsSubmitted(true); // Update the state to indicate successful submission
          // Reset the form or perform any other actions
          setItem('');
          setDetails('');
          setImages([]);
        } else {
          console.error('Failed to submit maintenance request');
          // Handle the error
        }
      })
      .catch(error => {
        console.error('Error occurred while submitting maintenance request', error);
        // Handle the error
      });
  };
  

  return (
    <div>
      <h2>Maintenance Request</h2>
      {isSubmitted ? (
        <>
            <SuccessMessage>Success! Your maintenance request has been submitted.</SuccessMessage>
            <Button onClick={handleGoBack} style={{marginLeft: "190px", background: "grey"}}>Back</Button>
        </>
        
      ) : (
      <Form onSubmit={handleSubmit}>
        <Select value={item} onChange={handleItemChange}>
          <Option value="">Select maintenance item</Option>
          <Option value="lightings">Lightings</Option>
          <Option value="roofing">Roofing</Option>
          <Option value="sink">Sink</Option>
          <Option value="kitchen">Kitchen</Option>
          <Option value="bedroom">Bedroom</Option>
        </Select>

        <TextArea
          id="details"
          value={details}
          onChange={handleDetailsChange}
          placeholder="Enter maintenance details"
          rows={4}
        />

        <Input type="file" id="images" multiple onChange={handleFiles} />
        <button variant="primary" type="submit" disabled={loading} >
          {loading ? "Loading..." : "Upload"}
        </button>

        <AttachmentsList>
            {images.map((image, index) => (
            <AttachmentItem key={index}>
                {image.name}
                <button onClick={() => handleDeleteImage(index)} style={{margin: "10px"}}>Delete</button>
            </AttachmentItem>
            ))}
         </AttachmentsList>

         <Button onClick={handleAddImage} style={{marginRight: "105px"}}>Another Image?</Button>
        <Button type="submit">Submit Request</Button>
      </Form>
      )}
    </div>
  );
};

export default MaintenanceRequest;

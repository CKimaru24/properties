import React, {useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  max-width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 400px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #000d1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #cd853f;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  width: 400px;
  border-radius: 4px;
  resize: vertical; /* Allow vertical resizing of the textarea */
  height: 120px; /* Set an initial height for the textarea */
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  // margin-top: 0.1rem;
`;

const Title = styled.h1`
  text-align: center;
  justify-content: center;
  color: #8f32a8;
  margin-left: 100px;
`;

const GoBackButton = styled(Button)`
  max-width: 110px;
  margin-left: auto;
  font-size: 15px;

  &:hover {
    background-color: #cd853f;
  }
  
`;

const Containers = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 600px;
  max-width: 100%;
`;

const Booking = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setNameError("");
    setMessageError("");
    setEmailError("");
    setPhoneError("");
  };

  const goBack = () => {
		navigate(-1);
	}

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (!name) {
      setNameError("Please enter your name");
    } else if (!/^[A-Za-z]+$/.test(name)) {
      setNameError("Name should contain letters only");
    } else {
      setNameError("");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
    setEmailError("Please enter an email address");
    } else if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
    } else {
        setEmailError("");
    }

    // Validate phone number format
    const phoneRegex = /^0\d{9}$/; // Assuming a 10-digit phone number starting with 0

    if (!phone) {
      setPhoneError("Please enter a phone number");
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number format");
      return;
    } else {
      setPhoneError("");
    }

    if (!message) {
        setMessageError("Please enter your message");
    } else {
        setMessageError("");
    }

    const bookData = {
        name,
        email,
        phone,
        message,
      };
    
      // Send an HTTP request to save the draft data to the "/draft" endpoint
      fetch('/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Booking saved successfully:', data);
        setSubmitSuccess(true);
        resetForm();
        // Optionally, you can perform any additional actions after saving the draft
        // such as showing a success message to the user or redirecting them to a different page.
      })
      .catch(error => {
        console.log('Error saving booking:', error);
        // Handle any error that occurred during the saving of the draft
      });
  };

  return (
    <Container>
      <Containers>
        <Title>Booking Form</Title>
        <GoBackButton onClick={goBack}>Go Back</GoBackButton>
      </Containers>
      <BookingForm onSubmit={handleSubmit}>
        {submitSuccess && !nameError && !emailError && !phoneError && !messageError && (
          <SuccessMessage>Your Booking has been submitted successfully!</SuccessMessage>
        )}
        <FormGroup>
          <Label>Name</Label>
          <Input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" 
            required 
          />
        </FormGroup>
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        <FormGroup>
          <Label>Email</Label>
          <Input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required 
          />
        </FormGroup>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <FormGroup>
          <Label>Phone Number</Label>
          <Input 
            type="tel" 
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number" 
            required 
          />
        </FormGroup>
        {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
        <FormGroup>
          <Label>Message</Label>
          <Textarea 
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave us a message" 
            required 
          />
        </FormGroup>
        {messageError && <ErrorMessage>{messageError}</ErrorMessage>}
        <Button type="submit">Book Now</Button>
      </BookingForm>
    </Container>
  );
};

export default Booking;

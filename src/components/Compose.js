import React, { useState } from "react";
import styled from "styled-components";
import { MdClose, MdAttachFile, MdSend } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom"
import { init, send } from 'emailjs-com';

// Initialize emailjs with your user ID
init('paFAZDWJSFK3nrKx7');

const Compose = () => {
  const [email, setEmail] = useState("");
  const [cc, setCC] = useState("");
  const [bcc, setBCC] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const resetCompose = () => {
    setEmail('');
    setCC('');
    setBCC("");
    setSubject("");
    setMessage('');
    setAttachments("");
    setMessageError("");
    setEmailError("");
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => file);
  
    setAttachments((prevAttachments) => [...prevAttachments, ...newAttachments]);
  };
  

  const handleSend = (e) => {
    e.preventDefault();

    // Implement send email logic here

    // Create an object with the email parameters
    const emailParams = {
        to_email: email,
        cc_email: cc,
        bcc_email: bcc,
        subject: subject,
        message: message,
        attachments: attachments,
    };

    // Create an object with the form values
    const composeData = {
        email,
        cc,
        bcc,
        subject,
        message,
        attachments,
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
    setEmailError("Please enter an email address");
    } else if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
    } else {
        setEmailError("");
    }

    if (!message) {
        setMessageError("Please enter your message");
    } else {
        setMessageError("");
    }

    

    // Send the form data as an email
    send('service_l9m8pab', 'template_brpxj2b', emailParams)
      .then((emailResponse) => {
        if (emailResponse.status === 200) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      })
      .catch((emailError) => {
        console.log('Error sending email:', emailError);
      });

    // Send the form data to the backend
    fetch('/composes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(composeData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form data sent to the database');
        //   resetCompose();
          navigate("/mail")
        } else {
          console.log('Failed to send form data to the database');
        }
        
      })
      .catch((error) => {
        console.log('Error sending form data:', error);
      });
    
    
  };

  const handleBackClick = () => {
    // Navigate back to the Mail component
    navigate("/mail");
  };

  return (
    <ComposeContainer>
      <ComposeHeader>
        <ComposeTitle>Compose</ComposeTitle>
        <CloseButton to="/mail">
          <MdClose />
        </CloseButton>
      </ComposeHeader>
      <ComposeForm>
        <FormField>
          <InputLabel>To</InputLabel>
          <InputField
            type="text"
            value={email}
            // onChange={handleToChange}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient's email address"
          />
        </FormField>
        {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        <FormField>
          <InputLabel>CC</InputLabel>
          <InputField
            type="text"
            value={cc}
            // onChange={handleCCChange}
            onChange={(e) => setCC(e.target.value)}
            placeholder="CC email addresses"
          />
        </FormField>
        <FormField>
          <InputLabel>BCC</InputLabel>
          <InputField
            type="text"
            value={bcc}
            // onChange={handleBCCChange}
            onChange={(e) => setBCC(e.target.value)}
            placeholder="BCC email addresses"
          />
        </FormField>
        <FormField>
          <InputLabel>Subject</InputLabel>
          <InputField
            type="text"
            value={subject}
            // onChange={handleSubjectChange}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
          />
        </FormField>
        <FormField>
          <InputLabel>Message</InputLabel>
          <TextareaField
            value={message}
            // onChange={handleMessageChange}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Compose your message..."
          />
        </FormField>
        {messageError && <ErrorMessage>{messageError}</ErrorMessage>}
        <FormField>
          <AttachmentLabel htmlFor="attachments">
            <MdAttachFile />
            Add attachments
          </AttachmentLabel>
          <AttachmentInput
            type="file"
            id="attachments"
            name="attachments"
            multiple
            onChange={handleAttachmentChange}
            // onChange={(e) => setAttachments(e.target.value)}
          />
        </FormField>
        <AttachmentsList>
            {attachments.map((attachment, index) => (
                <AttachmentItem key={index}>{attachment.name}</AttachmentItem>
            ))}
        </AttachmentsList>
        <SendButton onClick={handleSend}>
          <MdSend />
          Send
        </SendButton>
        <BottomRightButton onClick={handleBackClick}>
            <FiArrowLeft />
            Back
        </BottomRightButton>
      </ComposeForm>
    </ComposeContainer>
  );
};

const ComposeContainer = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 20px;
`;

const ComposeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ComposeTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled(Link)`
  border: none;
  background-color: transparent;
  color: #777;
  cursor: pointer;
`;

const ComposeForm = styled.form``;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const TextareaField = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
`;

const AttachmentLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #3c4043;
  margin-bottom: 8px;
`;

const AttachmentInput = styled.input`
  display: none;
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

const SendButton = styled.button`
  background-color: #1a73e8;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0c5fc4;
  }
`;

const BottomRightButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.1rem;
`;
export default Compose;

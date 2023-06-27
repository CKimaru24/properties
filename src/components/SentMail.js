import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDelete, MdSend } from "react-icons/md";

const SentMail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Fetch the individual email based on the emailId
    fetch(`/composes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.attachments)
        setEmail(data);
      })
      .catch((error) => {
        console.log("Error fetching email:", error);
      });
  }, [id]);

  const handleDeleteEmail = () => {
    // Prompt the user for confirmation before deleting the email
    const confirmDelete = window.confirm("Are you sure you want to delete this email?");

    if (confirmDelete) {
      // Delete the email
      fetch(`/composes/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            console.log("Email deleted successfully");
            // Redirect back to the SentMails component after successful deletion
            navigate("/sentEmails");
          } else {
            console.log("Failed to delete email");
          }
        })
        .catch((error) => {
          console.log("Error deleting email:", error);
        });
    }
  };

  if (!email) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    // Navigate back to the Mail component
    navigate("/sentEmails");
  };

  const handleReply = () => {
    // Navigate back to the Mail component
    navigate("/compose");
  };

  // Parse attachments string into an array of objects
  let parsedAttachments = [];
  try {
    parsedAttachments = JSON.parse(email.attachments);
    console.log(parsedAttachments)
  } catch (error) {
    console.log("Error parsing attachments:", error);
  }

  const getAttachmentIcon = (name) => {
    const fileExtension = name.split(".").pop();
    // Assuming the icons are stored in the public folder
    return `/icons/${fileExtension}.svg`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the locale and options as per your preference
  };
  

  return (
    <SentMailContainer>
      <SentMailHeader>
        <SentMailTitle>Sent Mail</SentMailTitle>
      </SentMailHeader>
      <EmailContent>
        <EmailHeader>
          <EmailTitle>Subject: {email.subject}</EmailTitle>
          <DeleteButton onClick={handleDeleteEmail}>
            <MdDelete />
          </DeleteButton>
        </EmailHeader>
        <EmailDetails>
          <Sender>From: {email.email}</Sender>
        </EmailDetails>
        <EmailDetails>
          <Sender>CC: {email.cc}</Sender>
        </EmailDetails>
        <EmailDetails>
          <Sender>BCC: {email.bcc}</Sender>
        </EmailDetails>
        <EmailDetails>
          {/* <Time><b>Sent at: </b>{email.created_at}</Time> */}
          <Time>Date: {formatDate(email.created_at)}</Time>
        </EmailDetails>
        <EmailMessage>Message: {email.message}</EmailMessage>
        {Array.isArray(parsedAttachments) && parsedAttachments.length > 0 && (
            <EmailAttachments>
                <span>Attachments: </span>
                {parsedAttachments.map((attachment, index) => (
                <AttachmentItem key={index}>
                    <AttachmentIcon
                    src={getAttachmentIcon(attachment.name)}
                    alt="Attachment Icon"
                    />
                    <AttachmentName>{attachment.name}</AttachmentName>
                </AttachmentItem>
                ))}
            </EmailAttachments>
        )}
        <BackButton onClick={handleReply} style={{marginRight: "370px"}}>
          <MdSend />
          Reply
        </BackButton>
        <BackButton onClick={handleBack}>
          Back
        </BackButton>
      </EmailContent>
    </SentMailContainer>
  );
};

const SentMailContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

const SentMailHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 30px;
  // background-color: #e1f0e5
  justify-content: center;
`;

const SentMailTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const EmailContent = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EmailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const EmailTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #777;
  cursor: pointer;
`;

const EmailDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Sender = styled.p`
  font-weight: bold;
  margin-right: 16px;
`;

const Time = styled.p`
  color: #777;
`;

const EmailMessage = styled.p`
  white-space: pre-wrap;
`;

const EmailAttachments = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AttachmentIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const AttachmentName = styled.span`
  font-size: 14px;
  color: #333;
`;

const BackButton = styled.button`
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


export default SentMail;

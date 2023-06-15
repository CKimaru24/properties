import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const SentMails = () => {
  const [sentEmails, setSentEmails] = useState([]);

  const { emailId, id } = useParams();

  useEffect(() => {
    // Fetch the sent emails from the backend or database
    fetchSentEmails()
      .then((data) => {
        setSentEmails(data);
      })
      .catch((error) => {
        console.log("Error fetching sent emails:", error);
      });
  }, []);

  const fetchSentEmails = async () => {
    try {
          const response = await fetch("/composes");
          const data = await response.json();
          console.log(data)
          return data;
      } catch (error) {
          console.log("Error fetching sent emails:", error);
          return [];
      }
  };
  

  const handleDeleteEmail = (emailId) => {
    // Implement your logic to delete the sent email
    // Remove the email from the backend or database
    deleteSentEmail(emailId)
      .then(() => {
        // Remove the deleted email from the local state
        const updatedSentEmails = sentEmails.filter(
          (email) => email.id !== emailId
        );
        setSentEmails(updatedSentEmails);
      })
      .catch((error) => {
        console.log("Error deleting sent email:", error);
      });
  };

//   const deleteSentEmail = (emailId) => {
//     // Prompt the user for confirmation
//     const confirmDelete = window.confirm("Are you sure you want to delete this email?");
  
//     if (!confirmDelete) {
//       // If the user cancels the deletion, return a rejected Promise
//       return Promise.reject();
//     }
  
//     // Implement your API call to delete the sent email
//     // Return a Promise that resolves when the deletion is successful
//     return new Promise((resolve, reject) => {
//       // Simulated delay for demonstration
//       setTimeout(() => {
//         resolve();
//       }, 500);
//     });
//   };

const deleteSentEmail = (emailId) => {
    // Prompt the user for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this email?");
  
    if (!confirmDelete) {
      // If the user cancels the deletion, return a rejected Promise
      return Promise.reject();
    }
  
    // Implement your API call to delete the sent email
    // Return a Promise that resolves when the deletion is successful
    return new Promise((resolve, reject) => {
      // Make the API call to delete the email
      fetch(`/composes/${emailId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Email deletion successful
            resolve();
          } else {
            // Email deletion failed
            reject(new Error('Failed to delete email'));
          }
        })
        .catch((error) => {
          // Error while deleting email
          reject(error);
        });
    });
  };
  
  

  return (
    <SentMailContainer>
      <SentMailHeader>
        <SentMailTitle>Sent Mails</SentMailTitle>
        <BackButton to="/mail">Back</BackButton>
      </SentMailHeader>
      <SentMailList>
        {sentEmails.map((email) => (
          <SentMailItem key={email.id}>
            <Link to={`/sentEmail/${email.id}`}>
              <Sender>{email.email}</Sender>
              <Subject>{email.subject}</Subject>
              <Message>{email.message.slice(0, 100)}</Message>
              <Time>{email.created_at}</Time>
            </Link>
            <DeleteButton onClick={() => handleDeleteEmail(email.id)}>
              <MdDelete />
            </DeleteButton>
          </SentMailItem>
        ))}
      </SentMailList>
    </SentMailContainer>
  );
};

const SentMailContainer = styled.div`
  width: 1200px;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SentMailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SentMailTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: purple;
`;

const SentMailList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SentMailItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 8px 0;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
`;

const Sender = styled.span`
  font-weight: bold;
  margin-right: 15px;
  margin-left: 10px;
`;

const Subject = styled.span`
  margin-right: 15px;
  color: #30e661
`;

const Time = styled.span`
  font-size: 12px;
  color: #777;
  margin-right: 8px;
`;

const Message = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #777;
  cursor: pointer;
`;

const BackButton = styled(Link)`
  background-color: transparent;
  border: none;
  color: #777;
  cursor: pointer;
  text-decoration: none;
`;

export default SentMails;

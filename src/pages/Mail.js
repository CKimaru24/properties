// import React, { useState } from "react";
// import styled from "styled-components";
// import { AiOutlineMail } from "react-icons/ai";
// import { Link } from "react-router-dom";


// const Mail = () => {
//   const [unreadCount, setUnreadCount] = useState(5); // Example initial unread count

//   const handleComposeClick = () => {
//     // Implement compose email logic here
//   };

//   return (
//     <MailContainer>
//       <MailIcon onClick={handleComposeClick}>
//         <AiOutlineMail />
//         {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
//       </MailIcon>
//       <Link to="/compose">
//         <ComposeButton onClick={handleComposeClick}>
//             <AiOutlineMail />
//             Compose
//         </ComposeButton>
//       </Link>
//     </MailContainer>
//   );
// };

// const MailContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const MailIcon = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   font-size: 24px;
//   color: #3c4043;
// `;

// const UnreadCount = styled.div`
//   background-color: #db4437;
//   color: #fff;
//   font-size: 12px;
//   font-weight: bold;
//   padding: 2px 6px;
//   border-radius: 50%;
//   margin-left: 6px;
// `;

// const ComposeButton = styled.button`
//   background-color: #fbbc04;
//   color: #3c4043;
//   font-size: 14px;
//   font-weight: bold;
//   padding: 8px 16px;
//   border: none;
//   border-radius: 4px;
//   margin-left: 12px;
//   cursor: pointer;

//   &:hover {
//     background-color: #fbbc04;
//     opacity: 0.9;
//   }
// `;

// export default Mail;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"

const MailContainer = styled.div`
  /* Add styles for the mail container */
  display: flex;
  flex-direction: column;
`;

const MailHeader = styled.div`
  /* Add styles for the mail header */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #f2f2f2;
`;

const MailIcon = styled.div`
  /* Add styles for the mail icon */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #e74c3c;
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ComposeButton = styled.button`
  /* Add styles for the compose button */
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const MailButton = styled.button`
  /* Add styles for the mail buttons (Inbox, Sent, etc.) */
  padding: 8px 16px;
//   background-color: transparent;
    background-color: #3498dc;
  color: #333;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
`;

const EmailList = styled.div`
  /* Add styles for the email list */
  margin-top: 16px;
`;

const EmailItem = styled.div`
  /* Add styles for the email item */
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const StarButton = styled.button`
  /* Add styles for the star button */
  margin-right: 8px;
  padding: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const EmailDetails = styled.div`
  /* Add styles for the email details */
`;

const EmailSubject = styled.div`
  /* Add styles for the email subject */
  font-weight: bold;
`;

const EmailSender = styled.div`
  /* Add styles for the email sender */
  color: #666;
`;

const EmailActions = styled.div`
  /* Add styles for the email actions */
  display: flex;
`;

const ActionButton = styled.button`
  /* Add styles for the action buttons (Reply, Delete, etc.) */
  margin-right: 8px;
  padding: 4px 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  font-weight: bold;
`;



function Mail() {
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  const handleStarClick = () => {
        // Implement compose email logic here
    };

    const handleEmailClick = () => {
        // Implement compose email logic here
    };
    
    const handleReplyClick = () => {
        // Implement compose email logic here
    };

    const handleDeleteClick = () => {
        // Implement compose email logic here
    };

    // const handleComposeClick = () => {
    //     navigate("/compose");
    //   };
    
      const handleComposeClick = () => {
        window.location.href = "http://localhost:4000";
      }; 

      // const handleSentClick = () => {
      //   navigate("/sentEmails");
      // };

      const handleSentClick = () => {
        window.location.href = "http://localhost:4000/sent";
      }; 
    
      const handleInboxClick = () => {
        window.location.href = "http://localhost:4000/inbox";
      };  
      
      const handleDraftClick = () => {
        window.location.href = "http://localhost:4000/draft";
      }; 

  // ... Rest of the component code

  return (
    <MailContainer>
      <MailHeader>
        <MailButton onClick={handleInboxClick}>Inbox</MailButton>
        <MailButton onClick={handleSentClick}>Sent</MailButton>
        <ComposeButton onClick={handleComposeClick}>
            Compose
        </ComposeButton>
        <MailButton onClick={handleDraftClick}>Draft</MailButton>
        {/* <MailIcon>
          <span>{unreadCount}</span>
        </MailIcon> */}
       
        
      </MailHeader>
      <EmailList>
        {receivedEmails.map((email) => (
          <EmailItem key={email.id}>
            <StarButton onClick={() => handleStarClick(email.id)}>
              {email.starred ? '★' : '☆'}
            </StarButton>
            <EmailDetails onClick={() => handleEmailClick(email.id)}>
              <EmailSubject>{email.subject}</EmailSubject>
              <EmailSender>{email.sender}</EmailSender>
            </EmailDetails>
            <EmailActions>
              <ActionButton onClick={() => handleReplyClick(email.id)}>Reply</ActionButton>
              <ActionButton onClick={() => handleDeleteClick(email.id)}>Delete</ActionButton>
              {/* Include other action buttons here */}
            </EmailActions>
          </EmailItem>
        ))}
      </EmailList>
    </MailContainer>
  );
}

export default Mail;

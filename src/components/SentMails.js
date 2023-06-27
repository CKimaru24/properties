// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Link, useParams } from "react-router-dom";
// import { MdDelete } from "react-icons/md";

// const SentMails = () => {
//   const [sentEmails, setSentEmails] = useState([]);

//   const { emailId, id } = useParams();

//   useEffect(() => {
//     // Fetch the sent emails from the backend or database
//     fetchSentEmails()
//       .then((data) => {
//         setSentEmails(data);
//       })
//       .catch((error) => {
//         console.log("Error fetching sent emails:", error);
//       });
//   }, []);

//   const fetchSentEmails = async () => {
//     try {
//           const response = await fetch("/composes");
//           const data = await response.json();
//           console.log(data)
//           return data;
//       } catch (error) {
//           console.log("Error fetching sent emails:", error);
//           return [];
//       }
//   };
  

//   const handleDeleteEmail = (emailId) => {
//     // Implement your logic to delete the sent email
//     // Remove the email from the backend or database
//     deleteSentEmail(emailId)
//       .then(() => {
//         // Remove the deleted email from the local state
//         const updatedSentEmails = sentEmails.filter(
//           (email) => email.id !== emailId
//         );
//         setSentEmails(updatedSentEmails);
//       })
//       .catch((error) => {
//         console.log("Error deleting sent email:", error);
//       });
//   };

// //   const deleteSentEmail = (emailId) => {
// //     // Prompt the user for confirmation
// //     const confirmDelete = window.confirm("Are you sure you want to delete this email?");
  
// //     if (!confirmDelete) {
// //       // If the user cancels the deletion, return a rejected Promise
// //       return Promise.reject();
// //     }
  
// //     // Implement your API call to delete the sent email
// //     // Return a Promise that resolves when the deletion is successful
// //     return new Promise((resolve, reject) => {
// //       // Simulated delay for demonstration
// //       setTimeout(() => {
// //         resolve();
// //       }, 500);
// //     });
// //   };

// const deleteSentEmail = (emailId) => {
//     // Prompt the user for confirmation
//     const confirmDelete = window.confirm("Are you sure you want to delete this email?");
  
//     if (!confirmDelete) {
//       // If the user cancels the deletion, return a rejected Promise
//       return Promise.reject();
//     }
  
//     // Implement your API call to delete the sent email
//     // Return a Promise that resolves when the deletion is successful
//     return new Promise((resolve, reject) => {
//       // Make the API call to delete the email
//       fetch(`/composes/${emailId}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (response.ok) {
//             // Email deletion successful
//             resolve();
//           } else {
//             // Email deletion failed
//             reject(new Error('Failed to delete email'));
//           }
//         })
//         .catch((error) => {
//           // Error while deleting email
//           reject(error);
//         });
//     });
//   };
  
  

//   return (
//     <SentMailContainer>
//       <SentMailHeader>
//         <SentMailTitle>Sent Mails</SentMailTitle>
//         <BackButton to="/mail">Back</BackButton>
//       </SentMailHeader>
//       <SentMailList>
//         {sentEmails.map((email) => (
//           <SentMailItem key={email.id}>
//             <Link to={`/sentEmail/${email.id}`}>
//               <Sender>{email.email}</Sender>
//               <Subject>{email.subject}</Subject>
//               <Message>{email.message.slice(0, 100)}</Message>
//               <Time>{email.created_at}</Time>
//             </Link>
//             <DeleteButton onClick={() => handleDeleteEmail(email.id)}>
//               <MdDelete />
//             </DeleteButton>
//           </SentMailItem>
//         ))}
//       </SentMailList>
//     </SentMailContainer>
//   );
// };

// const SentMailContainer = styled.div`
//   width: 1000px;
//   background-color: #fff;
//   border-radius: 5px;
//   padding: 16px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin: 0 auto;
//   margin-top: 20px;
// `;

// const SentMailHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 16px;
// `;

// const SentMailTitle = styled.h2`
//   font-size: 18px;
//   font-weight: bold;
//   margin: 0;
//   color: purple;
// `;

// const SentMailList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const SentMailItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #ddd;
//   padding: 8px 0;

//   a {
//     text-decoration: none;
//     color: inherit;
//     display: flex;
//     flex-grow: 1;
//     align-items: center;
//   }
// `;

// const Sender = styled.span`
//   font-weight: bold;
//   margin-right: 15px;
//   margin-left: 10px;
// `;

// const Subject = styled.span`
//   margin-right: 15px;
//   color: #30e661
// `;

// const Time = styled.span`
//   font-size: 12px;
//   color: #777;
//   margin-right: 8px;
// `;

// const Message = styled.span`
//   flex-grow: 1;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const DeleteButton = styled.button`
//   background-color: transparent;
//   border: none;
//   color: #777;
//   cursor: pointer;
// `;

// const BackButton = styled(Link)`
//   background-color: transparent;
//   border: none;
//   color: #777;
//   cursor: pointer;
//   text-decoration: none;
// `;

// export default SentMails;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useParams } from "react-router-dom"
import { MdDelete } from "react-icons/md";

const MailContainer = styled.div`
  /* Add styles for the mail container */
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
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

const SentMailContainer = styled.div`
  width: 1000px;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 20px;
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


function SentMails() {
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

    const handleComposeClick = () => {
        navigate("/compose");
      };

      const handleSentClick = () => {
        navigate("/sentEmails");
      };

      const handleInboxClick = () => {
        navigate("/inbox");
      };

      const handleDraftClick = () => {
        navigate("/drafts");
      };

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
      }

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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the locale and options as per your preference
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
              <Time>Date: {formatDate(email.created_at)}</Time>
            </Link>
            <DeleteButton onClick={() => handleDeleteEmail(email.id)}>
              <MdDelete />
            </DeleteButton>
          </SentMailItem>
        ))}
      </SentMailList>
    </MailContainer>
  );
}

export default SentMails;


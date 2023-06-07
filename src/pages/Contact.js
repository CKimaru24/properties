// import React, { useState } from "react";
// import styled from "styled-components";
// import Footer from "../components/Footer";

// const Contact = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setPhone("");
//     setMessage("");
//     setSubmitSuccess(false);
//   };

//   const sendEmail = (e) => {
//     e.preventDefault();

//     fetch("/contacts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         phone: phone,
//         message: message,
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log("message sent");
//           resetForm();
//           setSubmitSuccess(true);
//         } else {
//           console.log("Failed to send message");
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   return (
//     <>
//       <CenteredContainer>
//         <StyledContactForm>
//           {submitSuccess && <SuccessMessage>Form submitted successfully!</SuccessMessage>}
//           <form onSubmit={sendEmail}>
//             <h1>Contact Form</h1>
//             <label>Name</label>
//             <input 
//               type="text" 
//               name="name"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>Email</label>
//             <input 
//               type="email" 
//               name="email" 
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Phone Number</label>
//             <input 
//               type="phone" 
//               name="phone" 
//               id="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             <label>Message</label>
//             <textarea 
//               type="text"
//               name="message" 
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <input type="submit" value="Send" />
//           </form>
//         </StyledContactForm>
//       </CenteredContainer>
//       <Footer />
//     </>
//   );
// };

// export default Contact;

// // Styles
// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const StyledContactForm = styled.div`
//   width: 400px;

//   form {
//     display: flex;
//     align-items: flex-start;
//     flex-direction: column;
//     width: 100%;
//     font-size: 16px;

//     input {
//       width: 100%;
//       height: 35px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     textarea {
//       max-width: 100%;
//       min-width: 100%;
//       width: 100%;
//       max-height: 100px;
//       min-height: 100px;
//       padding: 7px;
//       outline: none;
//       border-radius: 5px;
//       border: 1px solid rgb(220, 220, 220);

//       &:focus {
//         border: 2px solid rgba(0, 206, 158, 1);
//       }
//     }

//     label {
//       margin-top: 1rem;
//     }

//     input[type="submit"] {
//       margin-top: 2rem;
//       cursor: pointer;
//       background: rgb(249, 105, 14);
//       color: white;
//       border: none;
//     }
//   }
// `;

// const SuccessMessage = styled.p`
//   color: green;
//   margin-top: 1rem;
// `;

import React, { useState } from 'react';
import styled from 'styled-components';
import { init, sendForm } from 'emailjs-com';
import Footer from '../components/Footer';

// Initialize emailjs with your user ID
init('paFAZDWJSFK3nrKx7');

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Extract form values
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    // Create an object with the form values
    const contactData = {
      name,
      email,
      phone,
      message,
    };

    // Send the form data to the database
    fetch('/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Form data sent to the database');
          // Send the form as an email
          sendForm('service_l9m8pab', 'template_brpxj2b', e.target)
            .then((emailResponse) => {
              if (emailResponse.status === 200) {
                console.log('Email sent successfully');
                resetForm();
                setSubmitSuccess(true);
              } else {
                console.log('Failed to send email');
              }
            })
            .catch((emailError) => {
              console.log('Error sending email:', emailError);
            });
        } else {
          console.log('Failed to send form data to the database');
        }
      })
      .catch((error) => {
        console.log('Error sending form data:', error);
      });
  };

  return (
    <>
      <CenteredContainer>
        <StyledContactForm>
          {submitSuccess && <SuccessMessage>Form submitted successfully!</SuccessMessage>}
          <form onSubmit={sendEmail}>
            <h1>Contact Form</h1>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" value="Send" />
          </form>
        </StyledContactForm>
      </CenteredContainer>
      <Footer />
    </>
  );
};

export default Contact;

// // Styles
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 1rem;
`;
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
import Navbars from '../components/Navbars';

// Initialize emailjs with your user ID
init('paFAZDWJSFK3nrKx7');

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

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

    // Check if any required fields are empty
    if (!name) {
      setNameError("Please enter your name");
    } else if (!/^[A-Za-z]+$/.test(name)) {
      setNameError("Name should contain letters only");
    } else {
      setNameError("");
    }

    if (!message) {
      setMessageError("Please enter your last name");
    } else {
      setMessageError("");
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

    // setIsLoading(true);

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
      })
      // .finally(() => {
      //   setIsLoading(false);
      // });
  };

  return (
    <>
      <Navbars isDark={true} />
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
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {messageError && <ErrorMessage>{messageError}</ErrorMessage>}
            <input type="submit" value="Send"  />
            {/* disabled={isLoading}
            {isLoading && <LoadingMessage>Loading...</LoadingMessage>} */}
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
      max-height: 70px;
      min-height: 70px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 0.5rem;
    }

    input[type="submit"] {
      margin-top: 1.5rem;
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

const ErrorMessage = styled.p`
  color: red;
  // margin-top: 0.1rem;
`;

// const LoadingMessage = styled.p`
//   margin-bottom: 16px;
// `;
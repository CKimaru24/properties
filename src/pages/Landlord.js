// import React, { useState } from "react";
// import styled from "styled-components";
// import Footer from "../components/Footer";

// const Signup = () => {
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const [fnameError, setFnameError] = useState("");
//   const [lnameError, setLnameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const resetForm = () => {
//     setFname("");
//     setLname("");
//     setEmail("");
//     setPhone("");
//     setPassword("");
//     setConfirmPassword("");
//     setSubmitSuccess(false);
//     setFnameError("");
//     setLnameError("");
//     setEmailError("");
//     setPhoneError("");
//     setPasswordError("");
//     setConfirmPasswordError("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform validation and submit the signup data
//     if (password !== confirmPassword) {
//         setConfirmPasswordError("Passwords do not match");
//         return;
//       } else {
//         setConfirmPasswordError("");
//       }
  
//       // Check if any required fields are empty
//       if (!fname) {
//         setFnameError("Please enter your first name");
//       } else {
//         setFnameError("");
//       }
  
//       if (!lname) {
//         setLnameError("Please enter your last name");
//       } else {
//         setLnameError("");
//       }
  
//       if (!email) {
//         setEmailError("Please enter your email");
//       } else {
//         setEmailError("");
//       }
  
//       if (!phone) {
//         setPhoneError("Please enter your phone number");
//       } else {
//         setPhoneError("");
//       }
  
//       if (!password) {
//         setPasswordError("Please enter a password");
//       } else {
//         setPasswordError("");
//       }
  
//       if (!confirmPassword) {
//         setConfirmPasswordError("Please confirm your password");
//       } else {
//         setConfirmPasswordError("");
//       }
  
//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (email && !emailRegex.test(email)) {
//         setEmailError("Invalid email format");
//         return;
//       } else {
//         setEmailError("");
//       }
  
//       // Validate phone number format
//       const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
//       if (phone && !phoneRegex.test(phone)) {
//         setPhoneError("Invalid phone number format");
//         return;
//       } else {
//         setPhoneError("");
//       }
  
//       // Perform additional validations as needed


//     // TODO: Submit the signup data to the server
//     // You can use the fetch() function or a library like axios
//     fetch("/signups", {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//         fname: fname,
//         lname: lname,
//         email: email,
//         phone: phone,
//         password: password,
//         confirmPassword: confirmPassword,
//         }),
//     })
//         .then((response) => {
//         if (response.ok) {
//             console.log("message sent");
//             resetForm();
//             setSubmitSuccess(true);
//         } else {
//             console.log("Failed to send message");
//         }
//         })
//         .catch((error) => {
//         console.log(error.message);
//         });
//   };

//   return (
//     <>
//       <CenteredContainer>
//         <StyledSignupForm>
//           {submitSuccess && <SuccessMessage>Signup successful!</SuccessMessage>}
//           <form onSubmit={handleSubmit}>
//             <h1>Signup Form</h1>
//             <label>First Name</label>
//             <input 
//               type="text" 
//               name="fname"
//               value={fname}
//               onChange={(e) => setFname(e.target.value)}
//             />
//             {fnameError && <ErrorMessage>{fnameError}</ErrorMessage>}
//             <label>Last Name</label>
//             <input 
//               type="text" 
//               name="lname"
//               value={lname}
//               onChange={(e) => setLname(e.target.value)}
//             />
//             {lnameError && <ErrorMessage>{lnameError}</ErrorMessage>}
//             <label>Email</label>
//             <input 
//               type="email" 
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
//             <label>Phone Number</label>
//             <input 
//               type="tel" 
//               name="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//             {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
//             <label>Password</label>
//             <input 
//               type="password" 
//               name="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
//             <label>Confirm Password</label>
//             <input 
//               type="password" 
//               name="confirmPassword" 
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             {confirmPasswordError && (
//               <ErrorMessage>{confirmPasswordError}</ErrorMessage>
//             )}
//             <input type="submit" value="Sign Up" />
//           </form>
//         </StyledSignupForm>
//       </CenteredContainer>
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default Signup;

// // Styles
// const CenteredContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const StyledSignupForm = styled.div`
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
//   margin-top: 4rem;
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   margin-top: 0.5rem;
// `;

import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Navbars from '../components/Navbars';

const Landlord = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const resetForm = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPasswordConfirmation("");
    setSubmitSuccess(false);
    setFnameError("");
    setLnameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setPasswordConfirmationError("");
  };

  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation and submit the signup data
    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match");
      return;
    } else {
      setPasswordConfirmationError("");
    }

    // Check if any required fields are empty
    if (!fname) {
      setFnameError("Please enter your first name");
    } else if (!/^[A-Za-z]+$/.test(fname)) {
        setFnameError("Name should contain letters only");
      } else {
      setFnameError("");
    }
    

    if (!lname) {
        setLnameError("Please enter your last name");
      } else if (!/^[A-Za-z]+$/.test(lname)) {
        setLnameError("Name should contain letters only");
        } else {
        setLnameError("");
      }

    if (!password) {
      setPasswordError("Please enter a password");
    } else {
      setPasswordError("");
    }

    if (!passwordConfirmation) {
      setPasswordConfirmationError("Please confirm your password");
    } else {
      setPasswordConfirmationError("");
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

    // Perform additional validations as needed

    // TODO: Check for unique email address
    // You can make a request to the server to check if the email address is already used
    // For example, using the fetch() function or a library like axios
    fetch(`/landlords`)
        .then((response) => response.json())
        .then((data) => {
            const existingEmails = data.map((entry) => entry.email);
            if (existingEmails.includes(email)) {
            setEmailError("Email address is already in use");
            } else {
                setEmailError("");
                // Submit the signup data to the server
                fetch("/landlords", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fname,
                        lname,
                        email,
                        phone,
                        password,
                        password_confirmation: passwordConfirmation,
                    }),
                })
                .then((response) => {
                    if (response.ok) {
                        console.log("message sent");
                        resetForm();
                        setSubmitSuccess(true);
                        // history.push("/LandlordDashboard")
                        
                    } else {
                        console.log("Failed to send message");
                    }
                    
                })
                .catch((error) => {
                    console.log(error.message);
                });
                
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
    };
    if (submitSuccess) {
      // return <Redirect to="/LandlordDashboard" />;
      navigate("/landlorddashboard");
    }
    return (
        <>
        <Navbars isDark={true} />
        <CenteredContainer>
            <StyledSignupForm>
            {submitSuccess && <SuccessMessage>Signup successful!</SuccessMessage>}
            <form onSubmit={handleSubmit}>
                <h1>Signup Form</h1>
                <FieldContainer>
                <label>First Name</label>
                <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
                {fnameError && <ErrorMessage>{fnameError}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
                {lnameError && <ErrorMessage>{lnameError}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
                </FieldContainer>

                <FieldContainer>
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {passwordConfirmationError && (
                    <ErrorMessage>{passwordConfirmationError}</ErrorMessage>
                )}
                </FieldContainer>

                <input type="submit" value="Sign Up" />
            </form>
            </StyledSignupForm>
        </CenteredContainer>
        <Footer />
        </>
    );
};

export default Landlord;

// Styles
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledSignupForm = styled.div`
  width: 600px;

  form {
    display: flex;
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
  margin-top: 4rem;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  label {
    width: 100px;
    margin-right: 1rem;
  }

  input {
    flex: 1;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-left: 5px;
`;

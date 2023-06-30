import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {Lease} from './../../public/Documents/Lease.pdf'

const OtherDocuments = () => {
  const [agreementText, setAgreementText] = useState('');

  

  return (
    <div>
      <h2>Other Agreement</h2>

      <div>
        <p>
          Thank you for choosing our app as your preferred platform for managing your lease agreements. We strive to provide a seamless and efficient experience for all our users.
        </p>
        <p>
          By using our app, you agree to abide by the terms and conditions outlined in this lease agreement. It is important that you carefully read and understand the provisions set forth herein.
        </p>
        <p>
          Our app facilitates the process of creating, storing, and managing lease agreements. With our user-friendly interface and comprehensive features, you can easily generate legally binding lease agreements tailored to your specific requirements.
        </p>
        <p>
          It is essential that you provide accurate and up-to-date information when creating lease agreements through our app. Any false or misleading information may result in legal consequences.
        </p>
        <p>
          We take the privacy and security of your data seriously. Rest assured that all the information you provide is encrypted and stored securely. We do not share your data with any third parties without your explicit consent.
        </p>
        <p>
          Please note that our app serves as a platform for lease agreement management, and we do not provide legal advice. It is recommended that you consult with a qualified legal professional for any legal concerns or questions regarding your lease agreements.
        </p>
      </div>

      
      

      <div>
        <p></p>
        <h4>Attachment:</h4>
        <Link
            to="/TSC.pdf"
            download= "Terms and Conditions"
            target="_blank" 
            rel="noreferrer"
        >
            Download Terms and Conditions
        </Link>
      </div>
    </div>
  );
};

export default OtherDocuments;

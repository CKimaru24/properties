import React, { useState } from "react";
import styled from "styled-components";

const AddTenant = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [isSelected, setIsSelected] = useState(false);

//   const preset_key = "profiles";

    const [fullname, setFullname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [Krapin, setKrapin] = useState('');
    const [nationality, setNationality] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [emailaddress, setEmailaddress] = useState('');
    const [currentaddress, setCurrentaddress] = useState('');
    const [emergencycontact, setemergencycontact] = useState('');
    const [idtype, setIdtype] = useState('');
    const [idnumber, setIdnumber] = useState('');
    const [idexpirydate, setIdexpirydate] = useState('');
    const [idattachment, setIdattachment] = useState(null);
    const [employer, setEmployer] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [monthlyincome, setMonthlyincome] = useState('');
    const [personalreference, setPersonalreference] = useState('');
    const [previouslandlord, setPreviouslandlord] = useState('');
    const [leasestartdate, setLeasestartdate] = useState('');
    const [leaseenddate, setLeaseenddate] = useState('');
    const [rentamount, setRentamount] = useState('');
    const [securitydeposit, setSecuritydeposit] = useState('');
    const [additionalnotes, setAdditionalnotes] = useState('');

  const handleFullname = (e) => {
    setFullname(e.target.value);
  };

  const handleDob = (e) => {
    setDob(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleKrapin = (e) => {
    setKrapin(e.target.value);
  };
  const handleNationality = (e) => {
    setNationality(e.target.value);
  };
  const handlePhonenumber = (e) => {
    setPhonenumber(e.target.value);
  };
  const handleEmailaddress = (e) => {
    setEmailaddress(e.target.value);
  };
  const handleCurrentaddress = (e) => {
    setCurrentaddress(e.target.value);
  };
  const handleEmergencycontact = (e) => {
    setemergencycontact(e.target.value);
  };
  const handleIdtype = (e) => {
    setIdtype(e.target.value);
  };
  const handleIdnumber = (e) => {
    setIdnumber(e.target.value);
  };
  const handleIdexpirydate = (e) => {
    setIdexpirydate(e.target.value);
  };
  const handleEmployer = (e) => {
    setEmployer(e.target.value);
  };
  const handleJobtitle = (e) => {
    setJobtitle(e.target.value);
  };
  const handleMonthlyincome = (e) => {
    setMonthlyincome(e.target.value);
  };
  const handlePersonalreference = (e) => {
    setPersonalreference(e.target.value);
  };
  const handlePreviouslandlord = (e) => {
    setPreviouslandlord(e.target.value);
  };
  const handleLeasestartdate = (e) => {
    setLeasestartdate(e.target.value);
  };
  const handleLeaseenddate = (e) => {
    setLeaseenddate(e.target.value);
  };
  const handleRentamount = (e) => {
    setRentamount(e.target.value);
  };
  const handleSecuritydeposit = (e) => {
    setSecuritydeposit(e.target.value);
  };
  const handleAdditionalnotes = (e) => {
    setAdditionalnotes(e.target.value);
  };
  const handleIdattachment = (e) => {
    setIdattachment(e.target.value);
  };
  const handleAttachment = (e) => {
    const selectedFile = e.target.files[0];
    setIdattachment(selectedFile);
    setIsSelected(true);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
    
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const tenantData = {
        fullname,
        dob,
        gender,
        Krapin,
        nationality,
        phonenumber,
        emailaddress,
        currentaddress,
        emergencycontact,
        idtype,
        idnumber,
        idexpirydate,
        idattachment,
        employer,
        jobtitle,
        monthlyincome,
        personalreference,
        previouslandlord,
        leasestartdate,
        leaseenddate,
        rentamount,
        securitydeposit,
        additionalnotes,
    };
    
    fetch('/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tenantData)
      })
      .then(response => {
        if (response.ok) {
          console.log('Tenant data submitted successfully');
          // Reset the form or perform any other actions
        } else {
          console.error('Failed to submit tenant data');
          // Handle the error
        }
      })
      .catch(error => {
        console.error('Error occurred while submitting tenant data', error);
        // Handle the error
      });
  };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle the form submission here based on the current page or any other conditions
//     if (currentPage === 7) {
//       handleSubmit();
//     }
//   };

  const renderForm = () => {
    switch (currentPage) {
      case 1:
        return (
            <PageContainer>
            <PageTitle>Personal Information</PageTitle>
            <FormField>
              <label htmlFor="fullname">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={handleFullname}
              />
            </FormField>
            <FormField>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleDob}
              />
            </FormField>
            <FormField>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={handleGender}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FormField>
            <FormField>
              <label htmlFor="Krapin">Social Security Number/ KRA PIN: </label>
              <input
                type="text"
                id="Krapin"
                name="Krapin"
                value={Krapin}
                onChange={handleKrapin}
              />
            </FormField>
            <FormField>
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={nationality}
                onChange={handleNationality}
              />
            </FormField>
          </PageContainer>
        );
      case 2:
        return (
            <PageContainer>
            <PageTitle>Contact Information</PageTitle>
            <FormField>
              <label htmlFor="phonenumber">Phone Number:</label>
              <input
                type="tel"
                id="phonenumber"
                name="phonenumber"
                value={phonenumber}
                onChange={handlePhonenumber}
              />
            </FormField>
            <FormField>
              <label htmlFor="emailaddress">Email Address:</label>
              <input
                type="email"
                id="emailaddress"
                name="emailaddress"
                value={emailaddress}
                onChange={handleEmailaddress}
              />
            </FormField>
            <FormField>
              <label htmlFor="currentaddress">Current Address:</label>
              <input
                type="text"
                id="currentaddress"
                name="currentaddress"
                value={currentaddress}
                onChange={handleCurrentaddress}
              />
            </FormField>
            <FormField>
              <label htmlFor="emergencycontact">Emergency Contact:</label>
              <input
                type="tel"
                id="emergencycontact"
                name="emergencycontact"
                value={emergencycontact}
                onChange={handleEmergencycontact}
              />
            </FormField>
          </PageContainer>
        );
      case 3:
        return (
            <PageContainer>
            <PageTitle>Identification</PageTitle>
            <FormField>
              <label htmlFor="idtype">ID Type:</label>
              <select
                id="idtype"
                name="idtype"
                value={idtype}
                onChange={handleIdtype}
              >
                <option value="">Select</option>
                <option value="nationalid">National ID</option>
                <option value="passport">Passport</option>
                <option value="militaryid">Military ID</option>
              </select>
            </FormField>
            <FormField>
              <label htmlFor="idnumber">ID Number:</label>
              <input
                type="text"
                id="idnumber"
                name="idnumber"
                value={idnumber}
                onChange={handleIdnumber}
              />
            </FormField>
            <FormField>
              <label htmlFor="idexpirydate">ID Expiry Date:</label>
              <input
                type="date"
                id="idexpirydate"
                name="idexpirydate"
                value={idexpirydate}
                onChange={handleIdexpirydate}
              />
            </FormField>
            <FormField>
                <label htmlFor="idattachment">ID Attachment:</label>
                <input
                    type="file"
                    id="idattachment"
                    name="idattachment"
                    onChange={handleIdattachment}
                />
            </FormField>
          </PageContainer>
        );
      case 4:
        return (
            <PageContainer>
            <PageTitle>Employment and Income</PageTitle>
            <FormField>
              <label htmlFor="employer">Employer's Contacts:</label>
              <input
                type="tel"
                id="employer"
                name="employer"
                value={employer}
                onChange={handleEmployer}
              />
            </FormField>
            <FormField>
              <label htmlFor="jobtitle">Job Title:</label>
              <input
                type="text"
                id="jobtitle"
                name="jobtitle"
                value={jobtitle}
                onChange={handleJobtitle}
              />
            </FormField>
            <FormField>
              <label htmlFor="monthlyincome">Monthly Income:</label>
              <input
                type="number"
                id="monthlyincome"
                name="monthlyincome"
                value={monthlyincome}
                onChange={handleMonthlyincome}
              />
            </FormField>
          </PageContainer>
        );
      case 5:
        return (
            <PageContainer>
            <PageTitle>References</PageTitle>
            <FormField>
              <label htmlFor="personalreference">Personal Reference's Contact:</label>
              <input
                type="tel"
                id="personalreference"
                name="personalreference"
                value={personalreference}
                onChange={handlePersonalreference}
              />
            </FormField>
            <FormField>
              <label htmlFor="previouslandlord">Previous Landlord's Contact:</label>
              <input
                type="tel"
                id="previouslandlord"
                name="previouslandlord"
                value={previouslandlord}
                onChange={handlePreviouslandlord}
              />
            </FormField>
          </PageContainer>
        );
      case 6:
        return (
            <PageContainer>
            <PageTitle>Lease Details</PageTitle>
            <FormField>
              <label htmlFor="leasestartdate">Lease Start Date:</label>
              <input
                type="date"
                id="leasestartdate"
                name="leasestartdate"
                value={leasestartdate}
                onChange={handleLeasestartdate}
              />
            </FormField>
            <FormField>
              <label htmlFor="leaseenddate">Lease End Date:</label>
              <input
                type="date"
                id="leaseenddate"
                name="leaseenddate"
                value={leaseenddate}
                onChange={handleLeaseenddate}
              />
            </FormField>
            <FormField>
              <label htmlFor="rentamount">Rent Amount:</label>
              <input
                type="number"
                id="rentamount"
                name="rentamount"
                value={rentamount}
                onChange={handleRentamount}
              />
            </FormField>
            <FormField>
              <label htmlFor="securitydeposit">Security Deposit:</label>
              <input
                type="number"
                id="securitydeposit"
                name="securitydeposit"
                value={securitydeposit}
                onChange={handleSecuritydeposit}
              />
            </FormField>
          </PageContainer>
        );
      case 7:
        return (
          <PageContainer>
            <PageTitle>Additional Notes</PageTitle>
            <FormField>
              <label htmlFor="additionalnotes">Additional Notes:</label>
              <TextArea
                id="additionalnotes"
                name="additionalnotes"
                placeholder="Additional Notes e.g. Special Requirements, Preferences or Important Considerations.&#10;If no additional Notes, indicate: No additional Note."
                value={additionalnotes}
                onChange={handleAdditionalnotes}
                rows={10} // Adjust the number of rows to fit your desired height
    />
            </FormField>
          </PageContainer>
        );
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add Tenant</FormTitle>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        {renderForm()}
        <ButtonsContainer>
          {currentPage > 1 && (
            <Button onClick={prevPage} style={{marginRight: "265px"}}>Previous</Button>
          )}
          {currentPage < 7 ? (
            <Button onClick={nextPage}>Next</Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </ButtonsContainer>
      </Form>
    </FormContainer>
  );
};

// Styled Components

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  padding: 20px;
  background-color: #f7f7f7;
`;

const PageContainer = styled.div`
  margin-bottom: 20px;
`;

const PageTitle = styled.h2`
  margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
//   height: 150px; /* Remove the double quotes */
`;

export default AddTenant;


//   const [formData, setFormData] = useState({
//     fullname: "",
//     dob: "",
//     gender: "",
//     Krapin: "",
//     nationality: "",
//     phonenumber: "",
//     emailaddress: "",
//     currentaddress: "",
//     emergencycontact: "",
//     idtype: "",
//     idnumber: "",
//     idexpirydate: "",
//     idattachment: "",
//     employer: "",
//     jobtitle: "",
//     monthlyincome: "",
//     personalreference: "",
//     previouslandlord: "",
//     leasestartdate: "",
//     leaseenddate: "",
//     rentamount: "",
//     securitydeposit: "",
//     additionalnotes: ""
//   });

// {isSelected ? (
//   <div>
//     <p>Filename: {idattachment.name}</p>
//     <p>Filetype: {idattachment.type}</p>
//     <p>Size in bytes: {idattachment.size}</p>
//     <p>
//       lastModifiedDate:{' '}
//       {idattachment.lastModifiedDate.toLocaleDateString()}
//     </p>
//   </div>
// ) : (
//   <p>Select a file to show details</p>
// )}


        // if (e.target.files) {
        //     const file = e.target.files[0];
        //     // Uploading the file using the fetch API to the server
        //     fetch('/tenants', {
        //       method: 'POST',
        //       body: file,
        //       headers: {
        //         'content-type': file.type,
        //         'content-length': `${file.size}`,
        //       },
        //     })
        //       .then((res) => res.json())
        //       .then((data) => {
        //         console.log(data);
        //         setIdattachment(data);
        //         setIsSelected(true);
        //         // Once the image is submitted, you can proceed to submit the rest of the form data
        //         // nextPage();
        //       })
        //       .catch((err) => console.error(err));
        //   }


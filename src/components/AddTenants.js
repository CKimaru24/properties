import React, { useState } from "react";
import styled from "styled-components";

const AddTenant = () => {
  const [currentPage, setCurrentPage] = useState(1);

//   const preset_key = "profiles";

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    KraPin: "",
    nationality: "",
    phoneNumber: "",
    emailAddress: "",
    currentAddress: "",
    emergencyContact: "",
    idType: "",
    idNumber: "",
    idExpiryDate: "",
    idAttachment: "",
    employer: "",
    jobTitle: "",
    monthlyIncome: "",
    personalReference: "",
    previousLandlord: "",
    leaseStartDate: "",
    leaseEndDate: "",
    rentAmount: "",
    securityDeposit: "",
    additionalNotes: ""
  });

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      idAttachment: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or data processing here
    console.log(formData);
  };

  const renderForm = () => {
    switch (currentPage) {
      case 1:
        return (
            <PageContainer>
            <PageTitle>Personal Information</PageTitle>
            <FormField>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </FormField>
            <FormField>
              <label htmlFor="KraPin">Social Security Number/ KRA PIN: </label>
              <input
                type="text"
                id="KraPin"
                name="KraPin"
                value={formData.KraPin}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </FormField>
          </PageContainer>
        );
      case 2:
        return (
            <PageContainer>
            <PageTitle>Contact Information</PageTitle>
            <FormField>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="currentAddress">Current Address:</label>
              <input
                type="text"
                id="currentAddress"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="emergencyContact">Emergency Contact:</label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </FormField>
          </PageContainer>
        );
      case 3:
        return (
            <PageContainer>
            <PageTitle>Identification</PageTitle>
            <FormField>
              <label htmlFor="idType">ID Type:</label>
              <input
                type="text"
                id="idType"
                name="idType"
                value={formData.idType}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="idNumber">ID Number:</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="idExpiryDate">ID Expiry Date:</label>
              <input
                type="date"
                id="idExpiryDate"
                name="idExpiryDate"
                value={formData.idExpiryDate}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="idAttachment">ID Attachment:</label>
              <input
                type="file"
                id="idAttachment"
                name="idAttachment"
                value={formData.idAttachment}
                onChange={handleFile}
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
                value={formData.employer}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="jobTitle">Job Title:</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="monthlyIncome">Monthly Income:</label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
              />
            </FormField>
          </PageContainer>
        );
      case 5:
        return (
            <PageContainer>
            <PageTitle>References</PageTitle>
            <FormField>
              <label htmlFor="personalReference">Personal Reference's Contact:</label>
              <input
                type="tel"
                id="personalReference"
                name="personalReference"
                value={formData.personalReference}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="previousLandlord">Previous Landlord's Contact:</label>
              <input
                type="tel"
                id="previousLandlord"
                name="previousLandlord"
                value={formData.previousLandlord}
                onChange={handleChange}
              />
            </FormField>
          </PageContainer>
        );
      case 6:
        return (
            <PageContainer>
            <PageTitle>Lease Details</PageTitle>
            <FormField>
              <label htmlFor="leaseStartDate">Lease Start Date:</label>
              <input
                type="date"
                id="leaseStartDate"
                name="leaseStartDate"
                value={formData.leaseStartDate}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="leaseEndDate">Lease End Date:</label>
              <input
                type="date"
                id="leaseEndDate"
                name="leaseEndDate"
                value={formData.leaseEndDate}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="rentAmount">Rent Amount:</label>
              <input
                type="number"
                id="rentAmount"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <label htmlFor="securityDeposit">Security Deposit:</label>
              <input
                type="number"
                id="securityDeposit"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
              />
            </FormField>
          </PageContainer>
        );
      case 7:
        return (
          <PageContainer>
            <PageTitle>Additional Notes</PageTitle>
            <FormField>
              <label htmlFor="additionalNotes">Additional Notes:</label>
              <TextArea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Additional Notes e.g. Special Requirements, Preferences or Important Considerations.&#10;If no additional Notes, indicate: No additional Note."
                value={formData.additionalNotes}
                onChange={handleChange}
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
      <Form onSubmit={handleSubmit}>
        {renderForm()}
        <ButtonsContainer>
          {currentPage > 1 && (
            <Button onClick={prevPage} style={{marginRight: "265px"}}>Previous</Button>
          )}
          {currentPage < 7 ? (
            <Button type="submit" onClick={nextPage}>Next</Button>
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

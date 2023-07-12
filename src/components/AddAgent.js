import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 0.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

const CheckboxInput = styled.input`
  /* Your checkbox input styles */
`;

const SkillsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const SkillsLabel = styled.label`
  margin-right: 1rem;
`;

const SkillsInput = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4285f4;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3367d6;
  }
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LevelLabel = styled.label`
  margin-right: 0.5rem;
`;

const AgentLevels = ['High', 'Medium', 'Low']; // Adjust the levels as per your requirement

// ...


const AddAgent = () => {
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [emailaddress, setEmailaddress] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [workhistory, setWorkhistory] = useState('');
  const [certifications, setCertifications] = useState('');
  const [education, setEducation] = useState('');
  const [marketingexperience, setMarketingexperience] = useState('');
  const [onlinemarketing, setOnlinemarketing] = useState(false);
  const [socialmediapromotion, setSocialmediapromotion] = useState(false);
  const [communicationskills, setCommunicationskills] = useState('');
  const [interpersonalskills, setInterpersonalskills] = useState('');
  const [marketingknowledge, setMarketingknowledge] = useState('');
  const [technologyskills, setTechnologyskills] = useState(false);
  const [workinghours, setWorkinghours] = useState('');
  const [additionalcomments, setAdditionalcomments] = useState('');
  const [agreement, setAgreement] = useState(false);

  const handleCommunicationSkillsChange = (value) => {
    setCommunicationskills(value);
  };

  const handleInterpersonalSkillsChange = (value) => {
    setInterpersonalskills(value);
  };

  const handleMarketingSkillsChange = (value) => {
    setMarketingknowledge(value);
  };

  const handleTechnologySkillsChange = (value) => {
    setTechnologyskills(value);
  };
  

  const handleSubmit = (e) => {
  e.preventDefault();

  // Perform form validation and submit the agent data to the backend
  const agentData = {
    fullname,
    dob,
    gender,
    phonenumber,
    emailaddress,
    address,
    city,
    country,
    workhistory,
    certifications,
    education,
    marketingexperience,
    onlinemarketing,
    socialmediapromotion,
    communicationskills,
    interpersonalskills,
    marketingknowledge,
    technologyskills,
    workinghours,
    additionalcomments,
    agreement,
  };

  console.log("Token:", localStorage.getItem("token"));

  fetch('/agents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from local storage
    },
    body: JSON.stringify(agentData),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Agent data submitted successfully');
        // Reset form fields after successful submission
        setFullname('');
        setDob('');
        setGender('');
        setPhonenumber('');
        setEmailaddress('');
        setAddress('');
        setCity('');
        setCountry('');
        setWorkhistory('');
        setCertifications('');
        setEducation('');
        setMarketingexperience('');
        setOnlinemarketing(false);
        setSocialmediapromotion(false);
        setCommunicationskills('');
        setInterpersonalskills('');
        setMarketingknowledge('');
        setTechnologyskills(false);
        setWorkinghours('');
        setAdditionalcomments('');
        setAgreement(false);
      } else {
        console.error('Failed to submit agent data');
        // Handle submission error
      }
    })
    .catch((error) => {
      console.error('Error occurred while submitting agent data', error);
      // Handle submission error
    });
};


  return (
    <Container>
      <Title>Add Agent</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="gender">Gender:</Label>
          <Select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >  
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="emailaddress">Email</Label>
          <Input
            type="email"
            id="emailaddress"
            value={emailaddress}
            onChange={(e) => setEmailaddress(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phonenumber">Phone Number</Label>
          <Input
            type="tel"
            id="phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >  
            <option value="">-- Select Your City -- </option>
            <option value="nairobi">Nairobi</option>
            <option value="eldoret">Eldoret</option>
            <option value="malindi">Malindi</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="country">Country</Label>
          <Select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option value="">-- Select Country --</option>
            {/* Add options for all countries */}
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            {/* ... and so on */}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="workhistory">Work History</Label>
          <TextArea
            id="workhistory"
            value={workhistory}
            onChange={(e) => setWorkhistory(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="certifications">Certifications</Label>
          <TextArea
            id="certifications"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="education">Education</Label>
          <TextArea
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="marketingexperience">Marketing Experience</Label>
          <Input
            type="text"
            id="marketingexperience"
            value={marketingexperience}
            onChange={(e) => setMarketingexperience(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Online Marketing</Label>
          <CheckboxContainer>
            <Checkbox
              id="onlinemarketing"
              checked={onlinemarketing}
              onChange={(e) => setOnlinemarketing(e.target.checked)}
            />
            <CheckboxLabel htmlFor="onlinemarketing">Online Marketing</CheckboxLabel>
          </CheckboxContainer>
        </FormGroup>
        <FormGroup>
          <Label>Social Media Promotion</Label>
          <CheckboxContainer>
            <Checkbox
              id="socialmediapromotion"
              checked={socialmediapromotion}
              onChange={(e) => setSocialmediapromotion(e.target.checked)}
            />
            <CheckboxLabel htmlFor="socialmediapromotion">Social Media Promotion</CheckboxLabel>
          </CheckboxContainer>
        </FormGroup>
        <FormGroup>
          <Label>Communication Skills</Label>
          <SkillsContainer>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="communicationskills"
                value="high"
                checked={communicationskills === 'high'}
                onChange={() => handleCommunicationSkillsChange('high')}
              />
              High
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="communicationskills"
                value="medium"
                checked={communicationskills === 'medium'}
                onChange={() => handleCommunicationSkillsChange('medium')}
              />
              Medium
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="communicationskills"
                value="low"
                checked={communicationskills === 'low'}
                onChange={() => handleCommunicationSkillsChange('low')}
              />
              Low
            </SkillsLabel>
          </SkillsContainer>
        </FormGroup>
        <FormGroup>
          <Label>Interpersonal Skills</Label>
          <SkillsContainer>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="interpersonalskills"
                value="high"
                checked={interpersonalskills === 'high'}
                onChange={() => handleInterpersonalSkillsChange('high')}
              />
              High
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="interpersonalskills"
                value="medium"
                checked={interpersonalskills === 'medium'}
                onChange={() => handleInterpersonalSkillsChange('medium')}
              />
              Medium
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="interpersonalskills"
                value="low"
                checked={interpersonalskills === 'low'}
                onChange={() => handleInterpersonalSkillsChange('low')}
              />
              Low
            </SkillsLabel>
          </SkillsContainer>
        </FormGroup>
        <FormGroup>
          <Label>Marketing Knowledge</Label>
          <SkillsContainer>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="marketingknowledge"
                value="high"
                checked={marketingknowledge === 'high'}
                onChange={() => handleMarketingSkillsChange('high')}
              />
              High
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="marketingknowledge"
                value="medium"
                checked={marketingknowledge === 'medium'}
                onChange={() => handleMarketingSkillsChange('medium')}
              />
              Medium
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="marketingknowledge"
                value="low"
                checked={marketingknowledge === 'low'}
                onChange={() => handleMarketingSkillsChange('low')}
              />
              Low
            </SkillsLabel>
          </SkillsContainer>
        </FormGroup>
        <FormGroup>
          <Label>Technology Skills</Label>
          <SkillsContainer>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="technologyskills"
                value="high"
                checked={technologyskills === 'high'}
                onChange={() => handleTechnologySkillsChange('high')}
              />
              High
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="technologyskills"
                value="medium"
                checked={technologyskills === 'medium'}
                onChange={() => handleTechnologySkillsChange('medium')}
              />
              Medium
            </SkillsLabel>
            <SkillsLabel>
              <SkillsInput
                type="radio"
                name="technologyskills"
                value="low"
                checked={technologyskills === 'low'}
                onChange={() => handleTechnologySkillsChange('low')}
              />
              Low
            </SkillsLabel>
          </SkillsContainer>
        </FormGroup>
        {/* <FormGroup>
          <Label>Technology Skills</Label>
          <CheckboxContainer>
            <Checkbox
              id="technologyskills"
              checked={technologyskills}
              onChange={(e) => setTechnologyskills(e.target.checked)}
            />
            <CheckboxLabel htmlFor="technologyskills">Technology Skills</CheckboxLabel>
          </CheckboxContainer>
        </FormGroup> */}
        <FormGroup>
          <Label htmlFor="workinghours">Working Hours</Label>
          <Input
            type="text"
            id="workinghours"
            value={workinghours}
            onChange={(e) => setWorkinghours(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="additionalcomments">Additional Comments</Label>
          <TextArea
            id="additionalcomments"
            value={additionalcomments}
            onChange={(e) => setAdditionalcomments(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="agreement">
            <input
              type="checkbox"
              id="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              required
            />{' '}
            I agree to the terms and conditions
          </Label>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddAgent;

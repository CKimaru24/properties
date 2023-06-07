export default function validateInfo(values) {
    let errors = {};
  
    if (!values.fname.trim()) {
      errors.fname = 'First Name is required';
    }
    else if (!/^[A-Za-z]+/.test(values.fname.trim())) {
      errors.fname = 'Enter a valid name';
    }
    if (!values.lname.trim()) {
      errors.lname = 'Last Name is required';
    }
    else if (!/^[A-Za-z]+/.test(values.lname.trim())) {
      errors.lname = 'Enter a valid name';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Enter a valid phone number';
    }
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }
  
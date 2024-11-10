import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

const SignUp = () => {
  // Hooks must be called inside the component function
  const navigate = useNavigate();
  const [Credential, setCredential] = useState({ name: "", password: "", email: "" });

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(Credential);  // Ensure the form data is correct

    // Validate if the fields are not empty
    if (!Credential.name || !Credential.email || !Credential.password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: Credential.name,
          password: Credential.password,
          email: Credential.email
        }),
      });

      const result = await response.json();
      console.log(result);

      // Handle unsuccessful response
      if (!result.success) {
        alert("Enter valid data or email already exists");
      } else {
        // Ensure result.newUser exists before accessing it
        if (result) {
          console.log("Navigating to home page");

          // Save the new user's information in localStorage
          localStorage.setItem("user", JSON.stringify({ name: Credential.name, email: Credential.email }));
          // Retrieve the user data from localStorage and parse it back into an object
          const storedUser = JSON.parse(localStorage.getItem("user"));

          if (storedUser) {
            console.log(storedUser.name);  // Access the 'name' property
            console.log(storedUser.email); // Access the 'email' property
          } else {
            console.log("No user data found in localStorage.");
          }

          // Redirect to home page
          navigate("/");
        } else {
          alert("Failed to retrieve user data.");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    }
  };

  // Input change handler
  const onchange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user" className="me-3" size='lg' />
                  <MDBInput label='Your Name' type="text" id='form1' name='name' value={Credential.name} onChange={onchange} className='w-100' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope" className="me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' type='email' name='email' value={Credential.email} onChange={onchange} className='w-100' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock" className="me-3" size='lg' />
                  <MDBInput label='Password' id='form3' type='password' name='password' value={Credential.password} onChange={onchange} className='w-100' />
                </div>

                <div className='mb-4'>
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn type="submit" className="btn btn-success mb-4" size='lg'>Register</MDBBtn>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;

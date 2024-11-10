import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Move handleSubmit inside the component
  const handleSubmit = async () => {
    try {
      let response = await fetch('http://localhost:8000/api/loginuser', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Login failed. Please try again.");
        return;
      }
  
      let result = await response.json();
      if (result.name && result.email) {
        console.log(`Name: ${result.name}, Email: ${result.email}`);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope" className="me-3" size='lg' />
                <MDBInput 
                  label='Your Email' 
                  id='form2' 
                  type='email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className='w-100' 
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock" className="me-3" size='lg' />
                <MDBInput 
                  label='Password' 
                  id='form3' 
                  type='password' 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='w-100' 
                />
              </div>

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn onClick={handleSubmit} className='mb-4' size='lg'>Login</MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;

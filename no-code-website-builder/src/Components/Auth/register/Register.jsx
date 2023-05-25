import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import "./register.css";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';



function Register() {

  const history = useHistory();
   const [registerInput, setRegister] = useState({
     name: '',
     email: '',
     password: '',
     error_list: [],
   });

   const handleInput = (e) => {
     e.persist();
     setRegister({...registerInput, [e.target.name]: e.target.value })
   }

   const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password:registerInput.password,
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, data).then(res =>{
        if(res.data.status === 200)
        {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            swal("Success", res.data.message,"success");
            history.push('/home')
        }
        else{
            setRegister({ ...registerInput,error_list: res.data.validation_errors});
        }
      })
  })
   }

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <form onSubmit={registerSubmit}>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' name='name' onChange={handleInput} value={registerInput.name}/>
          <span>{registerInput.error_list.name}</span>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name='email' onChange={handleInput} value={registerInput.email}/>
          <span>{registerInput.error_list.email}</span>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' name='password' onChange={handleInput} value={registerInput.password}/>
          <span>{registerInput.error_list.password}</span>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Register</MDBBtn>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <a href='/login'>Login</a>
          </div>
        </MDBCardBody>
      </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Register;
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
import "./login.css";
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';



function Login() {

  const history = useHistory();
   const [loginInput, setLogin] = useState({
     email: '',
     password: '',
     error_list: [],
   });

   const handleInput = (e) => {
     e.persist();
     setLogin({...loginInput, [e.target.name]: e.target.value })
   }

   const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password:loginInput.password,
    }
   
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        if(res.data.status === 200) 
        {
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_name', res.data.username);
            swal("Success", res.data.message,"success");
            history.push('/home')
        }
        else if(res.data.status === 401)
        {
          swal("warning", res.data.message,"warning");
        }
        else 
        {
           setLogin({...loginInput, error_list: res.data.validation_error});
        }
      });
    })
  }
   

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' >
      <div className='mask gradient-custom-3'></div>
      <form onSubmit={loginSubmit}>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Login</h2>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name='email' onChange={handleInput} value={loginInput.email}/>
          <span>{loginInput.error_list.email}</span>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' name='password' onChange={handleInput} value={loginInput.password}/>
          <span>{loginInput.error_list.password}</span>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Login</MDBBtn>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <a href='/register'>Create new account</a>
          </div>
        </MDBCardBody>
      </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Login;
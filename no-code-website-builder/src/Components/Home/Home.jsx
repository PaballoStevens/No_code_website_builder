import React from 'react';
import { useHistory } from 'react-router-dom';
import "./home.css";
import { FaPlus } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import Header from './Header';


function Home() {
 
  const history = useHistory();


  const createSubmit = (e) => {
     e.preventDefault();
     history.push('/project-name')
  }

  const template = (e) => {
    e.preventDefault();
    history.push('/templates')
 }

  return (
<div>
<Header />

<div className="row p-6">
  <div className="col-sm-4">
  </div>
  <div className="col-sm-2">
    <div className="card button">
      <div className="card-body text-align-center ">
        <button type='button' onClick={createSubmit} className='btn btn-lg bg-primary text-white float-center col-sm'><FaPlus /></button><br/>
        Create New Site
      </div>
    </div>
  </div>
  <div className="col-sm-2">
    <div className="card button">
      <div className="card-body text-align-center ">
        <button type='button' onClick={template} className='btn btn-lg bg-primary text-white float-center col-sm'><FaBook /></button><br/>
        Templates
      </div>
    </div>
  </div>
  <div className="col-sm-4">
  </div>
</div>
</div>
  )
}


export default Home


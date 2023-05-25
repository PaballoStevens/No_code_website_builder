import React, { useRef, useState  }  from 'react';
import './form.css';
import { FaArrowRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';


function ProjectName() {
  const history = useHistory();
  
  const [projectInput, setProjectName] = useState({
    name : '',
  });

  const handleInput = (e) => {
    e.persist();
    setProjectName({...projectInput, [e.target.name]: e.target.value })
  }

  const ProjectNameSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name: projectInput.name,
    }
  
    localStorage.setItem('name', JSON.stringify(data));
  
    const res = {
      data: {
        status: 200 
      }
    }
  
    if (res.data.status === 200) {
      history.push('/create');
    } else if (res.data.status === 401) {
      
    }
  }
  
  return (
    <div className="form">
        <form className='form__group field' onSubmit={ProjectNameSubmit}>
            <input type="text" className='input' name='name' placeholder='Project Name' onChange={handleInput} value={projectInput.name} required/>
            <br/>
            <br/>
            <button className='btn btn-light p-3 rounded-circle btn-lg btnname' type='submit'>< FaArrowRight/></button>
        </form>
    </div>
  )
}

export default ProjectName

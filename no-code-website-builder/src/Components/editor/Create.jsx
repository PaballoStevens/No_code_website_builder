import React, { useState, useEffect } from 'react';
import grapesjs from "grapesjs";
import "./editor.css";
import basic from "grapesjs-blocks-basic"
import form  from "grapesjs-plugin-forms"
import navbar from "grapesjs-navbar"
import gjsPresetWebpage from "grapesjs-preset-webpage";
import stylebg from "grapesjs-style-bg";
import customCode from "grapesjs-custom-code";
import tabs from "grapesjs-tabs";
import flexbox from "grapesjs-blocks-flexbox"
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


function Create() {
  const history = useHistory();
  const [name, setName] = useState('');
    const [editor, setEditor] = useState(null);
    useEffect(() => {
    const editor = grapesjs.init({
    container: "#editor",
    plugins: [form , basic,navbar, gjsPresetWebpage,stylebg, customCode, tabs, flexbox],
 });
 setEditor(editor);
}, []);

const homepage = (e) => {
  e.persist();

  localStorage.clear();
  history.push('home');

}

const savepage = (e) => {
  e.persist();
 const savedName = localStorage.getItem('name');
  if (savedName) {
    const parsedName = JSON.parse(savedName);
    setName(parsedName.name);
  }
  const data = {
    projectName: name,
    html : editor.getHtml(),
    css : editor.getCss(),
  }

 axios.post(`/api/storeweb`, data).then(res => {
   if(res.data.status === 200)
   {
    swal("Success", res.data.message,"success");
     localStorage.clear();
   }
   else if(res.data.status === 400) {

   }
   else {
     
   }
  });
 };

 
 useEffect(() => {
  const savedName = localStorage.getItem('name');
  if (savedName) {
    const parsedName = JSON.parse(savedName);
    setName(parsedName.name);
  }
}, []);

 var AuthButtons = '';
  if(!localStorage.getItem('auth_token'))
  {

  }
  else {
    AuthButtons = (
      <li className="nav-item">
        Project Name: {name}
           <button type='button' onClick={savepage} className='btn-primary shadow-none bg-primary'>Save</button>
        </li>
    )
  }

  return (
    <div className='editor'>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
     <a className="navbar-brand" type='button' onClick={homepage}>
           <img src="" alt="" srcSet="" />
           HOME
      </a>
      <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i className="navbar-toggler-icon "></i>
      </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav ms-auto">
       <form>
       {AuthButtons}
       </form>
            
      </ul>
    </div>
  </div>
</nav>
     <br/>
    <div id='editor'> </div>
</div>
  )
}

export default Create
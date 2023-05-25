import axios from 'axios'
import React from 'react'
import { BrowserRouter as Router, Redirect, Route , Switch } from 'react-router-dom';
import home from './Components/Home/Home';
import register from './Components/Auth/register/Register';
import login from './Components/Auth/login/Login';
import create from './Components/editor/Create';
import Edit from './Components/editor/Edit';
import Page from './Components/editor/page';
import Template from './Components/templates/Templates';
import TemplateEditor from './Components/editor/TemplateEditor';
import View from './Components/templates/View';
import ProjectName from './Components/editor/ProjectName';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {
  return (
   <Router>
    <Switch>
       <Route path="/home" component= {home} />
       <Route path="/Create" component= {create} />
       <Route path="/edit/:id" component= {Edit} /> 
       <Route path="/edit-template/:id" component= {TemplateEditor} />
      <Route path="/register" component= {register} />
      <Route path="/page/:identifier" component= {Page} />
      <Route path="/view-template/:identifier" component= {View} />
      <Route path="/project-name" component= {ProjectName} />
      <Route path="/templates" component= {Template} />
       <Route path="/" component= {login} /> 
       <Route path="/">
         {localStorage.getItem('auth_token') ? <Redirect to='/home' /> : <login />}
       </Route>

       <Route path="/register">
         {localStorage.getItem('auth_token') ? <Redirect to='/home' /> : <register />}
       </Route>
    </Switch>
   </Router>
  )
}

export default App
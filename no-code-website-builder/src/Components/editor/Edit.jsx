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

function Edit(props) {
    const [editor, setEditor] = useState(null);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [form , basic,navbar, gjsPresetWebpage,stylebg, customCode, tabs, flexbox],
        });
        setEditor(editor);

        // Fetch page data by ID and update the editor
        const id = props.match.params.id;
        axios.get(`/api/get-storeweb/${id}`).then(res => {
            if(res.data.status === 200)
            {
                setPageData(res.data.data);
            }
            else if(res.data.status === 400) {

            }
            else {

            }
        });
    }, []);

    useEffect(() => {
        if (editor && pageData) {
            editor.setComponents(pageData.html);
            editor.setStyle(pageData.css);
        }
    }, [editor, pageData]);


    const publishPage = (e) => {
        e.persist();
        
        const data = {
            html : editor.getHtml(),
            css : editor.getCss(),
        }
        const id = props.match.params.id;
        axios.put(`/api/edit-storeweb/${id}`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Success", res.data.message,"success");
            }
            else if(res.data.status === 400) {

            }
            else {

            }
        });
    };

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {

    }
    else {
        AuthButtons = (
            <li className="nav-item">
            <button type='button' onClick={publishPage} className='btn-primary shadow-none bg-primary'>Update</button>
        </li>
        )
    }

    return (
        <div className='editor'>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
     <a className="navbar-brand" href="#">
           <img src="" alt="" srcset="" />
      </a>
      <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i className=""></i>
      </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav ms-auto">
            {AuthButtons}
      </ul>
    </div>
  </div>
</nav>
            <br/>
            <div id='editor'> </div>
        </div>
    )
}

export default Edit

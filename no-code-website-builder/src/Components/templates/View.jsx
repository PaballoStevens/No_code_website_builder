import React, { useState, useEffect } from 'react';
import axios from 'axios';

function View(props) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const identifier = props.match.params.identifier;
    axios.get(`/api/view-template/${identifier}`)
      .then(response => setContent(response.data.content))
      .catch(error => console.error(error));
  }, [props.match.params.identifier]);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: content.css }} />
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  );
}

export default View;

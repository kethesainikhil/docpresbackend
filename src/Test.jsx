import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
const Test = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [output, setOutput] = useState('');

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = 'https://doctorpresbackend.onrender.com/upload';
    const formData = new FormData();
    formData.append('image', file); // Ensure 'image' matches the name in multer configuration

    axios.post(url, formData)
      .then((response) => {
        setImage(URL.createObjectURL(file));
        setOutput(response.data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Doctor's prescription extractor</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      <hr />
      
 <div className="display">
 <h1>output:</h1>
 <h3>upload image</h3>
 <img style={{ width: '500px', marginBottom:10 }} src={image} alt="display" />

      <h1>extracted-text: <p>{output}</p></h1>
 </div>
    </div>
  );
};

export default Test;

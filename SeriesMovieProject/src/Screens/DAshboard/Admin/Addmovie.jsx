import React, { useState } from 'react';
import axios from 'axios';
import SideBar from '../Admin/SideBar'

function UploadCastsForm() {
  const [names, setNames] = useState([]);
  const [pictures, setPictures] = useState([]);

  const handleNameChange = (index, event) => {
    const newNames = [...names];
    newNames[index] = event.target.value;
    setNames(newNames);
  };

  const handlePictureChange = (index, event) => {
    const newPictures = [...pictures];
    newPictures[index] = event.target.files[0];
    setPictures(newPictures);
  };

  const handleAddCast = () => {
    setNames([...names, '']);
    setPictures([...pictures, null]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    names.forEach((name, index) => {
      formData.append('names', name);
      formData.append('castPictures', pictures[index]);
    });

    axios.post('http://localhost:3000/api/casts', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error uploading the cast members:', error);
      });
  };

  return (
    <SideBar>
      <form onSubmit={handleSubmit}>
        
      {names.map((name, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => handleNameChange(index, e)}
          />
          <input
            type="file"
            onChange={(e) => handlePictureChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddCast}>Add Cast</button>
      <button type="submit">Submit</button>
    </form>
    </SideBar>
    
  );
}

export default UploadCastsForm;

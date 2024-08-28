import React, { useState } from 'react';

const FilmAdd = () => {
  const [formData, setFormData] = useState({
    film_name: '',
    category: '',
    views: '',
    duration: '',
    language: '',
    rating: '',
    cast: '',
    description: '',
    year_released: '',
    poster: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(formData).forEach((key) => {
      formData.append(key, formData[key]);
    });

    try {
      await fetch('http://localhost:3000/api/filmsadd', {
        method: 'POST',
        body: formData,
      });
      console.log('Film added successfully');
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="film_name">Film Name:</label>
        <input
          type="text"
          id="film_name"
          name="film_name"
          value={formData.film_name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="views">Views:</label>
        <input
          type="number"
          id="views"
          name="views"
          value={formData.views}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="language">Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cast">Cast:</label>
        <input
          type="text"
          id="cast"
          name="cast"
          value={formData.cast}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="year_released">Year Released:</label>
        <input
          type="number"
          id="year_released"
          name="year_released"
          value={formData.year_released}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="poster">Poster:</label>
        <input
          type="file"
          id="poster"
          name="poster"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit">Add Film</button>
    </form>
  );
};

export default FilmAdd;
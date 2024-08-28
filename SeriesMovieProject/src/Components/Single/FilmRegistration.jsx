import React, { useState } from 'react';
import axios from 'axios';

const FilmRegistration = () => {
    const [filmData, setFilmData] = useState({
        film_name: '',
        category: '',
        views: '',
        duration: '',
        language: '',
        poster_url: null,
        rating: '',
        description: '',
        year_released: '',
        cast: []
    });

    const [castMember, setCastMember] = useState({ name: '', picture: null });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilmData({ ...filmData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFilmData({ ...filmData, poster_url: e.target.files[0] });
    };

    const handleCastChange = (e) => {
        const { name, value } = e.target;
        setCastMember({ ...castMember, [name]: value });
    };

    const handleCastFileChange = (e) => {
        setCastMember({ ...castMember, picture: e.target.files[0] });
    };

    const addCastMember = () => {
        setFilmData({ ...filmData, cast: [...filmData.cast, castMember] });
        setCastMember({ name: '', picture: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('film_name', filmData.film_name);
        formData.append('category', filmData.category);
        formData.append('views', filmData.views);
        formData.append('duration', filmData.duration);
        formData.append('language', filmData.language);
        formData.append('poster_url', filmData.poster_url);
        formData.append('rating', filmData.rating);
        formData.append('description', filmData.description);
        formData.append('year_released', filmData.year_released);
        formData.append('cast', JSON.stringify(filmData.cast));

        filmData.cast.forEach((castMember, index) => {
            formData.append(`casts`, castMember.picture);
        });

        try {
            await axios.post('http://localhost:3000/api/films', formData);
            alert('Film Registered Successfully!');
        } catch (error) {
            console.error('Error registering film', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="film_name" placeholder="Film Name" onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <input type="number" name="views" placeholder="Views" onChange={handleChange} />
            <input type="text" name="duration" placeholder="Duration" onChange={handleChange} required />
            <input type="text" name="language" placeholder="Language" onChange={handleChange} required />
            <input type="file" name="poster_url" onChange={handleFileChange} required />
            <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="number" name="year_released" placeholder="Year Released" onChange={handleChange} required />

            <h3>Add Cast Member</h3>
            <input type="text" name="name" placeholder="Cast Name" onChange={handleCastChange} required />
            <input type="file" name="picture" onChange={handleCastFileChange} required />
            <button type="button" onClick={addCastMember}>Add Cast Member</button>

            <button type="submit">Register Film</button>
        </form>
    );
};

export default FilmRegistration;

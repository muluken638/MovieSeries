import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout/Layout';

function FilmCastPage() {
  const { id } = useParams();
  const [casts, setCasts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cast data for the selected film
    axios.get(`http://localhost:3000/api/films/${id}/cast`)
      .then(response => {
        setCasts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cast:', error);
        setError('There was an error fetching the cast.');
        setLoading(false);
      });
      
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    
      <div className="min-height-screen container mx-auto px-2 my-6">
        <h1 className="text-3xl font-bold mb-6">Film Cast</h1>
        <div className="grid sm:mt-10 xl:grid-cols-4 2xl:grid-cols-3 sm:grid-cols-2 gap-6">
          {casts.map((cast, index) => (
            <div key={index} className="border border-border rounded-md p-4">
              <img src={`${cast.cast_picture}`} alt={cast.cast_name} className="w-full h-64 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-bold">{cast.cast_name}</h2>
            </div>
          ))}
        </div>
      </div>
  );
}

export default FilmCastPage;

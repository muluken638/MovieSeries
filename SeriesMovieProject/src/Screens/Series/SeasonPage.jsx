import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SeasonCard from './SeasonCard';
import Layout from '../../Layout/Layout';

const SeasonPage = () => {
  const [seasons, setSeasons] = useState([]);
  const { id } = useParams(); // This is the series ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/series/${id}/seasons`);
        setSeasons(response.data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };
    fetchSeasons();
  }, [id]);

  const handleSeasonClick = (seasonId) => {
    navigate(`/seasons/${seasonId}/episodes`);
  };

  return (
    <Layout>

    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Seasons for this Series</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seasons.map((season) => (
          <SeasonCard
            key={season.id}
            season={season}
            onClick={() => handleSeasonClick(season.id)}
          />
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default SeasonPage;
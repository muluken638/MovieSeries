import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";

const EpisodePage = () => {
  const [episodes, setEpisodes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/seasons/${id}/episodes`);
        setEpisodes(response.data);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };
    fetchEpisodes();
  }, [id]);

  const handleepisodesClick = (episodeId) => {
    navigate(`/api/episodeinfo/${episodeId}`);
  };

  return (
    <Layout>
      {/* ... */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 mx-4">
        {episodes.map((episode, index) => (
          <div
            className="border border-border cursor-pointer p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg"
            key={episode.id}
            onClick={() => handleepisodesClick(episode.id)}
          >
            <img
              src={`http://localhost:3000/images/films/${episode.poster_url}`}
              alt={episode.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
              <div className="flex-spans gap-3">
                <h1 className="font-semibold truncate text-lg text-menutext">{episode.title}</h1>
                <h3 className="font-semibold truncate text-lg flex gap-2 items-center">
                  <FaClockRotateLeft /> {episode.duration}
                </h3>
                <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'>
                  <FaEye /> {episode.Views > 999 ? (episode.Views > 9999 ? (episode.Views > 99999 ? `${Math.floor(episode.Views / 100000)}M` : `${Math.floor(episode.Views / 10000)}K`) : `${Math.floor(episode.Views / 1000)}K`) : episode.Views} Views
                </h4>
              </div>
              <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
                <BiHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default EpisodePage
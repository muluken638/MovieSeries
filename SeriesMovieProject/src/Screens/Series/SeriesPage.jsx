// SeriesPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { BiHeart, BiSearch } from 'react-icons/bi';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaEye, FaSpinner } from 'react-icons/fa';

const SeriesPage = () => {
    const [series, setSeries] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);
    const [activeGenre, setActiveGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const maxPage = 4;
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/series');
                setSeries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching series:', error);
                setError('Failed to fetch series data');
                setLoading(false);
            }
        };
        fetchSeries();
    }, []);

    useEffect(() => {
        setFilteredSeries(
            activeGenre
                ? series.filter(serie => serie.genre === activeGenre)
                : series
        );
    }, [activeGenre, series]);

    const handleGenreClick = (genre) => {
        setActiveGenre(genre);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSeriesClick = (seriesId) => {
        navigate(`/series/${seriesId}/seasons`);
    };

    const displayedSeries = filteredSeries.slice(0, page * maxPage);
    const distinctGenres = [...new Set(series.map(serie => serie.genre))];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const filteredSearchSeries = displayedSeries.filter(serie =>
        serie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="min-height-screen container mx-auto px-2 my-6">
                <div
                    className="flex gap-4 px-2 overflow-x-auto overflow-y-hidden sm:grid-cols-6 animate-smooth mb-2"
                    style={{
                        scrollbarWidth: 'none',
                        '-ms-overflow-style': 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {distinctGenres.map((genre, i) => (
                        <h1
                            key={i}
                            className={`bg-main border border-border rounded-md px-3 py-1 font-bold transitions cursor-pointer hover:scale-95 ${activeGenre === genre ? 'bg-subMain' : 'hover:bg-subMain'
                                }`}
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre}
                        </h1>
                    ))}
                </div>
                {/* <div className="col-span-3 ml-10 my-2 mr-10">
                    <form className='xl:w-[25%] text-sm bg-dry rounded flex-btn gap-4 md:w-full sm:w-full xs:w-full'>
                        <button
                            type='submit'
                            className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                            <BiSearch />
                        </button>
                        <input
                            type='text'
                            placeholder='Search'
                            value={searchTerm}
                            className='font-medium placeholder:text-border text-sm w-11/12 h-12 text-black rounded-sm outline-none bg-dry'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div> */}
                <h1 className="text-3xl font-bold pl-11 py-4">
                    Available Series{' '}
                    <span className=" text-subMain ">
                        {series.length}
                    </span>
                </h1>
                <div className='border-2 border-border mb-4'></div>

                <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 mx-4">
                    {filteredSearchSeries.map((serie, index) => (
                        <div className="border border-border cursor-pointer p-1 hover:scale-95 transitions relative overflow-hidden rounded-lg"
                            key={serie.id}
                            onClick={() => handleSeriesClick(serie.id)}
                        >
                            <img
                                src={`http://localhost:3000/images/films/${serie.poster_url}`}
                                alt={serie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-4">
                                <div className="flex-spans gap-3">
                                    <h1 className="font-semibold truncate text-lg text-menutext">{serie.title}</h1>
                                    <h3 className="font-semibold truncate text-lg flex gap-2 items-center">
                                        <FaClockRotateLeft /> {serie.duration}
                                    </h3>
                                    <h4 className='text-sm text-right font-sans italic flex gap-2 items-center text-cyan-400'>
                                        <FaEye /> {serie.Views > 999 ? (serie.Views > 9999 ? (serie.Views > 99999 ? `${Math.floor(serie.Views / 100000)}M` : `${Math.floor(serie.Views / 10000)}K`) : `${Math.floor(serie.Views / 1000)}K`) : serie.Views} Views
                                    </h4>
                                </div>
                                <button className='h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white'>
                                    <BiHeart />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {displayedSeries.length < filteredSeries.length && (
                    <div className="w-full flex-colo md:my-20 my-10 ">
                        <button
                            onClick={handleLoadMore}
                            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-border hover:bg-subMain hover:scale-95 transitions "
                        >
                            Loading more <FaSpinner className="animate-spin" />
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SeriesPage;
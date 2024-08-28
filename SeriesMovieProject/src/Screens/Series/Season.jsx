import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import SeriesInfo from './SeriesInfo';

function Season() {
    const { id } = useParams(); // Retrieve the series ID from URL
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state

    useEffect(() => {
        // Fetch seasons for the selected series
        axios.get(`http://localhost:3000/api/seasons/:id=${id}`)
            .then(response => {
                setSeasons(response.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('There was an error fetching the seasons!', error);
                setError('There was an error fetching the seasons.'); // Set error state
                setLoading(false); // Set loading to false on error
            });
    }, [id]);

    if (loading) return <div>Loading...</div>; // Display loading message
    if (error) return <div>{error}</div>; // Display error message

    return (
        <Layout>
            <SeriesInfo />
            <div className="gap-2 grid ml-2 mt-2 md:ml-2 sm:ml-1 xs:ml-0 w-full">
                {seasons.length > 0 ? (
                    seasons.map((season) => (
                        <div key={season.id} className="text-2xl font-bold items-center p-2 w-full bg-black text-white">
                            <div className="text-white grid gap-1 xs:flex-row xl:flex-cols">
                                <h1 className='font-bold text-white pl-2'>{season.name}</h1>
                                <img
                                    src={`/images/series/${season.poster}`}
                                    alt={season.name}
                                    className='w-[200px] h-[200px] object-cover border border-border'
                                />
                                <div className="text-white">
                                    <h1 className='text-start xl:text-4xl xs:text-sm md:text-[10px]'>{season.name}</h1>
                                    <p>Season Number: {season.number}</p>
                                    <p>Description: {season.description}</p>
                                    <p>Year: {season.year}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center w-full">No seasons available for this series.</div>
                )}
            </div>
        </Layout>
    );
}

export default Season;

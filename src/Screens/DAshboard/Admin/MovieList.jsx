import React, { useState, useMemo, useEffect } from 'react';
import SideBar from './SideBar';
import { Movies } from '../../../Data/Movies';

function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredMovies = useMemo(() => {
    return Movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())||
    movie.desc.toLowerCase().includes(searchTerm.toLowerCase())||
    movie.year.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, Movies]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl">Movie List</h2>
        <div className="flex justify-between items-center">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-border rounded-md px-3 py-2 w-full bg-main outline-none"
            />
          </div>
          <div className="flex gap-2">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-border rounded-md px-3 py-2 bg-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-transparent">
              <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie,i) => (
                
                <tr key={movie.id} className="border-b">
                  <td>{i+1}</td>
                  <td className="px-4 py-2">
                    <img
                      src={
                        movie?.titleimage
                          ? `/images/movies/${movie?.titleimage}`
                          : 'images/user.png'
                      }
                      alt={movie?.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-2">{movie.name}</td>
                  <td className="px-4 py-2 whitespace-normal">{movie.desc}</td>
                  <td className="px-4 py-2">{movie.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-main text-white transition border border-border'
                  : 'bg-subMain text-cyan-500 transition border border-border'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </SideBar>
  );
}

export default MovieList;
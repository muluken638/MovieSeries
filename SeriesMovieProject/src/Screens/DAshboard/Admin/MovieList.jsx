import React, { useState, useMemo, useEffect } from 'react';
import SideBar from './SideBar';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/films')
      .then(response => response.json())
      .then(data => setMovies(data));
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.film_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.year_released.toString().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, movies]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  const handleUpdate = (updatedMovie) => {
    
    setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
    setEditingMovie(null);
  };

  const handleDelete = (movie) => {
    setDeletingMovie(movie);
  };

  const confirmDelete = () => {
    
    setMovies(movies.filter(movie => movie.id !== deletingMovie.id));
    setDeletingMovie(null);
  };

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
        <div className="w-full">
          <table className=" table-auto w-full">
            <thead>
              <tr className="bg-transparent">
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                {/* <th className="px-4 py-2">Description</th> */}
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie, i) => (
                <tr key={movie.id} className="border-b">
                  <td>{i + 1}</td>
                  <td className="h-10 w-10 ">
                    <img
                      src={`http://localhost:3000/images/films/${movie.poster_url}`}
                      alt={movie.film_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-2">{movie.film_name}</td>
                  <td className="px-4 py-2">{movie.year_released}</td>
                  <td>
                    {editingMovie && editingMovie.id === movie.id ? (
                      <>
                        <input
                          type="text"
                          value={editingMovie.film_name}
                          onChange={(e) =>
                            setEditingMovie({ ...editingMovie, film_name: e.target.value })
                          }
                        />
                        <button onClick={() => handleUpdate(editingMovie)}>Save</button>
                        <button onClick={() => setEditingMovie(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(movie)}>Edit</button>
                        {deletingMovie && deletingMovie.id === movie.id ? (
                          <>
                            <button onClick={confirmDelete}>Confirm Delete</button>
                            <button onClick={() => setDeletingMovie(null)}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => handleDelete(movie)}>Delete</button>
                        )}
                      </>
                    )}
                  </td>
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
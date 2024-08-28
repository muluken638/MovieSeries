import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen'
import About from './Screens/About'
import Contact from './Screens/Contact'
import NotFound from './Screens/NotFound';
import MoviesPage from './Screens/MoviesPage';
import SingleMovie from './Screens/SingleMovie'
import WatchMovies from './Screens/WatchMovies';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/DAshboard/Admin/Profile';
import Dashboard from './Screens/DAshboard/Admin/Dashboard';
import Updateprofile from './Screens/DAshboard/Admin/Updateprofile'
import MovieList from './Screens/DAshboard/Admin/MovieList';
import Addmovie from './Screens/DAshboard/Admin/Addmovie';
import Series from './Screens/Series/Series';
import TvSeries from './Screens/TvSeries';
import SeriesSingle from './Screens/Series/SeriesSingle';
import Season from './Screens/Series/Season'
import SeriesInfo from './Screens/Series/SeriesInfo';
import EpisodeInfo from './Screens/Series/EpisodeInfo'
import FilmCastPage from './Screens/Films/FilmCastPage';
import Movie from './Components/Movie';
import MovieInfo from './Components/Single/MovieInfo';
import FilmRegistration from './Components/Single/FilmRegistration';
import SeasonPage from './Screens/Series/SeasonPage';
import EpisodePage from './Screens/Series/EpisodePage';
import SeriesPage from './Screens/Series/SeriesPage';


function App() {
  // AOS.init();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/api/films' element={<MoviesPage/>}/>
        <Route path="/films/:id/cast" element={<FilmCastPage/>} />
        <Route path='/api/moviesinfo/:id' element={<MovieInfo/>}/>
        <Route path='/movies/:id' element={<SingleMovie/>}/>
        <Route path='/watch/:id' element={<WatchMovies/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/userlist' element={<Profile/>}/>
        <Route path='/api/filmslist' element={<MovieList/>}/>
        <Route path='/password' element={<Profile/>}/>
        <Route path='/api/casts' element={<Addmovie/>}/>
        <Route path='/favorite' element={<Profile/>}/>
        <Route path='/updateprofile' element={<Updateprofile/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/api/series' element={<Series/>}/>
        <Route path='/tv' element={<TvSeries/>}/>
        <Route path='/api/singleseries/:id' element={<SeriesSingle/>}/>
        <Route path="/api/seasons/:id" element={<Season />} />
        <Route path="/api/seriesinfo/:id" element={<SeriesInfo />} />
        <Route path='/api/episodeinfo/:id' element={<EpisodeInfo/>}/>
        <Route path=' /films/:id/cast' element={<Movie/>}/>
        <Route path='/films/add' element={<FilmRegistration/>}/>
       

        <Route path="/api/seriesPage" element={<SeriesPage />} />
        <Route path="/series/:id/seasons" element={<SeasonPage />} />
        <Route path="/seasons/:id/episodes" element={<EpisodePage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
const express = require('express');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const router = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('public'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/casts');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'moviedb'
});


// Route to register a new film
app.post('/films/add', upload.single('poster'), (req, res) => {
  const { title, category, rating, views, duration, description } = req.body;
  const poster = req.file ? `/images/films/${req.file.filename}` : null;

  if (!title || !category || !poster || !rating || !views || !duration || !description) {
    return res.status(400).send('All fields are required.');
  }

  const query = 'INSERT INTO films (title, category, poster, rating, views, duration, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [title, category, poster, rating, views, duration, description];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error registering film:', err);
      res.status(500).send('An error occurred while registering the film.');
      return;
    }
    res.status(201).send('Film registered successfully.');
  });
});
//Route to register film casts
app.post('/api/casts', upload.array('castPictures', 10), (req, res) => { // 'castPictures' should match the field name in the form
  const names = req.body.names; // Expecting names as an array in the request body
  const files = req.files;

  if (!names || !files || names.length !== files.length) {
    return res.status(400).send('Number of names and pictures must match and not be empty.');
  }

  const values = names.map((name, index) => [name, `/images/casts/${files[index].filename}`]);

  const query = 'INSERT INTO CastMembers (name, picture) VALUES ?';

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error registering cast members:', err);
      res.status(500).send('An error occurred while registering the cast members.');
      return;
    }
    res.status(201).send('Cast members registered successfully.');
  });
});


// Fetch a specific series by ID
app.get('/api/series/:id', (req, res) => {
  const seriesId = req.params.id;
  const query = 'SELECT * FROM series WHERE id = ?';

  db.query(query, [seriesId], (err, results) => {
    if (err) {
      console.error('Error fetching series by ID:', err);
      res.status(500).send('An error occurred while fetching the series.');
      return;
    }
    res.json(results[0]);
  });
});


// Fetch all Films
app.get('/api/films', (req, res) => {
  const sql = 'SELECT * FROM Films';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
  });
});

// API endpoint to get cast for a specific film
app.get('/api/films/:id/casts', (req, res) => {
  const filmId = req.params.id;
  const query = 'SELECT cast FROM Films WHERE id = ?';

  connection.query(query, [filmId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      const film = results[0];
      const cast = JSON.parse(film.cast);
      res.json({ cast });
    } else {
      res.status(404).json({ message: 'Film not found' });
    }
  });
}); 
// API Endpoint to get SeriesMovies
app.get('/api/series', (req, res) => {
  const sql = 'SELECT * FROM SeriesMovies';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// Get seasons by series ID
app.get('/api/seriesinfo/:id', async (req, res) => {
    try {
        const seriesId = req.params.series_id;
        if (!seriesId) {
            return res.status(400).json({ error: 'seriesId parameter is required' });
        }
        // Query the database to get seasons for the specified series ID
        const seasons = db.query('SELECT * FROM seasons WHERE series_id = ?', [seriesId]);
        res.json(seasons);
    } catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({ error: 'An error occurred while fetching seasons' });
    }
});
// Fetch a specific movie by ID
app.get('/api/films/:id', (req, res) => {
  const movieId = req.params.id;
  const query = 'SELECT * FROM films WHERE id = ?';

  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error('Error fetching movie by ID:', err);
      res.status(500).send('An error occurred while fetching the movie.');
      return;
    }
    res.json(results[0]);
  });
});

// Example Express.js route handler
app.get('/api/episodes', (req, res) => {
  const seriesId = req.query.seriesId;
  // Validate seriesId and fetch data from the database
  // Example database query
  db.query('SELECT * FROM episodes WHERE series_id = ?', [seriesId], (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
  });
});


// Fetch a specific episode by ID
app.get('/api/episodes/:id', (req, res) => {
  const episodeId = req.params.id;
  const query = 'SELECT * FROM episodes WHERE id = ?';

  db.query(query, [episodeId], (err, results) => {
    if (err) {
      console.error('Error fetching episode by ID:', err);
      res.status(500).send('An error occurred while fetching the episode.');
      return;
    }
    res.json(results[0]);
  });
});

// Fetch episodes by series ID
app.get('/api/episodes/series/:seriesId', (req, res) => {
  const seriesId = req.params.seriesId;
  const query = 'SELECT * FROM episodes WHERE series_id = ?';

  db.query(query, [seriesId], (err, results) => {
    if (err) {
      console.error('Error fetching episodes by series ID:', err);
      res.status(500).send('An error occurred while fetching episodes by series ID.');
      return;
    }
    res.json(results);
  });
});

// Fetch top 10 rated SeriesMovies
app.get('/api/topmovies', (req, res) => {
  const query = 'SELECT * FROM seriesmovies ORDER BY rating DESC LIMIT 10';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top movies:', err);
      res.status(500).send('An error occurred while fetching top movies.');
      return;
    }
    res.json(results);
  });
});

// Fetch top 10 View Films
app.get('/api/topfilms', (req, res) => {
  const query = 'SELECT * FROM films ORDER BY rating DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top movies:', err);
      res.status(500).send('An error occurred while fetching top movies.');
      return;
    }
    res.json(results);
  });
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
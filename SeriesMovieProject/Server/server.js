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
app.use('/images', express.static('images'));

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
  const poster = req.file ? `/films/${req.file.filename}` : null;

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

// GET endpoint to retrieve all films
app.get('/api/filmslist', (req, res) => {
  connection.query('SELECT * FROM films', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ message: 'Error retrieving films' });
    }
    res.json(results);
  });
});
//Route to register film casts
app.post('/api/casts', upload.array('castPictures', 10), (req, res) => { // 'castPictures' should match the field name in the form
  const names = req.body.names; // Expecting names as an array in the request body
  const files = req.files;

  if (!names || !files || names.length !== files.length) {
    return res.status(400).send('Number of names and pictures must match and not be empty.');
  }

  const values = names.map((name, index) => [name, `/casts/${files[index].filename}`]);

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

// API endpoint to get totals
app.get('/totals', (req, res) => {
  const totalMoviesQuery = 'SELECT COUNT(*) AS totalMovies FROM films';
  const totalUsersQuery = 'SELECT COUNT(*) AS totalUsers FROM seriesmovies';
  const totalSeriesQuery = 'SELECT COUNT(*) AS totalSeries FROM seasons';

  db.query(totalMoviesQuery, (err, moviesResult) => {
    if (err) throw err;
    db.query(totalUsersQuery, (err, usersResult) => {
      if (err) throw err;
      db.query(totalSeriesQuery, (err, seriesResult) => {
        if (err) throw err;
        res.json({
          totalMovies: moviesResult[0].totalMovies,
          totalUsers: usersResult[0].totalUsers,
          totalSeries: seriesResult[0].totalSeries
        });
      });
    });
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



// API endpoint to get cast for a specific film
app.get('/api/films/:id/casts', (req, res) => {
  const filmId = req.params.id;
  const query = 'SELECT cast FROM films WHERE id = ?';

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


// Get all series
app.get('/api/series', (req, res) => {
  db.query('SELECT * FROM seriesmovies', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching series' });
    }
    res.json(results);
  });
});

// Get seasons for a specific series
app.get('/api/series/:id/seasons', (req, res) => {
  const seriesId = req.params.id;
  db.query('SELECT * FROM Seasons WHERE series_id = ?', [seriesId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching seasons' });
    }
    res.json(results);
  });
});


app.get('/api/seasons/:id/episodes', (req, res) => {
  const seasonId = req.params.id;
  db.query('SELECT * FROM episodes WHERE season_id = ?', [seasonId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching seasons' });
    }
    res.json(results);
  });
});

// Get seasons by series ID
app.get('/api/seriesinfo/:id', async (req, res) => {
  try {
      const seriesId = req.params.id; // Corrected this line
      if (!seriesId) {
          return res.status(400).json({ error: 'seriesId parameter is required' });
      }
      // Query the database to get seasons for the specified series ID
      const seasons = await db.query('SELECT * FROM seasons WHERE series_id = ?', [seriesId]);
      res.json(seasons);
  } catch (error) {
      console.error('Error fetching seasons:', error);
      res.status(500).json({ error: 'An error occurred while fetching seasons' });
  }
});

// Get Episodes info 

app.get('/api/episodeinfo/:id', (req, res) => {
  const movieId = req.params.id;
  const query = 'SELECT * FROM episodes WHERE id = ?';

  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error('Error fetching movie by ID:', err);
      res.status(500).send('An error occurred while fetching the movie.');
      return;
    }
    res.json(results[0]);
  });
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

// get all episoded 
app.get('/api/episodes', (req, res) => {
  const seriesId = req.query.seriesId;
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

// incement the views 
app.post('/api/films/:id/increment-views', (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE films SET views = views + 1 WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update views' });
    }
    res.json({ success: true, message: 'Views updated successfully' });
  });
});

// Fetch top 10 View Films
app.get('/api/topfilms', (req, res) => {
  const query = 'SELECT * FROM films ORDER BY views DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching top movies:', err);
      res.status(500).send('An error occurred while fetching top movies.');
      return;
    }
    res.json(results);
  });
});


//Get the data from the database 

// Fetch all Films
app.get('/api/films', (req, res) => {
  const sql = 'SELECT * FROM Films';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
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
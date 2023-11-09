// Import necessary libraries and modules
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import Handlebars from 'handlebars';
import 'dotenv/config';
import cors from 'cors';

// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://pktzvskk:GASl4Gf2KB9Nuge_RZNjHvIEAsFulhjC@ella.db.elephantsql.com/pktzvskk'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

// Create an Express application
const app = express();

// Set up Handlebars as the template engine
app.engine(
  'handlebars',
  engine({
    handlebars: Handlebars,
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      },
    },
  })
);

// Set the view engine to Handlebars
app.set('view engine', 'handlebars');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Configure middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up session management with a secret key
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Use the 'express-flash' middleware for flash messages
app.use(flash());

// Enable CORS for cross-origin requests
app.use(cors());

// Define an endpoint to list all shoes in stock
app.get('/api/shoes', async function (req, res) {
  try {
    const result = await db.any('SELECT * FROM shoes');
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define an endpoint to list all shoes for a chosen brand
app.get('/api/shoes/brand/:brandname', async function (req, res) {
  try {
    const brandName = req.params.brandname;
    const result = await db.any('SELECT * FROM shoes WHERE brand = $1', brandName);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by brand:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define an endpoint to list all shoes for a chosen size
app.get('/api/shoes/size/:size', async function (req, res) {
  try {
    const shoeSize = req.params.size;
    const result = await db.any('SELECT * FROM shoes WHERE size = $1', shoeSize);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by size:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define an endpoint to list all shoes for a chosen brand and size
app.get('/api/shoes/brand/:brandname/size/:size', async function (req, res) {
  try {
    const brandName = req.params.brandname;
    const shoeSize = req.params.size;
    const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2', [brandName, shoeSize]);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by brand and size:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define an endpoint to list all shoes for a chosen colour
app.get('/api/shoes/color/:color', async function (req, res) {
  try {
    const shoeColor = req.params.color;
    const result = await db.any('SELECT * FROM shoes WHERE color = $1', shoeColor);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by color:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define an endpoint to update the stock when a shoe is sold 
app.post('/api/shoes/sold/:id', (req, res) => {
  // try {
  //   const shoeId = req.params.id;

  //   // Implement code to update the database to mark the shoe with the given ID as sold.
  //   // update a 'in stock' column in the 'shoes' table.

  //   // Send a success response
  //   return res.status(200).json({ message: 'Shoe sold successfully.' });
  // } catch (error) {
  //   console.error('Error selling the shoe:', error);
  //   res.status(500).send('Internal Server Error');
  // }
});

// Define an endpoint to add a new shoe to the stock 
app.post('/api/shoes', (req, res) => {
  // try {
  //   const { color, brand, price, size, in_stock, image_url } = req.body;

  //   // Implement code to insert a new shoe into the database with the provided details.
  //   // insert a new record into the 'shoes' table.

  //   // Send a success response
  //   return res.status(201).json({ message: 'Shoe added to stock.' });
  // } catch (error) {
  //   console.error('Error adding a new shoe:', error);
  //   res.status(500).send('Internal Server Error');
  // }
});

// Set the port for the Express server
const PORT = process.env.PORT || 3007;

// Start the Express server
app.listen(PORT, function () {
  console.log('App started at port', PORT);
});

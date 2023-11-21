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
import shoeApiQuery from './services/query.js';
import shoeApiRoutes from './routes/routes.js';

// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://pktzvskk:GASl4Gf2KB9Nuge_RZNjHvIEAsFulhjC@ella.db.elephantsql.com/pktzvskk'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

// Create an Express application
const app = express();

const shoeQuery =  shoeApiQuery(db);
const shoeRoute = shoeApiRoutes(shoeQuery);

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

// list all shoes in stock
app.get('/api/shoes',shoeRoute.allShoesRoutes);


// list all shoes for chosen brand
app.get('/api/shoes/brand/:brandname', shoeRoute.filterBrand
);
// // list all shoes for chosen size
app.get('/api/shoes/size/:size', shoeRoute.filterSize);

// // list all shoes for chosen color
app.get('/api/shoes/color/:color', shoeRoute.filterColor);


// // list all shoes for chosen brand and size 
app.get('/api/shoes/brand/:brandname/size/:size', shoeRoute.filterBrandAndSize);


// // list all shoes for chosen brand and color 
app.get('/api/shoes/brand/:brandname/color/:color', shoeRoute.filterBrandAndColor);


// // list all shoes for chosen size and color 
app.get('/api/shoes/size/:size/color/:color', shoeRoute.filterSizeAndColor);



// // list all shoes for chosen brand and size and color
app.get('/api/shoes/brand/:brandname/size/:size/color/:color', shoeRoute.filterBrandAndSizeAndColor);

//this should update the stock when shoe is sold
app.post('/api/shoes/sold/:id');

// add a new shoe to the stock
app.post('/api/shoes',shoeRoute.addShoe)


// Set the port for the Express server
const PORT = process.env.PORT || 3007;

// Start the Express server
app.listen(PORT, function () {
  console.log('App started at port', PORT);
});

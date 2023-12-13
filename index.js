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
import ShoeCatalogueAPIRoutes from "./routes/routes.js";
import ShoeCatalogueAPIServices from "./services/query.js"

// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://pktzvskk:GASl4Gf2KB9Nuge_RZNjHvIEAsFulhjC@ella.db.elephantsql.com/pktzvskk'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

// Create an Express application
const app = express();

const shoeCatalogueAPIServices = ShoeCatalogueAPIServices(db);
const shoeCatalogueAPIRoutes = ShoeCatalogueAPIRoutes(shoeCatalogueAPIServices);

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

app.get("/api/shoes", shoeCatalogueAPIRoutes.getAllShoes)

app.get("/api/shoes/brand/:brandname", shoeCatalogueAPIRoutes.getShoesByBrand)

app.get("/api/shoes/size/:size", shoeCatalogueAPIRoutes.getShoesBySize)

app.get("/api/shoes/brand/:brandname/size/:size", shoeCatalogueAPIRoutes.getShoesByBrandAndSize)

app.get("/api/shoes/colour/:colour", shoeCatalogueAPIRoutes.getShoesByColour)

app.get("/api/shoes/brand/:brandname/colour/:colour", shoeCatalogueAPIRoutes.getShoesByBrandAndColour)

app.get("/api/shoes/brand/:brandname/colour/:colour/size/:size", shoeCatalogueAPIRoutes.getShoesByBrandAndColourAndSize)

app.get("/api/shoes/colour/:colour/size/:size", shoeCatalogueAPIRoutes.getShoesByColourAndSize)

app.post("/api/shoes/sold/:id", shoeCatalogueAPIRoutes.updateShoeStock)

app.post("/api/shoes", shoeCatalogueAPIRoutes.addNewShoe)

// Set the port for the Express server
const PORT = process.env.PORT || 3007;

// Start the Express server
app.listen(PORT, function () {
  console.log('App started at port', PORT);
});

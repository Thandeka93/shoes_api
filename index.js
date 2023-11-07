import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import Handlebars from 'handlebars';
import 'dotenv/config';
import cors from 'cors';

const connectionString = process.env.PGDATABASE_URL ||
 'postgres://pktzvskk:GASl4Gf2KB9Nuge_RZNjHvIEAsFulhjC@ella.db.elephantsql.com/pktzvskk'

const pgp = pgPromise();
const db = pgp(connectionString);

const app = express();

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

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(cors());


// list all shoes in stock
app.get('/api/shoes', async function (req, res) {
  try {
    const result = await db.any('SELECT * FROM shoes');
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes:', error);
    res.status(500).send('Internal Server Error');
  }
});
// list all shoes for chosen brand
app.get('/api/shoes/brand/:brandname', async function (req, res) {
  try {
    const brandName = req.params.brandname;
    // console.log(brandName);
    const result = await db.any('SELECT * FROM shoes WHERE brand = $1', brandName);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by brand:', error);
    res.status(500).send('Internal Server Error');
  }
});



// list all shoes for chosen size
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

// list all shoes for chosen brand and size
app.get('/api/shoes/brand/:brandname/size/:size',async function (req,res){
  try {
    const brandName = req.params.brandname;
    const shoeSize = req.params.size;

    const result = await db.any('SELECT * FROM shoes WHERE brand = $1 AND size = $2', [brandName,shoeSize]);
    return res.json(result);
  } catch (error) {
    console.error('Error fetching shoes by size:', error);
    res.status(500).send('Internal Server Error');
  }
} );

//this should update the stock when shoe is sold
app.post('/api/shoes/sold/:id');

// add a new shoe to the stock
app.post('/api/shoes')


const PORT = process.env.PORT || 3007;

app.listen(PORT, function () {
  console.log('App started at port', PORT);
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const quotesRoute = require('./routes/quotes');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const contactsRoute = require('./routes/contacts');
const accountsRoute = require('./routes/accounts');

// Routes Middlewares
app.use('/api/quotes', quotesRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/accounts', accountsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect to DB
mongoose
  .connect('mongodb://' + process.env.DB_CONNECTION + '/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('¡Connected to DB!'))
  .catch((err) => console.error('Something went wrong with the DB'));

// Start listening
app.listen(3000);

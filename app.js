const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', { beersFromApi, title: 'Beers' }))
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => res.render('random-beer', { responseFromAPI, title: 'Random Beer' }))
  .catch(error => console.log(error));
});

app.get('/:uid', (req, res) => {
  const uid = req.params.uid;
  const title = 'Beer ' + uid;
  punkAPI
  .getBeer(uid)
  .then(uniqueBeerFromAPI => res.render('unique-beer', { uniqueBeerFromAPI, title: title }))
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

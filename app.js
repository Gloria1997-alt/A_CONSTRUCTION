const fs = require('fs');
const path = require('path');

const express =require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index');
});


app.get('/reviews', function(req, res) {
  const filePath = path.join(__dirname, 'data', 'review.json');

  const fileData = fs.readFileSync(filePath);
  const storedReview = JSON.parse(fileData);
 
 res.render('reviews', {numberOfReviews: storedReview.length, reviews: storedReview});
});

app.get('/recommend', function(req, res) {
  res.render('recommend');
});

app.post('/recommend', function(req, res) {
  const review = req.body;
  const filePath = path.join(__dirname, 'data', 'review.json');

 const fileData = fs.readFileSync(filePath);
 const storedReview = JSON.parse(fileData);

 storedReview.push(review);

 fs.writeFileSync(filePath, JSON.stringify(storedReview));

 res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
  res.render('confirm');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/gallery', function(req, res) {
  res.render('gallery');
});

app.get('/services', function(req, res) {
  res.render('services');
});


app.listen(3000);
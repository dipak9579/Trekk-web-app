const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const SignUp = require('./src/models/signUp');
const Booking=require('./src/models/booking');
const db = require('./db/conn');
const authRoutes = require('./routes/auth');
const { authenticate } = require('./middleware/auth');
const app = express();
const hbs = require('hbs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const static_path = path.join(__dirname, './public');
const template_path = path.join(__dirname, './templates/views');
const partial_path = path.join(__dirname, './templates/partials');

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partial_path);

// Route handlers
app.use('/auth', authRoutes);


// Root URL route
app.get('/',(req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/kedarnath',(req,res)=>{
  res.render('kedarnath')
})

app.get('/book',authenticate,(req,res)=>{
  res.render('booking')
})


app.get('/summer',(req,res)=>{
  res.render('summer')
})





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

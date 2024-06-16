const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();

const SignUp = require('./src/models/signUp');
const Booking=require('./src/models/booking');

const LocationPoint=require('./src/models/location');
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
app.use('/trip',require('./routes/trip'))


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

app.post('/update-location', authenticate, (req, res) => {
  const { latitude, longitude } = req.body;
  const userEmail = req.user.email; // Assuming the authenticated user's email is stored in req.user.email

  console.log(`Received location: Latitude = ${latitude}, Longitude = ${longitude}`);
  
  // Find a booking with the user's email
  Booking.findOne({ email: userEmail })
    .then(booking => {
      if (booking) {
        // Booking found, save the location
        const newLocation = new LocationPoint({ latitude, longitude, email: userEmail });
        return newLocation.save();
      } else {
        // No booking found for this email
        res.status(404).send('No booking found for this email');
        throw new Error('No booking found');
      }
    })
    .then(() => {
      console.log('Location saved to database');
      res.sendStatus(200);
    })
    .catch(err => {
      if (err.message !== 'No booking found') {
        console.error('Error saving location:', err);
        res.status(500).send('Error saving location');
      }
    });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});

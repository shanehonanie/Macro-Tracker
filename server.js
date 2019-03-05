const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const foods = require('./routes/api/foods');
const goals = require('./routes/api/goals');

const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

// Connect MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/foods', foods);
app.use('/api/goals', goals);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));

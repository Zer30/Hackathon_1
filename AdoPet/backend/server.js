const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));
    console.log('Mongo URI:', process.env.MONGO_URI);

app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        routes: {
            pets: '/api/pets',
            users: '/api/users'
        }
    });
});

app.get('/api/pets', (req, res) => {
    res.json([
        { id: 1, name: 'Buddy', type: 'dog' },
        { id: 2, name: 'Mittens', type: 'cat' }
    ]);
});

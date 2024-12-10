const express = require('express');
const jwt = require('jsonwebtoken');
const Pet = require('../models/Pet');
const router = express.Router();

const secret = 'supersecretkey';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(400).json({ error: 'Invalid token' });
    }
};

router.post('/add', authenticate, async (req, res) => {
    const { name, type } = req.body;
    try {
        const pet = new Pet({ name, type, userId: req.userId });
        await pet.save();
        res.status(201).json({ message: 'Pet added successfully' });
    } catch {
        res.status(400).json({ error: 'Error adding pet' });
    }
});

router.get('/list', authenticate, async (req, res) => {
    try {
        const pets = await Pet.find({ userId: req.userId });
        res.json(pets);
    } catch {
        res.status(400).json({ error: 'Error fetching pets' });
    }
});

router.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        await Pet.deleteOne({ _id: req.params.id, userId: req.userId });
        res.json({ message: 'Pet deleted successfully' });
    } catch {
        res.status(400).json({ error: 'Error deleting pet' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
const { name, email, age } = req.body;
try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.get('/', async (req, res) => {
try {
    const users = await User.find();
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.get('/:id', async (req, res) => {
try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

router.put('/:id', async (req, res) => {
try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(updatedUser);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});


router.delete('/:id', async (req, res) => {
try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

module.exports = router;
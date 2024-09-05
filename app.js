require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.log('Error conectando a MongoDB:', error));

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
console.log(`Servidor corriendo en el puerto ${PORT}`);
});
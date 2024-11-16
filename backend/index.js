const express = require("express")
const cors = require("cors")
const { authMiddleware } = require('./middlewares/authMiddleware');
const homeRoute = require('./routes/homeRoute');
const authRoutes = require('./routes/authRoute');
const eventoRoutes = require('./routes/eventoRoute');
require('dotenv').config()
const PORT = process.env.PORT;
const VERSION = process.env.VERSION;

const app = express()

app.use(cors);
app.use(express.json())

if (firebaseApp.status !== 200) {
  console.error(firebaseApp.message);
  process.exit(1);
}else{
  console.log(firebaseApp.message);
}

app.use('/api/home', homeRoute);
app.use('/api/auth', authRoutes);
app.use('/api/event', authMiddleware, eventoRoutes);

//Rutas no existentes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso no existente' });
});

app.listen(PORT, () => {
  console.log(`-----\n meetusBackend v${VERSION}\n Running on port ${PORT} \n-----`);
  console.log(`[${new Date().toISOString()}] --- SERVER STARTED`);
});


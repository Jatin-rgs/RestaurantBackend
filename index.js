const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const authRouter = require('./Routes/AuthRouter');
const menuRouter = require('./Routes/MenuRouter');
const reservationRouter = require('./Routes/ReservationRouter');
require('./Models/db'); // This should establish your DB connection
const executiveRoutes = require("./Routes/ExecutiveRoute");
const staffRoutes = require("./Routes/Staff")
const tableRoutes = require("./Routes/TableRoutes");
const areaRoutes = require("./Routes/AreasRouter");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// API Routes
app.use('/auth', authRouter);
app.use('/menus', menuRouter);
app.use('/api/reservations', reservationRouter);
app.use("/api/executives", executiveRoutes);
app.use("/api/staff",staffRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/areas", areaRoutes);
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

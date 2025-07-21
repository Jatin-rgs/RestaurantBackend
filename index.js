const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Routers
const authRouter = require('./Routes/AuthRouter');
const menuRouter = require('./Routes/MenuRouter');
const reservationRouter = require('./Routes/ReservationRouter');
const executiveRoutes = require("./Routes/ExecutiveRoute");
const staffRoutes = require("./Routes/Staff");
const tableRoutes = require("./Routes/TableRoutes");
const areaRoutes = require("./Routes/AreasRouter");
const menuItemRouter = require('./Routes/MenuItemRouter'); // ✅
const customerRoutes = require("./Routes/CustomerRoutes");
const itemCategoryRouter = require('./Routes/ItemCategoryRouter');
const modifierGroupRouter = require("./Routes/ModifierGroupRouter");
const itemModifierRouter = require("./Routes/ItemModifiers");
const waiterRoutes = require("./Routes/WaiterRequests");

require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/auth', authRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/executives', executiveRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/menus', menuRouter);
app.use('/api/customers', customerRoutes);
app.use('/api/menu-items', menuItemRouter); // ✅ Only one time
app.use('/api/item-categories', itemCategoryRouter);
app.use("/api/modifier-groups", modifierGroupRouter);
app.use("/api/item-modifiers", itemModifierRouter);
app.use("/api/waiter-requests", waiterRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRouter = require('./Routes/AuthRouter');
require('./Models/db');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());


app.get('/ping', (req, res) => {
  res.send('pong');
});


app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

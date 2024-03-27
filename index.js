const express = require('express');
const cors = require('cors');
const app = express();  
const bodyParser = require('body-parser');
const sequelize = require('./src/utils/db');
const api = require('./src/routes/api');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());

app.use('/api', api);

const PORT = 4000;

app.listen(PORT, function() {
  console.log('Servidor web iniciado na porta:', PORT);
});
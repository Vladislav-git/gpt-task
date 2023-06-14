const express = require('express');
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const cron = require('./cron/index')
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(routes)

// cron.initScheduledJobs();

// start the server
app.listen(3000, () => console.log('Server listening on port 3000.'));
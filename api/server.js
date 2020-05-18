const express = require('express');
const app = express();
const { router: projectRouter } = require('../routes/projectRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('api/projects', projectRouter);

module.exports = { app };

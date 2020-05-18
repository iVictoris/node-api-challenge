const express = require('express');
const app = express();
const { router: projectRouter } = require('../routes/projectRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'ok' });
});
app.use('/api/projects', projectRouter);

module.exports = { app };

const { findById } = require('../data/helpers/projectModel');

const validateBodyForProject = (req, res, next) => {
    // check for name description and completed
    const { name, description, completed } = req.body;
    if (!name || !description) {
        return res.status(400).json({
            message: 'Missing required fields, name or description',
        });
    }

    req.project = req.body;
    next();
};

const validateProjectID = async (req, res, next) => {
    const { id } = req.params;
    const project = await findById(id);

    if (!project) {
        return res.status(404).json({
            message: 'Project not found. Please try again',
        });
    }

    req.project = project;
    next();
};

module.exports = {
    validateBodyForProject,
    validateProjectID,
};

const { findById } = require('../data/helpers/actionModel');
const { findById: findProjectById } = require('../data/helpers/projectModel');

const validateBodyForAction = async (req, res, next) => {
    // check for name description and completed
    const { description, notes, project_id } = req.body;

    // see if project_id is valid
    const project = await findProjectById(project_id);

    if (!notes || !description || !project) {
        return res.status(400).json({
            message:
                'Missing required fields, notes or description or project_id, or project_id is invalid',
        });
    }

    req.action = req.body;
    next();
};

const validateActionID = async (req, res, next) => {
    const { id } = req.params;
    const action = await findById(id);

    if (!action) {
        return res.status(404).json({
            message: 'Project not found. Please try again',
        });
    }

    req.action = action;
    next();
};

module.exports = {
    validateBodyForAction,
    validateActionID,
};

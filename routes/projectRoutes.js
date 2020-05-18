const { Router } = require('express');
const router = Router();

const {
    validateBodyForProject,
    validateProjectID,
} = require('../middleware/project');

const {
    get,
    insert,
    update,
    remove,
    getProjectActions,
} = require('../data/helpers/projectModel');

// base route
router
    .route('/')
    .get(async (req, res) => {
        try {
            const projects = await get();
            res.status(200).json({
                projects,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    })
    .post(validateBodyForProject, async ({ project }, res) => {
        try {
            const newProject = await insert(project);
            res.status(201).json({
                project: newProject,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    });

// base route/:id params for read/update/delete
router
    .use(validateProjectID)
    .route('/:id')
    .get(({ project }, res) => {
        res.status(200).json({ project });
    })
    .put(async ({ project }, res) => {
        try {
            const { id, changes } = project;
            const updated = await update(id, changes);
            res.status(200).json({
                project: updated,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    })
    .delete(async ({ project }, res) => {
        try {
            await remove(project.id);
            res.status(200).json({ message: 'Deleted', project });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    });

module.exports.router = router;

const { Router } = require('express');
const router = Router();

const {
    validateBodyForAction,
    validateActionID,
} = require('../middleware/action');

const { get, insert, update, remove } = require('../data/helpers/actionModel');

// base route
router
    .route('/')
    .get(async (req, res) => {
        try {
            const actions = await get();
            res.status(200).json({
                actions,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    })
    .post(validateBodyForAction, async ({ action }, res) => {
        try {
            const newAction = await insert(action);
            res.status(201).json({
                action: newAction,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    });

router.all('/:id', validateActionID);
// base route/:id params for read/update/delete
router
    .route('/:id')
    .get(({ action }, res) => {
        res.status(200).json({ action });
    })
    .put(async ({ body: changes, params: { id } }, res) => {
        try {
            const { description, notes } = changes;
            if (!description || !notes) {
                return res.status(400).json({
                    message:
                        "You didn't supply the necessary details to change this action",
                });
            }
            const updated = await update(id, changes);
            res.status(200).json({
                action: updated,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    })
    .delete(async ({ action }, res) => {
        try {
            await remove(action.id);
            res.status(200).json({ message: 'Deleted', action });
        } catch (e) {
            res.status(500).json({
                message: 'Internal server error. Please try again',
            });
        }
    });

module.exports.router = router;

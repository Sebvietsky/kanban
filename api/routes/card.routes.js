import express from "express";
import { getAll, getById, create, update, deleteById } from '../controllers/card.controller.js';
import { validateCardCreation, validateCardUpdate } from '../middlewares/card.middleware.js';
import { validateId } from '../middlewares/common.middleware.js';
import { isAllowed, isAllowedToPatch } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:id', validateId, getById);
router.post('/', isAllowed("admin"), validateCardCreation, create);
router.patch('/:id', isAllowed("user"), validateId, validateCardUpdate, isAllowedToPatch, update);
router.delete('/:id', isAllowed("admin"), validateId, deleteById);

export default router;

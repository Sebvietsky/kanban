import express from "express";
import { isAllowed } from "../middlewares/auth.middleware.js";
import { prompt } from "../controllers/mistral.controller.js";
import { validatePrompt } from "../middlewares/mistral.middleware.js";
const router = express.Router();

router.post('/spellcheck', isAllowed('admin'), prompt(false))
router.post('/prompt', validatePrompt, prompt(true));

export default router;
import Joi from "joi";
import { checkBody } from "../utils/common.util.js";
import 'dotenv/config';

export function validatePrompt(req, res, next) {
    const createUserSchema = Joi.object({
        prompt: Joi.string().required()
    });
    checkBody(createUserSchema, req.body, res, next);
}

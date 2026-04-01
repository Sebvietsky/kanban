import Joi from "joi";
import { checkBody } from "../utils/common.util.js";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../models/index.js'

export function validateUserCreation(req, res, next) {
    const createUserSchema = Joi.object({
        username: Joi.string().required().min(3).max(30),
        password: Joi.string().max(30).required()
    });
    checkBody(createUserSchema, req.body, res, next);
}

export function validateUserLogin(req, res, next) {
    const userLoginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    checkBody(userLoginSchema, req.body, res, next);
}

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: 'Token manquant ou invalide' })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: 'Token invalide' })
    }
}



export function isAllowed(requiredRole) {
    return async (req, res, next) => {
        const user = await User.findByPk(req.user.user_id, {
            include: 'role'
        })

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" })
        };

        if (user.role.name === "admin") {
            req.role = user.role.name
            return next()
        };

        if (user.role.name !== requiredRole) {
            return res.status(StatusCodes.FORBIDDEN).json({ error: "Access denied" })
        };
        req.role = user.role.name
        next();
    };
};

export async function isAllowedToPatch(req, res, next) {
    const { role } = req;
    const { position, list_id } = req.body

    role === "user" ? req.body = { position, list_id } : req.body
    
    return next()
    }
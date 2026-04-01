import { User, Role } from '../models/index.js';
import { StatusCodes } from 'http-status-codes';
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export async function registerUser(req, res, next) {
    const hashPassword = await argon2.hash(req.body.password);

    try {
        const userRole = await Role.findOne({
            where: {
                name: "user"
            }
        });
        const user = await User.create({ username: req.body.username, password: hashPassword, role_id: userRole.id });
        const { password, ...userWithoutPassword } = user.toJSON();
        return res.status(StatusCodes.CREATED).json(userWithoutPassword);
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(StatusCodes.CONFLICT).json({
                error: "Pseudo déjà existant"
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erreur serveur" })
    }
}

export async function loginUser(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (!user || !await argon2.verify(user.password, req.body.password)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ erreur: 'Pseudo ou mdp incorrect' })
    }

    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    })
    res.status(StatusCodes.OK).json({ token })
}

export async function userInformation(req, res) {
    const user = await User.findByPk(req.user.user_id, {
        attributes: ["id", "username"],
        include: {
            model: Role, as: "role", attributes: ["name"]
        }
    })

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ erreur: 'Aucun utilisateur trouvé' })
    }
    res.status(StatusCodes.OK).json(user)
}


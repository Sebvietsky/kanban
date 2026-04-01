import express from "express";
import { registerUser, loginUser, userInformation } from '../controllers/auth.controller.js'
import { isAllowed, validateUserCreation, validateUserLogin} from "../middlewares/auth.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register', validateUserCreation, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.get('/me', authenticate, userInformation);

export default router;
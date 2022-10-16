import express from 'express'
import { Login, Logout, AboutMe } from "../controllers/Auth.js";

const AuthRouter = express.Router()

AuthRouter.get('/aboutme', AboutMe)
AuthRouter.post('/login', Login)
AuthRouter.delete('/logout', Logout)

export default AuthRouter
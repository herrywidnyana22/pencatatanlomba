import express from 'express'
import { getUser, getUserById, createUser, updateUser, deleteUser } from '../controllers/UserController.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const UserRouter = express.Router()

UserRouter.get('/users', verifyUser, adminOnly, getUser)
UserRouter.get('/users/:id', verifyUser, getUserById)
UserRouter.post('/users', verifyUser, adminOnly, createUser)
// UserRouter.post('/users', createUser)
UserRouter.patch('/users/:id', verifyUser, updateUser)
UserRouter.delete('/users/:id', verifyUser, adminOnly, deleteUser)

export default UserRouter  
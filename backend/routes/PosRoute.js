import express from 'express'
import { getPosByUser, getPosByIdKategori, getNamaPos, createPos, updatePos, deletePos } from '../controllers/PosController.js'
import { verifyUser } from '../middleware/AuthUser.js'

const PosRouter = express.Router()

PosRouter.get('/pos', verifyUser, getPosByUser)
PosRouter.get('/pos/:idkat', verifyUser, getPosByIdKategori)
PosRouter.get('/namapos/:idkat', verifyUser, getNamaPos)
PosRouter.post('/pos', verifyUser, createPos)
PosRouter.patch('/pos/:id', verifyUser, updatePos)
PosRouter.delete('/pos/:id', verifyUser, deletePos)

export default PosRouter
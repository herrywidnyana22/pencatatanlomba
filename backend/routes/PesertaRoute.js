import express from 'express'
import { getPeserta, getPesertaByIdPos, getPesertaByIdKategori, createPeserta_inPos, updatePeserta, deletePeserta } from '../controllers/PesertaController.js'
import { verifyUser, adminOnly } from '../middleware/AuthUser.js'

const PesertaRouter = express.Router()

PesertaRouter.get('/peserta', verifyUser, adminOnly, getPeserta)
PesertaRouter.get('/peserta/pos/:idpos', verifyUser, getPesertaByIdPos)
PesertaRouter.get('/peserta/kat/:idkat', verifyUser, getPesertaByIdKategori)
PesertaRouter.post('/peserta', verifyUser, createPeserta_inPos)
PesertaRouter.patch('/peserta/:id', verifyUser, updatePeserta)
PesertaRouter.delete('/peserta/:id', verifyUser, deletePeserta)

export default PesertaRouter
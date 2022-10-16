import express from 'express'
import { getKategori, getKategoriByUser, createKategori, updateKategori, deleteKategori } from '../controllers/KategoriController.js'
import { verifyUser } from '../middleware/AuthUser.js'

const KategoriRouter = express.Router()

KategoriRouter.get('/kategori', verifyUser, getKategori)
KategoriRouter.get('/kategori/:iduser', verifyUser, getKategoriByUser)
KategoriRouter.post('/kategori', verifyUser, createKategori)
KategoriRouter.patch('/kategori/:id', verifyUser, updateKategori)
KategoriRouter.delete('/kategori/:id', verifyUser, deleteKategori)

export default KategoriRouter
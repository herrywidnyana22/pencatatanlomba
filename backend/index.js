import express from 'express'
import cors from 'cors'

import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
import dotenv from 'dotenv'
import db from './config/Db.js'
import { UserRouter, KategoriRouter, PesertaRouter, PosRouter, AuthRouter } from './routes/index.js'


dotenv.config()

const app = express();

// (async () => {
//     await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

// connect to frontend
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use(UserRouter)
app.use(KategoriRouter)
app.use(PesertaRouter)
app.use(PosRouter)
app.use(AuthRouter)

// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running..')
})
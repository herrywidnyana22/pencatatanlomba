import { Sequelize } from "sequelize"

const db = new Sequelize('db_lomba', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db
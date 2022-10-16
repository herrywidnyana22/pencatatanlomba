import { Sequelize } from "sequelize";
import db from "../config/Db.js";

import KategoriModel from "./KategoriModel.js";
import UserModel from "./UserModel.js";
// import PesertaModel from "./PesertaModel.js";

const { DataTypes } = Sequelize

const PosModel = db.define('tb_pos', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama_pos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 10]
        }
    },
    id_kategori: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    id_peserta: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    }
}, {
    freezeTableName: true
})

KategoriModel.hasMany(PosModel)
PosModel.belongsTo(KategoriModel, {foreignKey: 'id_kategori'})

UserModel.hasMany(PosModel)
PosModel.belongsTo(UserModel, {foreignKey: 'id_user'})

export default PosModel
import { Sequelize } from "sequelize";
import db from "../config/Db.js";

import KategoriModel from "./KategoriModel.js";
import PosModel from "./PosModel.js";


const { DataTypes } = Sequelize

const PesertaModel = db.define('tb_peserta', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    no_peserta: {
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
    id_pos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

KategoriModel.hasMany(PesertaModel)
PesertaModel.belongsTo(KategoriModel, {foreignKey: 'id_kategori'})

PosModel.hasMany(PesertaModel)
PesertaModel.hasMany(PosModel)

PesertaModel.belongsTo(PosModel, {foreignKey: 'id_pos'})
PosModel.belongsTo(PesertaModel, {foreignKey: 'id_peserta'})

export default PesertaModel
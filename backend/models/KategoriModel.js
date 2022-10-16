import { Sequelize } from "sequelize";
import db from "../config/Db.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize

const KategoriModel = db.define('tb_kategori', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama_kategori: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 1000]
        }
    },
    jumlah_pos: {
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
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

UserModel.hasMany(KategoriModel)
KategoriModel.belongsTo(UserModel, {foreignKey: 'id_user'})

export default KategoriModel
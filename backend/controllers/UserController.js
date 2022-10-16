import UserModel from "../models/UserModel.js"
import argon2 from 'argon2'
import { Op } from "sequelize";

export const getUser = async(req, res) =>{
    try {
        const Q_UserAll = await UserModel.findAll({
            attributes: ['uuid', 'name', 'username', 'jk', 'role']
        })
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "data ditemukan",
            data: Q_UserAll
        })

    } catch (error) {
        ({
            code: "500",
            status: "Internal Server Error",
            msg: "Server Error",
        })
    }
    
}

export const getUserById = async(req, res) =>{
    try {
        const Q_UserID = await UserModel.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'name', 'username', 'jk', 'role']
        })
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "data ditemukan",
            data: Q_UserID
        })

    } catch (error) {
        res.status(500).json({
            code: "500",
            status: "Internal Server Error",
            msg:"Server Error"
        })
    }
}

export const createUser = async(req, res) =>{
    const {name, username, email, password, confPassword, role, jk} = req.body
    

    const Q_CekUser = await UserModel.findOne({
        where:{
            [Op.or]: [{username: username}, {email: email}]
        }
    })

    if(Q_CekUser) return res.status(409).json({
        code: "409",
        status: "Conflict",
        msg: "Username atau Email sudah ada"
    })

    if(password !== confPassword ) return res.status(400).json({
        code: "400",
        status: "Bad Request",
        msg: "Password dan Confirm Password tidak sama"
    })
    
    const hashPassword = await argon2.hash(password)
    try {
        await UserModel.create({
            name: name,
            username: username,
            email: email,
            password: hashPassword,
            jk: jk,
            role: role
        })
        res.status(201).json({
            code: "201",
            status: "Created",
            msg: "Register Berhasil"
        })
    } catch (error) {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            msg: error.message
        })
    }

}


export const updateUser = async(req, res) =>{
    const Q_UpdateUser = await UserModel.findOne({
        where:{
            uuid: req.params.id
        }
    })

    if(!Q_UpdateUser) return res.status(404).json({
        code: "404",
        status: "Not Found",
        msg: "User tidak ditemukan"
    })
    
    const {name, username, email, password, confPassword, role, jk} = req.body
    
    let hashPassword
    if(password === "" || password === null){
        hashPassword = Q_UpdateUser.password
    }else{
        hashPassword = await argon2.hash(password)
    }

    if(password !== confPassword ) return res.status(400).json({
        code: "400",
        status: "Bad Request",
        msg: "Password dan Confirm Password tidak sama"
    })

    try {
        await UserModel.update({
            name: name,
            username: username,
            email: email,
            password: hashPassword,
            jk: jk,
            role: role

        },{
            where:{
                id: Q_UpdateUser.id
            }
        })
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "Data anda berhasil diubah"
        })
    } catch (error) {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            msg: error.message
        })
    }
}

export const deleteUser = async(req, res) =>{
    const Q_DeleteUser = await UserModel.findOne({
        where:{
            uuid: req.params.id
        }
    })

    if(!Q_DeleteUser) return res.status(404).json({
        code: "404",
        status: "Not Found",
        msg: "User tidak ditemukan"
    })
    
    try {
        await UserModel.destroy({
            where:{
                id: Q_DeleteUser.id
            }
        })
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "Data berhasil dihapus"
        })
    } catch (error) {
        res.status(400).json({
            code: "400",
            status: "Bad Request",
            msg:error.message
        })
    }
}
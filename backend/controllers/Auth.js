import UserModel from "../models/UserModel.js";
import argon2 from 'argon2'

export const Login = async(req, res) => {
    const Q_User = await UserModel.findOne({
        where:{
            username : req.body.username
        }
    })

    if(!Q_User) return res.status(404).json({msg: "User tidak ditemukan"})
    const match = await argon2.verify(Q_User.password, req.body.password)
    if(!match) return res.status(400).json({msg: "Wrong Password"})
    req.session.id_user = Q_User.uuid
    const uuid = Q_User.uuid
    const name = Q_User.name
    const username = Q_User.username
    const email = Q_User.email
    const role = Q_User.role
    res.status(200).json({uuid, name, email, username, role})

    console.log(match)
}

export const AboutMe = async(req, res) =>{
    if(!req.session.id_user){
        return res.status(401).json({msg: "Mohon login ke akun anda"})
    }

    const Q_User = await UserModel.findOne({
        attributes: ['uuid', 'name', 'username', 'jk', 'role'],
        where: {
            uuid: req.session.id_user
        }
    })

    if(!Q_User) return res.status(404).json({msg: "User tidak ditemukan"})
    res.status(200).json(Q_User)
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg:"Tidak dapat logout"})
        res.status(200).json({msg: "Anda telah logout"})
    })
}
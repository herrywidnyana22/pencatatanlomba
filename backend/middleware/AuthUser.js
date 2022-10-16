import KategoriModel from "../models/KategoriModel.js";
import UserModel from "../models/UserModel.js";

export const verifyUser = async(req, res, next) =>{
    if(!req.session.id_user){
        return res.status(401).json({
            code: "401",
            status: "Unauthorized",
            errors: [
                "Mohon Login terlebih dahulu"
            ]
        })
    }

    const Q_User = await UserModel.findOne({
        where: {
            uuid: req.session.id_user
        }
    })

    if(!Q_User) return res.status(404).json({
        code: "404",
        status: "Not_Found",
        errors: [
            "User tidak ditemukan"
        ]
    })

    req.id_user = Q_User.id
    req.role = Q_User.role
   
    next()
}

export const adminOnly = async(req, res, next) =>{

    const Q_User = await UserModel.findOne({
        where: {
            uuid: req.session.id_user
        }
    })

    if(!Q_User) return res.status(404).json.json({
        code: "404",
        status: "Not_Found",
        errors: [
            "User tidak ditemukan"
        ]
    })
    
    if(Q_User.role !== 'admin') return res.status(403).json({
        code: "403",
        status: "Bad_Request",
        errors: [
            "Akses tidak diijinkan"
        ]
    })
    
    next()
}
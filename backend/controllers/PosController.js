import PosModel from "../models/PosModel.js"
import KategoriModel from "../models/KategoriModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getPosByUser = async(req, res) =>{
    try {
        let Q_AllPos
        if(req.role === 'admin'){
            Q_AllPos = await PosModel.findAll({
                attributes:['uuid', 'nama_pos'],
                include:[{
                    model: UserModel,
                    attributes:['name', 'username']
                }]
            })
        }else if(req.role === 'panitia'){
            Q_AllPos = await PosModel.findAll({
                attributes:['uuid', 'nama_pos'],
                where:{
                    id_user: req.id_user
                },
                include:[{
                    model: UserModel,
                    attributes:['name', 'username']
                },{
                    model: KategoriModel,
                    attributes:['nama_kategori']
                }]
            })            
            
        }else{
            return res.status(403).json({msg: "Akses tidak diijinkan"})
        }
        
        if(Q_AllPos == "" || Q_AllPos == null) return res.status(404).json({
            code: "404",
            status: "Not Found",
            msg: "Pos Belum ada"
        })
        // if(Q_AllPos == "" || Q_AllPos == null) return res.status(200).json({
        //     code: "404",
        //     status: "Not Found",
        //     msg: "Pos Belum ada"
        // })
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "Pos Ditemukan",
            data: Q_AllPos
        })

    } catch (error) {
        res.status(500).json({
            code: '500',
            status: 'Internal Server Error',
            msg: error.message
        })
    } 
}

export const getPosByIdKategori = async(req, res) =>{
    try {
        const Q_Pos = await PosModel.findAll({
            attributes:['uuid', 'nama_pos', 'id'],
            where:{
                id_kategori: req.params.idkat
            }
        })
        
        if(!Q_Pos) return res.status(404).json({
            code: '404',
            status: 'Not_Found',
            errors: [
                "Pos tidak ditemukan"
            ]
        })

        res.status(200).json({
            code: '200',
            status: 'ok',
            msg: "Pos berdasarkan kategori ditemukan",
            data: Q_Pos
        })

    } catch (error) {
        res.status(500).json({
            code: "500",
            status: "Internal Server Error",
            msg: "Server Error"
        })
    }
}

export const getNamaPos = async(req, res) =>{
    try {

        let Q_Pos
        if(req.role === 'admin')
        {
            Q_Pos = await PosModel.findAll({
                attributes:['uuid', 'nama_pos', 'id'],
                where:{
                    id_kategori: req.params.idkat
                }
            })
        } else {
            Q_Pos = await PosModel.findAll({
                attributes:['uuid', 'nama_pos', 'id'],
                where:{
                    [Op.and]: [{id_kategori: req.params.idkat}, {id_user: req.id_user}]
                }
            })
        }
        
        if(!Q_Pos) return res.status(404).json({
            code: '404',
            status: 'Not_Found',
            msg: "Pos tidak ditemukan"
        })

        res.status(200).json({
            code: '200',
            status: 'ok',
            msg: "pos ditemukan",
            data: Q_Pos
        })

    } catch (error) {
        res.status(500).json({
            code: "500",
            status: "Internal Server Error",
            msg: "Server Error"
        })
    }
}



export const createPos = async(req, res) =>{
    if(req.role === 'admin'){
        const {namaPos, idKategori, idUser} = req.body

        const Q_CekPos = await PosModel.findOne({
            where:{
                [Op.and]: [{id:idKategori}, {nama_pos: namaPos}]
            }
        })

        if(Q_CekPos) return res.status(409).json({
            code: '409',
            status: 'Conflict',
            msg: "Pos sudah ada"
        })

        console.log(Q_CekPos)

        try {
            await PosModel.create({
                nama_pos: namaPos,
                id_kategori: idKategori,
                id_user: idUser
            })
            res.status(201).json({
                code: '201',
                status: 'Created',
                msg: "Pos berhasil ditambahkan"
            })
        } catch (error) {
            res.status(500).json({
                code: '500',
                status: 'Internal Server Error',
                msg: error.message
            })
        }
    } else {
        return res.status(403).json({
            code: '403',
            status: 'Forbidden',
            msg: "Akses tidak diijinkan"
        })
    }
}

export const updatePos = async(req, res) =>{
    try {
        const Q_CekPos = await PosModel.findOne({
            where:{
                uuid: req.params.id
            }
        })

        if(!Q_CekPos) return res.status(404).json({
            code: '404',
            status: 'Not Found',
            msg: "Pos tidak ditemukan"
        })
        
        if(req.role === 'admin'){
            const {namaPos, idKategori, idUser} = req.body

            try {
                await PosModel.update({
                    nama_pos: namaPos,
                    id_kategori: idKategori,
                    id_user: idUser
                }, {
                    where: {
                        id: Q_CekPos.id
                    }
                })
                res.status(201).json({
                    code: '201',
                    status: 'Created',
                    msg: "Pos berhasil diubah"
                })
            } catch (error) {
                res.status(500).json({
                    code: '500',
                    status: 'Internal Server Error',
                    msg: error.message
                })
            }
        } else {
            return res.status(403).json({
                code: '403',
                status: 'Forbidden',
                msg: "Akses tidak diijinkan"
            })
        }

    } catch (error) {
        return res.status(403).json({
            code: '403',
            status: 'Forbidden',
            msg: "Akses tidak diijinkan"
        })
    }
}
export const deletePos = async(req, res) =>{
    try {
        const Q_CekPos = await PosModel.findOne({
            where:{
                uuid: req.params.id
            }
        })  

        if (!Q_CekPos) return res.status(404).json({
            code: '404',
            status: 'Not Found',
            msg: "Pos tidak ditemukan"
        })

        if(req.role === 'admin'){
            await PosModel.destroy({
                where:{
                    id: Q_CekPos.id
                }
            })

        } else {
            return res.status(403).json({
                code: '403',
                status: 'Forbidden',
                msg: "Akses tidak diijinkan"
            })
        }
        res.status(200).json({
            code: "200",
            status: "ok",
            msg: "Pos berhasil dihapus"
        })

    } catch (error) {
        res.status(500).json({
            code: '500',
            status: 'Internal Server Error',
            msg: error.message
        })
    }
}
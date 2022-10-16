import KategoriModel from "../models/KategoriModel.js";
import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

export const getKategori = async(req, res) =>{
    try {
        let Q_AllKategori
        if(req.role === 'admin'){
            Q_AllKategori = await KategoriModel.findAll({
                attributes:['uuid', 'id', 'nama_kategori', 'jumlah_pos'],
                include:[{
                    model: UserModel,
                    attributes:['name', 'username']
                }]
            })
        }else if(req.role === 'panitia'){
            Q_AllKategori = await KategoriModel.findAll({
                attributes:['uuid', 'id', 'nama_kategori', 'jumlah_pos'],
                where:{
                    id_user: req.id_user
                },
                include:[{
                    model: UserModel,
                    attributes:['name', 'username']
                }]
            })

            if(Q_AllKategori === "" || Q_AllKategori === null) res.status(404).json({msg: "Kategori tidak ditemukan"})
            
        }else{
            return res.status(403).json({msg: "Akses tidak diijinkan"})
         }
        res.status(200).json(Q_AllKategori)

    } catch (error) {
        res.status(500).json({msg: error.message})
    } 
}

//HOLD
export const getKategoriByUser = async(req, res) =>{
    // try {
    //     const Q_KategoriOne = await KategoriModel.findOne({
    //         where:{
    //             uuid: req.params.iduser
    //         }
    //     })  

    //     if (!Q_KategoriOne) return res.status(404).json({msg: "Kategori tidak ditemukan"})

    //     let Q_KategoriOneCheck
    //     if(req.role === 'admin'){
    //         Q_KategoriOneCheck = await KategoriModel.findOne({
    //             attributes:['uuid', 'nama_kategori', 'jumlah_pos'],
    //             where:{
    //                 id: Q_KategoriOne.id
    //             },
    //             include:[{
    //                 model: UserModel,
    //                 attributes:['name', 'username']
    //             }]
    //         })
    //     }else if(req.role === 'panitia'){
    //         Q_KategoriOneCheck = await KategoriModel.findOne({
    //             attributes:['uuid', 'nama_kategori', 'jumlah_pos'],
    //             where:{
    //                 [Op.and]: [{id:Q_KategoriOne.id}, {id_user: req.id_user}]
    //             },
    //             include:[{
    //                 model: UserModel,
    //                 attributes:['name', 'username']
    //             }]
    //         })
    //     }else{
    //         return res.status(403).json({msg: "Akses tidak diijinkan"})
    //      }
    //     res.status(200).json(Q_KategoriOneCheck)

    // } catch (error) {
    //     res.status(500).json({msg: error.message})
    // }
}

export const createKategori = async(req, res) =>{
    if(req.role === 'admin'){
        const {namaKategori} = req.body

        const Q_CekKategori = await KategoriModel.findOne({
            where:{
                nama_kategori: namaKategori
            }
        })

        if(!Q_CekKategori) return res.status(409).json({msg: "Kategori sudah ada"})

        try {
            await KategoriModel.create({
                nama_kategori: namaKategori,
                jumlah_pos: jumlahPos,
                id_user: req.id_user
            })
            res.status(201).json({msg: "Kategori berhasil ditambahkan"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    } else {
        return res.status(403).json({msg: "Akses tidak diijinkan"})
    }
}

export const updateKategori = async(req, res) =>{
    try {
        const Q_KategoriOne = await KategoriModel.findOne({
            where:{
                uuid: req.params.id
            }
        })  

        if (!Q_KategoriOne) return res.status(404).json({msg: "Kategori tidak ditemukan"})

        const {namaKategori, jumlahPos} = req.body
        if(req.role === 'admin'){
            await KategoriModel.update({
                nama_kategori: namaKategori, 
                jumlah_pos: jumlahPos
            
            }, {
                where:{
                    id: Q_KategoriOne.id
                }
            })

        } else {
            // if(req.id_user !== Q_KategoriOne.id_user) return res.status(403).json({msg: "Akses tidak diijinkan"})
            // await KategoriModel.update({
            //     nama_kategori: namaKategori, 
            //     jumlah_pos: jumlahPos
            
            // }, {
            //     where:{
            //         [Op.and]: [{id:Q_KategoriOne.id}, {id_user: req.id_user}]
            //     }
            // })
            return res.status(403).json({msg: "Akses tidak diijinkan"})
        }
        res.status(200).json({msg: "Kategori berhasil diubah"})

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}


export const deleteKategori = async(req, res) =>{
    try {
        const Q_KategoriOne = await KategoriModel.findOne({
            where:{
                uuid: req.params.id
            }
        })  

        if (!Q_KategoriOne) return res.status(404).json({msg: "Kategori tidak ditemukan"})

        if(req.role === 'admin'){
            await KategoriModel.destroy({
                where:{
                    id: Q_KategoriOne.id
                }
            })

        } else {
            // if(req.id_user !== Q_KategoriOne.id_user) return res.status(403).json({msg: "Akses tidak diijinkan"})
            // await KategoriModel.destroy({
            //     where:{
            //         [Op.and]: [{id:Q_KategoriOne.id}, {id_user: req.id_user}]
            //     }
            // })
            return res.status(403).json({msg: "Akses tidak diijinkan"})
        }
        res.status(200).json({msg: "Kategori berhasil dihapus"})

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
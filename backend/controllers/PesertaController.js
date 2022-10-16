import PesertaModel from "../models/PesertaModel.js"
import PosModel from "../models/PosModel.js"
import KategoriModel from "../models/KategoriModel.js"
import { Op } from "sequelize";
import Sequelize from "sequelize";

export const getPeserta = async(req, res) =>{
    try {
        const Q_AllPeserta = await PesertaModel.findAll({
            attributes:['uuid', 'no_peserta'],
            include:[{
                model: KategoriModel,
                attributes:['nama_kategori', 'jumlah_pos', 'id_user']
            }, {
                model: PosModel,
                attributes:['nama_pos', 'id_user']
            }]
        })

        res.status(200).json({
            code: "200",
            status: "ok",
            data: Q_AllPeserta
        })

    } catch (error) {
        
        res.status(500).json({
            code: "500",
            status: "Internal Server Error",
            errors:[
                "Internal Server Error"
            ]
        })
    } 
}
export const getPesertaByIdPos = async(req, res) =>{
    let  Q_allPesertaByPos
    if(req.role === 'admin'){
        try {
            Q_allPesertaByPos = await PesertaModel.findAll({
                where:{
                    id_pos: req.params.idpos 
                },
                attributes:['uuid', 'no_peserta'],
                include:[{
                    model: KategoriModel,
                    attributes:['nama_kategori', 'jumlah_pos', 'id_user']
                }, {
                    model: PosModel,
                    attributes:['nama_pos']
                }]
            })
        } catch (error) {
            res.status(500).json({
                code: "500",
                status: "Internal Server Error",
                errors:[
                    "Internal Server Error"
                ]
            })
        }
    } else if(req.role === 'panitia'){
        try {
            Q_allPesertaByPos = await PesertaModel.findAll({
                where:{
                    id_pos: req.params.idpos 
                },
                attributes:['uuid', 'no_peserta'],
                include:[{
                    model: KategoriModel,
                    attributes:['nama_kategori', 'jumlah_pos', 'id_user']
                }, {
                    model: PosModel,
                    attributes:['nama_pos']
                }]
            })
        } catch (error) {
            res.status(500).json({
                code: "500",
                status: "Internal Server Error",
                errors:[
                    "Internal Server Error"
                ]
            })
        }
    
    }else{
        return res.status(403).json({msg: "Akses tidak diijinkan"})
    }

    if(Q_allPesertaByPos === "" || Q_allPesertaByPos === null) res.status(404).json({msg: "No Peserta di Pos tidak ditemukan"})
    res.status(200).json({
        code: "200",
        status: "ok",
        data: Q_allPesertaByPos
    })
}
export const getPesertaByIdKategori = async(req, res) =>{
    let Q_allPesertaByKategori
    if(req.role === 'admin'){
        try {
            Q_allPesertaByKategori = await PesertaModel.findAll({
                attributes:['uuid', 'no_peserta', 'id_kategori', 'id_pos',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.col('id_pos')), 'id_pos']],
                group: ['no_peserta'],

                where:{
                    id_kategori: req.params.idkat 
                }, 
                
            })
        } catch (error) {
            res.status(500).json({
                code: "500",
                status: "Internal Server Error",
                errors:[
                    "Internal Server Error"
                ]
            })
        }
    } else if (req.role === 'panitia'){
        try {
            Q_allPesertaByKategori = await PesertaModel.findAll({
                attributes:['uuid', 'no_peserta', 'id_kategori', 'id_pos',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.col('id_pos')), 'id_pos']],
                group: ['no_peserta'],

                where:{
                    id_kategori: req.params.idkat 
                }, 
                
            })
        } catch (error) {
            res.status(500).json({
                code: "500",
                status: "Internal Server Error",
                errors:[
                    "Internal Server Error"
                ]
            })
        }
    }else {
        return res.status(403).json({msg: "Akses tidak diijinkan"})
    }

    if(Q_allPesertaByKategori === "" || Q_allPesertaByKategori === null) res.status(404).json({msg: "No Peserta di Pos tidak ditemukan"})

    res.status(200).json({
        code: "200",
        status: "ok",
        data: Q_allPesertaByKategori
    })
}
export const createPeserta_inPos = async(req, res) =>{
    // if(req.role === 'admin' || req.role === 'panitia'){
        
    //     const {noPeserta, idKategori, idPos} = req.body

    //     const Q_cekPeserta = await PesertaModel.findOne({
    //         where:{
    //             [Op.and]: [{no_peserta: noPeserta}, {id_kategori: idKategori}, {id_pos: idPos}]
    //         }
    //     })
        

    //     if(Q_cekPeserta) return res.status(409).json({msg: "No Peserta sudah ada"})

    //     try {
    //         await PesertaModel.createBulk({
    //             no_peserta: noPeserta,
    //             id_kategori: idKategori,
    //             id_pos: idPos
    //         })
    //         res.status(201).json({msg: "Peserta berhasil ditambahkan"})
    //     } catch (error) {
    //         res.status(500).json({msg: error.message})
    //     }

        

    // } else {
    //     return res.status(403).json({msg: "Akses tidak diijinkan"})
    // }

    const {kategori, pos, peserta1, peserta2, peserta3, peserta4} = req.body

        try {
            await PesertaModel.bulkCreate([
                {
                    no_peserta: peserta1,
                    id_kategori: kategori,
                    id_pos: pos
                },
                {
                    no_peserta: peserta2,
                    id_kategori: kategori,
                    id_pos: pos
                },
                {
                    no_peserta: peserta3,
                    id_kategori: kategori,
                    id_pos: pos
                },
                {
                    no_peserta: peserta4,
                    id_kategori: kategori,
                    id_pos: pos
                },
            ])
            res.status(201).json({msg: "Peserta berhasil ditambahkan"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
        console.log(kategori, pos, peserta1, peserta2, peserta3, peserta4)
}
export const updatePeserta = async(req, res) =>{

}
export const deletePeserta = async(req, res) =>{

}
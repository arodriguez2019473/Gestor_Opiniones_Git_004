import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Publicacion from './publicacion.model.js';

export const publicacionGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, publicaciones] = await Promise.all([
        Publicacion.countDocuments(query),
        Publicacion.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publicaciones
    });
}

export const agregarPublicacion = async (req, res) => {

    const {titulo, categoria, texto, role} = req.body;
    const publicacion = new Publicacion( {titulo, categoria, texto, role} );

    publicacion.role = '1'
    await publicacion.save();

    res.status(200).json({
        publicacion
    });
}

export const actualizarPublicacion  = async (req, res = response) => {
    const { id } = req.params;
    const {_id, role, ...resto} = req.body;


    await Publicacion.findByIdAndUpdate(id, resto);

    const publicacion = await Publicacion.findOne({_id: id});

    res.status(200).json({
        msg: 'publicacion Actualizado',
        publicacion
    });
}

export const eliminarPublicacion  = async (req, res) => {
    const {id} = req.params;

    const publicacion = await Publicacion.findByIdAndUpdate(id, { estado: false});
    const publicacionAutenticado = req.publicacion;

    res.status(200).json({msg:'publicacion a eliminar', publicacion, publicacionAutenticado });
}
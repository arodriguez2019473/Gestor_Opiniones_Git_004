import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Comentario from './comentario.model.js';
import Publicacion from '../publicacion/publicacion.model.js';

export const agregarComentario = async (req, res) => {

    const { postId } = req.params;
    const { coment } = req.body;
    
    try {
        const publicacion = await Publicacion.findById(postId);

        if (!publicacion) {
            return res.status(404).json({ error: "La publicación no existe" });
        }

        const comentario = new Comentario({ postId, coment });

        await comentario.save();

        res.status(200).json({
            comentario,
            texto: publicacion.texto 
        });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el comentario" });
    }
}

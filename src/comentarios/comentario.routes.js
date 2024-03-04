import { Router } from "express";
import { check } from "express-validator";

import { agregarComentario } from "./comentario.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/:postId',
    [
        check("coment", "se debe agregar comentario").not().isEmpty(),
        validarCampos,
    ],
    agregarComentario
);

export default router;

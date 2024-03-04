import { Router } from "express";
import { check } from "express-validator";

import {
    agregarPublicacion,
    actualizarPublicacion,
    eliminarPublicacion,
    publicacionGet,
} from "./publicacion.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", publicacionGet);


router.post(
    "/",
    [
        validarJWT,
        check("titulo", "El título es obligatorio").not().isEmpty(),
        check("categoria", "La categoría es obligatoria").not().isEmpty(),
        check("texto", "El texto es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    agregarPublicacion
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],
    actualizarPublicacion
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos,
    ],
    eliminarPublicacion
);

export default router;

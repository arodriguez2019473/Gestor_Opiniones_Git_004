import { Router } from "express";
import { check } from "express-validator";

import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    usuariosPut,
    usuariosDelete,
        } from "./user.controller.js";

import {
    existenteEmail,
    esRoleValido,
    existeUserById,
        } from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRol } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

    const router = Router();

    router.get("/", usuariosGet);

    router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos,
    ],
    getUsuarioById
    );

    router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
        min: 6,
        }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    usuariosPost
    );

    router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos,
    ],
    usuariosPut
    );

    router.delete(
    "/:id",
    [
        validarJWT,
        tieneRol("USER_ROLE"),
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeUserById),
        validarCampos,
    ],
    usuariosDelete
    );

    export default router;
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/jwt.js';
import { userModel } from '../models/users.js';

class UsersController {
    async login(req, res) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };

        try {
            const user = await userModel.findOne({ email: userData.email });
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: 'Email o contraseña no válida',
                });
            }

            const validPassword = bcrypt.compareSync(userData.password, user.password);
            if (!validPassword) {
                return res.status(404).json({
                    ok: false,
                    message: 'Email o contraseña no válida',
                });
            }

            const token = await generateJWT(user.id, user.isAdmin);

            const data = {
                id: user.id,
                email: user.email,
                name: user.name,
                address: user.address,
                phone: user.phone,
                image: user.image,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken: token,
            };

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: data,
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
            });
        }
    }

    async register(req, res) {
        const correo = req.body.email.toString();
        const name = correo.substring(0, correo.indexOf('@'));

        const newUser = {
            name: name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            isAdmin: false,
        };

        try {
            const user = await userModel.findOne({ email: newUser.email });
            if (user) {
                return res.status(404).json({
                    ok: false,
                    message: 'El email ya está en uso',
                });
            }

            const userData = await userModel.create(newUser);
            const token = await generateJWT(userData.id, false);

            const data = {
                name: userData.name,
                email: userData.email,
                accessToken: token,
            };

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
            });
        }
    }

    async renewToken(req, res) {
        const userId = req.decoded.userId;

        try {
            const user = await userModel.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    message: 'El usuario no exíste',
                });
            }

            const token = await generateJWT(user.id);

            const data = {
                id: user.id,
                email: user.email,
                name: user.name,
                address: user.address,
                phone: user.phone,
                image: user.image,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken: token,
            };

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
            });
        }
    }
}

export const usersController = new UsersController();

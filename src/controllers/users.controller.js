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
                return res.status(400).json({
                    ok: false,
                    message: 'Email o contraseña no válida',
                });
            }

            const validPassword = bcrypt.compareSync(userData.password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    message: 'Email o contraseña no válida',
                });
            }

            const expiresIn = 60;
            const token = await generateJWT(user.id, expiresIn);

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
                expiresIn: expiresIn,
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
}

export const usersController = new UsersController();

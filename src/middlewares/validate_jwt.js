import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    const token = req.headers['access-token'];
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la petición',
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decoded = decodedToken;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            mensaje: 'Token no válido',
        });
    }
};

import jwt from 'jsonwebtoken';

export const generateJWT = (userId, isAdmin) => {
    const payload = {
        userId: userId,
        isAdmin: isAdmin
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
};

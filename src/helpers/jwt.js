import jwt from 'jsonwebtoken';

export const generateJWT = (userId) => {
    const payload = {
        user_id: userId,
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

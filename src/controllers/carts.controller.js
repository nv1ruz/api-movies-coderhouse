import { cartModel } from '../models/carts.js';

class CartsController {
    async create(req, res) {
        const cartData = req.body;

        try {
            console.log(cartData);
            const response = await cartModel.create(cartData);

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: response,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
            });
        }
    }

    async get(req, res) {
        try {
            const asd = await cartModel.find({ id_item: '20' });
            // const asd = await cartModel.findById('61df3c56f092e87370e97ec5');
            console.log(asd);
            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: asd,
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

export const cartsController = new CartsController();

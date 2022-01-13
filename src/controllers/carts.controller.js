import { cartModel } from '../models/carts.js';

class CartsController {
    async addCart(req, res) {
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
                path: `/carts`,
                method: 'POST',
            });
        }
    }

    async getCartById(req, res) {
        const cartId = req.params.cartId;

        try {
            // const asd = await cartModel.find({ id_item: '20' });
            const cart = await cartModel.findById(cartId);
            console.log(cart);
            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: cart,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/carts/${cartId}`,
                method: 'GET',
            });
        }
    }
}

export const cartsController = new CartsController();

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

    async getCartsByUserId(req, res){
        const userId = req.params.userId;

        try {
            const carts = await cartModel.find({user: userId})
                .populate('user')
                .populate({
                    path: 'cart',
                    populate: {path: 'product'}
                });
            
            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: carts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/carts/last_purchases/user/${userId}`,
                method: 'GET',
            });
        }
    }

    async getLastCarts(req, res){
        try {
            const carts = await cartModel.find()
                .populate('user')
                .populate({
                    path: 'cart',
                    populate: {path: 'product'}
                })
                .sort({createdAt: -1});
            
            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: carts,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/carts/last_purchases/all`,
                method: 'GET',
            });
        }
    }
}

export const cartsController = new CartsController();

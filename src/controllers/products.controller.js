import { productModel } from '../models/products.js';

class ProductsController {
    async getProducts(req, res) {
        try {
            const products = await productModel.find({ isEnabled: true });

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: products,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/products`,
                method: 'GET',
            });
        }
    }

    async getProductById(req, res) {
        const productId = req.params.productId;

        try {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({
                    ok: false,
                    message: 'Producto no encontrado',
                });
            }

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: product,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/products`,
                method: 'GET',
            });
        }
    }

    async addProduct(req, res) {
        const productData = req.body;

        try {
            const response = await productModel.create(productData);

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
                path: `/products`,
                method: 'POST',
            });
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.productId;
        const productData = req.body;

        try {
            console.log(productData);
            const product = await productModel.findOne({ _id: productId });
            if (!product) {
                return res.status(404).json({
                    ok: false,
                    message: 'Producto no encontrado',
                });
            }

            const response = await productModel.updateOne(
                { _id: productId },
                { $set: productData }
            );

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: {
                    updated: response.modifiedCount == 1 ? true : false,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/products/${productId}`,
                method: 'PUT',
            });
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.productId;

        try {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({
                    ok: false,
                    message: 'Producto no encontrado',
                });
            }

            const response = await productModel.findByIdAndDelete(productId);

            return res.status(200).json({
                ok: true,
                message: 'Operación exitosa',
                data: {
                    deleted: true,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error interno',
                path: `/products/${productId}`,
                method: 'DELETE',
            });
        }
    }
}

export const productsController = new ProductsController();

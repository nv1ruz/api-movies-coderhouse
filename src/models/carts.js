import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        id_item: {
            type: String,
            trim: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        cart: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                // type: Array,
                // required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const cartModel = mongoose.model('carts', cartSchema);

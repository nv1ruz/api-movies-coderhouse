import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        cart: [
            {
                productId: {
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

cartSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const cartModel = mongoose.model('carts', cartSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        genred: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
        },
        stockMin: {
            type: Number,
        },
        image: {
            type: String,
        },
        isEnabled: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

export const productModel = mongoose.model('products', productSchema);

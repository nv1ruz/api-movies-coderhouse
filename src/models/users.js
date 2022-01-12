import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const userModel = mongoose.model('users', userSchema);

import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["seller", "artisan", "buyer"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// create a new model if it doesn't exist
const User = models.User || mongoose.model("User", UserSchema);

export default User;
import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({

    bio: {
        type: String,
        default: "",  
    },
    specialty: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String,
        default: "",
    },
    story: {
        type: String,
        default: "",
    },
    profileProducts: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
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
        enum: ["artisan", "buyer"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// create a new model if it doesn't exist
const User = models.User || mongoose.model("User", UserSchema);

export default User;

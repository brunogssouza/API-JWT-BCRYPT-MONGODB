import mongoose from "mongoose";

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
        min: 10
    },
        email: {
        type: String,
        required: true,
        max: 100,
        min:10
    },
        password: {
        type: String,
        required: true,
        max: 12,
        min: 5
    },
        date: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.model('User', userModel);
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: true
    },
    lastName: {
        type: String,
        default: '',
        required: true

    },
    email: {
        type: String,
        default: '',
        required: true

    },
    password: {
        type: String,
        default: '',
        required: true

    },
    created: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('user', UserSchema)
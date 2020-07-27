import mongoose from 'mongoose'

const Schema = mongoose.Schema
const riskSchema = new Schema({
    riskName: {
        type: String,
        default: '',
        required: true
    },
    riskCategory: {
        type: String,
        default: '',
        required: true

    },
    riskEffect: {
        type: String,
        default: '',

    },
    riskDefinition: {
        type: String,
        default: '',


    },
    createdBy: {
        type: String,
        default: '',
        required: true

    },
    created: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('risk', riskSchema)
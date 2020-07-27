import mongoose from 'mongoose'

const Schema = mongoose.Schema
const projectSchema = new Schema({
    projectName: {
        type: String,
        default: '',
        required: true
    },
    projectID: {
        type: String,
        default: '',
        required: true

    },
    pmEmail: {
        type: String,
        default: '',
        required: true

    },
    additionalInfo: {
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


module.exports = mongoose.model('projects', projectSchema)
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const dataSchema = new mongoose.Schema({

    title: {
        required: true,
        type: String,
        required: true
    },
    body: {
        required: true,
        type: String,
        required: true
    },
    user: {
        required: true,
        type: String
    },

    understanding: {
        type: Object,
        required: true
    },
    percentage:{
        type: String,
        required: true
    }

}, { timestamps: true })



module.exports = mongoose.model('dataModel', dataSchema)
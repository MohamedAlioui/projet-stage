const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    Adresse: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    credit: {
        type: Number,
        default: 0.0
    },
    achatTotale: {
        type: Number,
        default: 0
    },
    commandes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommandeClient'

    }]
});






const ClientModel = mongoose.model('Clients', ClientSchema);

module.exports = ClientModel;
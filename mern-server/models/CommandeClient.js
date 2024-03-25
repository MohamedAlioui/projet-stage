const mongoose = require('mongoose');

const commandeClientSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    produitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produit',
    },
    prixUnitaire: {
        type: Number,
        required: true
    },
    qte: {
        type: Number,
        required: true
    },
    prixTotal: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

const CommandeClient = mongoose.model("commandeclients", commandeClientSchema);

module.exports = CommandeClient;
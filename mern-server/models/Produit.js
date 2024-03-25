const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nomProduit: {
        type: String,
        required: true
    },
    codeProduit: {
        type: String,
        required: true
    },
    prixProduit: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
    },
    DateAjout: {
        type: Date,
        default: Date.now
    },

});

const Produit = mongoose.model("produits", produitSchema);

module.exports = Produit;
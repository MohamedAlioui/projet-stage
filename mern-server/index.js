const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const ClientModel = require('./models/Clients');
const Produit = require('./models/Produit');
const CommandeClient = require('./models/CommandeClient');
const port = process.env.PORT || 3050;
const uri = "mongodb+srv://alioui-project:Mohamed10122002@cluster0.dxsrjul.mongodb.net/demo-alioui-project?retryWrites=true&w=majority";


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB using Mongoose
mongoose.connect(uri).then(() => {
    console.log("data base connected enjoy");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
// Edit a product: patch method
app.patch('/edit-produit/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updateProductData = req.body;
        const result = await Produit.findByIdAndUpdate(id, updateProductData, { new: true });

        if (!result) {
            return res.status(404).send("Product not found");
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get a product by id
app.get('/produits/:id', async(req, res) => {
    const id = req.params.id;
    const produit = await Produit.findById(id);
    res.send(produit);
});

// Edit a commande: patch method
app.patch('/edit-commande/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updateCommandeData = req.body;
        const result = await CommandeClient.findByIdAndUpdate(id, updateCommandeData, { new: true });

        if (!result) {
            return res.status(404).send("Commande not found");
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// Get a commande by id
app.get('/commandes/:id', async(req, res) => {
    const id = req.params.id;
    const commande = await CommandeClient.findById(id);
    res.send(commande);
});

// Insert a client of db: post method 
app.post('/add-client', async(req, res) => {
    ClientModel.create(req.body).then(clients => res.json(clients));
});

// Get all clients from the collection
app.get('/clients', async(req, res) => {
    const clients = await ClientModel.find({});
    res.send(clients);
});

// Get a client by id
app.get('/clients/:id', async(req, res) => {
    const id = req.params.id;
    const client = await ClientModel.findById(id);
    res.send(client);
});

// Update a client data: patch of update methods 
app.patch('/update-client/:id', async(req, res) => {
    const id = req.params.id;
    const updateClientData = req.body;
    const result = await ClientModel.findByIdAndUpdate(id, updateClientData, { new: true });
    res.send(result);
});

// Delete a client data: delete method
app.delete('/delete-client/:id', async(req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await ClientModel.deleteOne(filter);
    res.send(result);
});


// Add a commande to the database
app.post('/commande/client', async(req, res) => {
    const commande = await CommandeClient.create(req.body);

    // Update the achatTotale and credit of the client
    const client = await ClientModel.findById(commande.clientId);
    client.achatTotale += commande.prixTotal;
    client.credit += commande.prixTotal;
    // Push the commande id to client commandes
    client.commandes.push(commande._id);
    await client.save();

    res.json(commande);
});





// Get all commandes from the collection
app.get('/client/commandes', async(req, res) => {
    try {
        const commandes = await CommandeClient.find({});
        res.send(commandes);
    } catch (error) {
        console.error('Error getting commandes:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Remove a commande from the database
app.delete('/commande/client/:id', async(req, res) => {
    const id = req.params.id;
    const commande = await CommandeClient.findByIdAndDelete(id);

    // Update the achatTotale and credit of the client
    const client = await ClientModel.findById(commande.clientId);
    client.achatTotale -= commande.prixTotal;
    client.credit -= commande.prixTotal;
    await client.save();

    res.send(commande);
});


// Remove all commandes from the database
app.delete('/delete-AllCommandes', async(req, res) => {
    try {
        const result = await CommandeClient.deleteMany({});
        res.send(result);
    } catch (error) {
        console.error('Error removing commandes:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/filter', async(req, res) => {
    try {
        const orderDate = new Date("2024-02-01");

        // Get the start and end of the day
        const startOfDay = new Date(orderDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(orderDate);
        endOfDay.setHours(23, 59, 59, 999);

        // Find orders within the specified date range
        const orders = await CommandeClient.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        res.send(orders);
    } catch (error) {
        console.error('Error filtering orders:', error);
        res.status(500).send('Internal Server Error');
    }

});


// Insert a produit into the database: post method
app.post('/add-produit', async(req, res) => {
    Produit.create(req.body).then((produits) => res.json(produits));
});

// Get all produits from the collection
app.get('/produits', async(req, res) => {
    const produits = await Produit.find({});
    res.send(produits);
});

// Get a produit by id
app.get('/produits/:id', async(req, res) => {
    const id = req.params.id;
    const produit = await Produit.findById(id);
    res.send(produit);
});

// Update a produit data: patch or update methods
app.patch('/update-produit/:id', async(req, res) => {
    const id = req.params.id;
    const updateProduitData = req.body;
    const result = await Produit.findByIdAndUpdate(id, updateProduitData, { new: true });
    res.send(result);
});

// Delete a produit data: delete method
app.delete('/delete-produit/:id', async(req, res) => {
    const id = req.params.id;
    await Produit.findByIdAndDelete(id);
    res.send('Produit deleted successfully');
});


// Endpoint to delete all commandes
app.delete('/commandes/deleteAll', async(req, res) => {
    try {
        await CommandeClient.deleteMany({});
        res.status(200).send('All commandes deleted successfully');
    } catch (error) {
        console.error('Error deleting commandes:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Get commandes by clientId
app.get('/commandes/client/:clientId', async(req, res) => {
    const clientId = req.params.clientId;
    try {
        const commandes = await CommandeClient.find({ clientId: clientId });
        res.send(commandes);
    } catch (error) {
        console.error('Error getting commandes by clientId:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Avance credit
app.post('/clients/:id/avance', async(req, res) => {
    const clientId = req.params.id;
    const avance = req.body.avance;
    try {
        const client = await ClientModel.findById(clientId);
        client.credit -= avance;
        await client.save();
        res.send(client);
    } catch (error) {
        console.error('Error adding avance:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
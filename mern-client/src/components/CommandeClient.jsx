import React, { useState, useEffect } from "react";
import Axios from "axios";

const CommandeClient = () => {
  const [clients, setClients] = useState([]);
  const [prixTotal, setPrixTotal] = useState(0);
  const [produits, setProduits] = useState([]);
  const [prixUnitaire, setPrixUnitaire] = useState(0);
  const [qte, setQte] = useState("");

  const handleQteChange = (event) => {
    const newQte = event.target.value;
    setQte(newQte);
  };

  const handlePrixUnitaireChange = (event) => {
    const selectedProduitId = event.target.value;
    const selectedProduit = produits.find(
      (produit) => produit._id === selectedProduitId
    );

    if (selectedProduit) {
      const newPrixUnitaire = parseFloat(selectedProduit.prixProduit);
      setPrixUnitaire(newPrixUnitaire);
    }
  };

  useEffect(() => {
    const calculatePrixTotal = () => {
      const newPrixTotal = parseFloat(qte) * prixUnitaire;
      setPrixTotal(newPrixTotal);
    };

    calculatePrixTotal();
  }, [qte, prixUnitaire]);

  useEffect(() => {
    Axios.get("http://localhost:3050/clients").then((res) => {
      setClients(res.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3050/produits").then((res) => {
      setProduits(res.data);
    });
  }, []);

  const handleCommandeSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const clientId = form.clientId.value;
    const produitId = form.nomProduit.value;

    console.log("clientId:", clientId);
    console.log("qte:", qte);
    console.log("prixUnitaire:", prixUnitaire);
    console.log("prixTotal:", prixTotal);

    const clientObj = {
      clientId,
      produitId,
      prixUnitaire,
      qte,
      prixTotal,
    };

    Axios.post("http://localhost:3050/commande/client", clientObj)
      .then(() => {
        alert("Client ajouté avec succès");
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting command:", error);
        // Handle error appropriately
      });
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleCommandeSubmit}>
      <div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            id="clientId"
            name="client"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Choisir un client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            onChange={handlePrixUnitaireChange}
            id="nomProduit"
            name="produit"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">Choisir un produit</option>
            {produits.map((produit) => (
              <option key={produit._id} value={produit._id}>
                {produit.nomProduit}
              </option>
            ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="qte"
            id="qte"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onKeyUp={handleQteChange}
          />
          <label
            htmlFor="qte"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Quantité
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            id="prixTotal"
            aria-label="disabled input"
            className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={prixTotal}
          />

          <label
            htmlFor="prixTotal"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Prix Totale
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
    </form>
  );
};

export default CommandeClient;

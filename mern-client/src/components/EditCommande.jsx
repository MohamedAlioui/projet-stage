import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";

const EditCommande = () => {
  const { id: commandeId } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [prixUnitaire, setPrixUnitaire] = useState(0);
  const [qte, setQte] = useState("");
  const [prixTotal, setPrixTotal] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:3050/commandes/${commandeId}`)
      .then((response) => response.data)
      .then((data) => {
        setPrixUnitaire(data.prixUnitaire);
        setQte(data.qte);
        setPrixTotal(data.prixTotal);
      })
      .catch((error) => {
        console.error("Error fetching commande data:", error);
      });
  }, [commandeId]);

  useEffect(() => {
    Axios.get("http://localhost:3050/clients").then((res) => {
      setClients(res.data);
    });
    Axios.get("http://localhost:3050/produits").then((res) => {
      setProduits(res.data);
    });
  }, []);

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

  const handleCommandeSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const clientId = form.clientId.value;
    const produitId = form.nomProduit.value;

    const commandeObj = {
      clientId,
      produitId,
      prixUnitaire,
      qte,
      prixTotal,
    };

    Axios.patch(
      `http://localhost:3050/edit-commande/${commandeId}`,
      commandeObj
    )
      .then(() => {
        alert("Commande modifiée avec succès");
        form.reset();
        navigate(`/commandes`);
      })
      .catch((error) => {
        console.error("Error updating commande data:", error);
      });
  };

  return (
    <form className="max-w-md mx-auto pt-5" onSubmit={handleCommandeSubmit}>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          htmlFor="clientId"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Select your client
        </label>
        <select
          disabled
          id="clientId"
          name="client"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.clientName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <select
          onChange={handlePrixUnitaireChange}
          id="nomProduit"
          name="produit"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {produits.map((produit) => (
            <option key={produit._id} value={produit._id}>
              {produit.nomProduit}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Quantité
        </label>
      </div>

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <input
          type="text"
          id="prixTotal"
          aria-label="disabled input"
          className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={prixTotal}
          disabled
        />

        <label
          htmlFor="prixTotal"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Prix Totale
        </label>
      </div>

      <Button type="submit">Modifier Commande</Button>
    </form>
  );
};

export default EditCommande;

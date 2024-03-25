import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

const CommandesClient = () => {
  const { id } = useParams();

  const [clients, setClients] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [produits, setProduits] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avanceAmount, setAvanceAmount] = useState(0); // Default avance amount

  // Fetch clients on component mount
  useEffect(() => {
    Axios.get(`http://localhost:3050/clients`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  // Fetch commandes for the specific clientId
  useEffect(() => {
    Axios.get(`http://localhost:3050/commandes/client/${id}`)
      .then((res) => {
        setCommandes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching commandes:", error);
      });
  }, [id]);

  // Fetch produits
  useEffect(() => {
    Axios.get("http://localhost:3050/produits")
      .then((res) => {
        setProduits(res.data);
      })
      .catch((error) => {
        console.error("Error fetching produits:", error);
      });
  }, []);

  // Filter commandes based on startDate and endDate
  useEffect(() => {
    filterCommandes();
  }, [commandes, startDate, endDate]);

  const handleAvance = async (clientId) => {
    console.log("Adding avance:", avanceAmount, clientId);
    try {
      if (isNaN(avanceAmount)) {
        console.error("Invalid avanceAmount. Must be a number.");
        return;
      }

      // Make a POST request to add avance
      await Axios.post(`http://localhost:3050/clients/${clientId}/avance`, {
        avance: parseFloat(avanceAmount),
      });

      // Reset avanceAmount to 0 after successful avance addition
      setAvanceAmount(0);

      // Fetch the updated client data after avance is added
      const updatedClientResponse = await Axios.get(
        `http://localhost:3050/clients/${clientId}`
      );
      const updatedClient = updatedClientResponse.data;

      // Update the client state with the updated data
      setClients((prevClients) =>
        prevClients.map((client) =>
          client._id === clientId
            ? { ...client, credit: updatedClient.credit }
            : client
        )
      );

      alert("Avance added successfully");

      // Log the updated client data
      console.log("Updated Client:", updatedClient);
    } catch (error) {
      console.error("Error adding avance:", error);
    }
  };

  const filterCommandes = () => {
    if (!Array.isArray(commandes)) {
      console.error("Commandes is not an array:", commandes);
      return;
    }

    const startDateTime = startDate ? new Date(startDate).getTime() : null;
    const endDateTime = endDate ? new Date(endDate).getTime() : null;

    const filtered = commandes.filter((commande) => {
      const orderDateTime = new Date(commande.date).getTime();

      return (
        (!startDateTime || orderDateTime >= startDateTime) &&
        (!endDateTime || orderDateTime <= endDateTime)
      );
    });

    setFilteredCommandes(filtered);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        {clients.map((client) => {
          if (client._id === id) {
            return (
              <div key={client.id}>
                <h2 className="text-2xl font-bold mb-4">{client.clientName}</h2>
                <input
                  id="avance"
                  type="number"
                  value={avanceAmount}
                  onChange={(e) => setAvanceAmount(e.target.value)}
                />
                {/* Add avance button */}
                <button
                  onClick={() => handleAvance(client._id)}
                  className=" bg-green-600 text-white p-2 ml-3 rounded	">
                  Avance
                </button>
              </div>
            );
          }
          return null;
        })}

        {clients.map((client) => {
          if (client._id === id) {
            return (
              <h2 className="text-2xl font-bold mb-4">
                <span>Credit : </span>
                {client.credit}
              </h2>
            );
          }
          return null;
        })}

        {clients.map((client) => {
          if (client._id === id) {
            return (
              <h2 className="text-2xl font-bold mb-4">
                <span>Achat Totale : </span>
                {client.achatTotale}
              </h2>
            );
          }
          return null;
        })}
        {/* Map commandes and calculate the sum */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span>Nombre de Commandes : </span>
            {commandes.length}
          </h2>
        </div>

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="inline-flex items-center text-gray-600 bg-white border border-gray-600 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Link to="/commandes/clients/ajouter-commande/">
              Ajouter Commande
            </Link>
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Référence
              </th>
              <th scope="col" className="px-6 py-3">
                Produit
              </th>
              <th scope="col" className="px-6 py-3">
                Quantité
              </th>
              <th scope="col" className="px-6 py-3">
                Prix Unitaire
              </th>
              <th scope="col" className="px-6 py-3">
                Totale
              </th>
              <th scope="col" className="px-6 py-3">
                Date de Commande
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCommandes.map((commande, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={commande._id}>
                <td className="border px-6 py-4 text-black font-mono">
                  {index + 1}
                </td>
                {produits.map((produit) => {
                  if (produit._id === commande.produitId) {
                    return (
                      <td className="border px-6 py-4 " key={produit._id}>
                        {produit.nomProduit}
                      </td>
                    );
                  }
                  return null;
                })}

                <td className="border px-6 py-4 text-black font-mono">
                  {commande.qte}
                </td>
                <td className="border px-6 py-4 text-black font-mono">
                  {commande.prixUnitaire}
                </td>
                <td className="border px-6 py-4 text-black font-mono">
                  {commande.prixTotal}
                </td>
                <td className="border px-6 py-4 text-black font-mono">
                  {new Date(commande.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommandesClient;

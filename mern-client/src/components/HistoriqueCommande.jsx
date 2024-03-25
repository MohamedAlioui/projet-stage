import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../App.css";

const CommandesClient = () => {
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3050/client/commandes").then((res) => {
      setCommandes(res.data);
    });
  }, []);

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

  useEffect(() => {
    filterCommandes();
  }, [commandes, startDate, endDate]);

  const filterCommandes = () => {
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

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    Axios.delete(`http://localhost:3050/commande/client/${deleteItemId}`)
      .then(() => {
        setShowDeleteModal(false);

        Axios.get("http://localhost:3050/client/commandes")
          .then((res) => {
            setCommandes(res.data);
          })
          .catch((error) => {
            console.error("Error fetching updated commandes:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className="text-2xl font-bold mb-4 m-4">Commande Client</h2>

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="inline-flex items-center  border border-gray-600 focus:outline-none hover:bg-green-300 focus:ring-4 focus:ring-gray-200 font-medium ml-4 rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800  bg-green-500 text-white ">
            <Link to="/commandes/clients/ajouter-commande/" className="">
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
                Nom de client
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filteredCommandes.map((commande, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={commande._id}>
                <td className="border px-6 py-4 text-black font-mono">
                  {index + 1}
                </td>
                {produits.map((produit) => {
                  if (produit._id == commande.produitId) {
                    return (
                      <td className="border px-6 py-4 " key={produit._id}>
                        {produit.nomProduit}
                      </td>
                    );
                  }
                  return null;
                })}
                {clients.map((client) => {
                  if (client._id === commande.clientId) {
                    return (
                      <td className="border px-6 py-4 " key={client._id}>
                        {client.clientName}
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
                  })}{" "}
                </td>
                <td className="border px-6 py-4 text-black font-mono">
                  <Link to={`/edit-commande/${commande._id}`}>
                    <EditOutlined />
                  </Link>
                  <button onClick={() => handleDelete(commande._id)}>
                    <DeleteOutlined />
                  </button>
                  {showDeleteModal && deleteItemId === commande._id && (
                    <div
                      id="deleteModal"
                      tabIndex="-1"
                      className="your-modal-classes">
                      <button
                        onClick={confirmDelete}
                        type="submit"
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Oui, Bien sur
                      </button>
                      <button
                        onClick={closeModal}
                        data-modal-toggle="deleteModal"
                        type="button"
                        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Non
                      </button>
                    </div>
                  )}
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Axios from "axios";
const Produit = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch("http://localhost:3050/produits");
      const data = await response.json();

      // Assuming the API response contains an array of products
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    Axios.delete(`http://localhost:3050/delete-produit/${deleteItemId}`)
      .then(() => {
        setShowDeleteModal(false);

        Axios.get("http://localhost:3050/produits")
          .then((res) => {
            setProducts(res.data);
          })
          .catch((error) => {
            console.error("Error fetching updated products:", error);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Produits</h2>

      <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div
          id="dropdownRadioButton"
          data-dropdown-toggle="dropdownRadio"
          class="inline-flex items-center text-gray-600 bg-white border border-gray-600		 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button">
          <Link to="/ajouterClient" path="/ajouterClient">
            {/* <UserAddOutlined style={{ fontSize: "25px", color: "Black" }} /> */}
            Ajouter Produit
          </Link>
        </div>
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              code produit
            </th>
            <th scope="col" className="px-6 py-3">
              Nom de produit
            </th>

            <th scope="col" className="px-6 py-3">
              Prix de produit
            </th>
            <th scope="col" className="px-6 py-3">
              Description de produit
            </th>

            <th scope="col" className="px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="">
          {products.map((product, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={product._id}>
              <td
                className="border px-6 py-4 text-black font-mono

">
                {index + 1}
              </td>
              <td
                className="border px-6 py-4 text-black font-mono

">
                {" "}
                {product.codeProduit}
              </td>
              <td
                className="border px-6 py-4 text-black font-mono

">
                {product.nomProduit}
              </td>
              <td
                className="border px-6 py-4 text-black font-mono

">
                {product.prixProduit}
              </td>
              <td
                className="border px-6 py-4 text-black font-mono

">
                {product.Description}
              </td>

              <td
                className="border px-6 py-4 text-black font-mono

">
                {product.DateAjout}
              </td>

              <td
                className="border px-6 py-4 text-black font-mono

">
                <Link to={`/produits/edit-produit/${product._id}`}>
                  <EditOutlined />
                </Link>

                <button onClick={() => handleDelete(product._id)}>
                  <DeleteOutlined />
                </button>
                {showDeleteModal && deleteItemId === product._id && (
                  <div
                    id="deleteModal"
                    tabIndex="-1"
                    className="your-modal-classes">
                    <button
                      onClick={confirmDelete}
                      type="submit"
                      className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                      Yes, I'm sure
                    </button>
                    <button
                      onClick={closeModal}
                      data-modal-toggle="deleteModal"
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                      No, cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produit;

import React, { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

const EditProduit = () => {
  const { id } = useParams();
  const { codeProduit, nomProduit, prixProduit, Description } = useLoaderData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codeProduit: codeProduit,
    nomProduit: nomProduit,
    prixProduit: prixProduit,
    Description: Description,
  });

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3050/edit-produit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the server response is in JSON format
      const data = response.data;

      // Your success handling code here
      alert("Produit modifié avec succès");
      navigate("/produit");
    } catch (error) {
      // Handle errors here
      console.error("Error updating product:", error);
      // You can add additional error handling code as needed
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Modifier Produit
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100">
            <form onSubmit={handleProductSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Information de Produit
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="code">
                      Code de Produit
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-200 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Fromage blanc"
                      value={formData.codeProduit}
                      onChange={handleInputChange}
                      id="codeProduit"
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="nomProduit">
                      Nom de Produit
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Fromage blanc"
                      value={formData.nomProduit}
                      onChange={handleInputChange}
                      id="nomProduit"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="prixProduit">
                      Prix du Produit
                    </label>
                    <input
                      type="Number"
                      className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="260DT"
                      value={formData.prixProduit}
                      onChange={handleInputChange}
                      id="prixProduit"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="Description">
                    Description
                  </label>
                  <input
                    type="text"
                    className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Description"
                    value={formData.Description}
                    onChange={handleInputChange}
                    id="Description"
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="w-full mb-3">
                    <button
                      className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="submit">
                      Modifier
                    </button>
                    <button
                      className="bg-red-900 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="reset">
                      Rétablir
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduit;

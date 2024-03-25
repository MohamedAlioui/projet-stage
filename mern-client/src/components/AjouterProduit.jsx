import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const handleProductSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const nomProduit = form.nomProduit.value;
  const codeProduit = form.codeProduit.value;
  const prixProduit = form.prixProduit.value;
  const Description = form.Description.value;

  const produitObj = { nomProduit, codeProduit, prixProduit, Description };

  console.log(produitObj);

  fetch("http://localhost:3050/add-produit", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(produitObj),
  }).then((res) =>
    res.json().then((data) => {
      alert("Produit Ajouté ");
      form.reset();
    })
  );
};

const AjouterProduit = () => {
  return (
    // <div className="px-4 my-12">
    //   <div className="mb-8 text-3xl font-bold">
    //     <h2>Ajouter Client</h2>
    //     <form className="flex flex-col flex-wrap lg:w[1180px] gap-4" onSubmit={handleClientSubmit}>
    //       {/* First Row  */}
    //       <div className="flex gap-8 ">
    //         <div className="lg:w-1/2">
    //           <div className="mb-2 block w-full">
    //             <Label htmlFor="clientName" value="Base input" />
    //           </div>
    //           <TextInput
    //             id="clientName"
    //             placeholder="Mohamed ALioui" required
    //             type="text"
    //             sizing="md"
    //           />
    //         </div>

    //         <div className="lg:w-1/2">
    //           <div className="mb-2 block">
    //             <Label htmlFor="Adresse" value="Base input" />
    //           </div>
    //           <TextInput
    //             id="Adresse"
    //             placeholder="zhena Utique"
    //             type="text"
    //             sizing="md" required
    //           />
    //         </div>
    //       </div>
    //       <div className="flex gap-8 ">
    //         <Button type="submit">Ajouter</Button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Ajouter Produit{" "}
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gray-100		">
            <form onSubmit={handleProductSubmit}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Information de Produit
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Nom de Produit
                    </label>
                    <input
                      type="text"
                      cl
                      assName="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="fromage blanc"
                      id="nomProduit"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Code Produit
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="15461215421"
                      id="codeProduit"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password">
                      Prix du Produit
                    </label>
                    <input
                      type="Number"
                      className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="260DT"
                      id="prixProduit"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password">
                    Description
                  </label>
                  <input
                    type="text"
                    className="border-0 w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Description"
                    id="Description"
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className=" w-full mb-3 ">
                    <button
                      className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="submit">
                      Ajouter
                    </button>
                    <button
                      className="bg-red-900 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="reset">
                      Retablir
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

export default AjouterProduit;

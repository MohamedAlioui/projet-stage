// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import "../App.css";
// import { Link } from "react-router-dom";

// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
//   Chip,
//   Tooltip,
//   Progress,
// } from "@material-tailwind/react";

// const ClientsTable = () => {
//   const [clients, setClients] = useState([]);

//   useEffect(() => {
//     Axios.get("http://localhost:3050/clients").then((res) => {
//       setClients(res.data);
//     });
//   }, []);

//   const handleDelete = (id, e) => {
//     e.preventDefault();
//     console.log(id);
//     Axios.delete(`http://localhost:3050/delete-client/${id}`);
//   };
//   return (
//     <>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Clients</h2>

//         <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
//           <div
//             id="dropdownRadioButton"
//             data-dropdown-toggle="dropdownRadio"
//             class="inline-flex items-center text-gray-600 bg-white border border-gray-600		 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//             type="button">
//             <Link to="/ajouterClient" path="/ajouterClient">
//               {/* <UserAddOutlined style={{ fontSize: "25px", color: "Black" }} /> */}
//               Ajouter Client
//             </Link>
//           </div>
//           <label for="table-search" class="sr-only">
//             Search
//           </label>
//           <div class="relative">
//             <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
//               <svg
//                 class="w-5 h-5 text-gray-500 dark:text-gray-400"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path
//                   fill-rule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clip-rule="evenodd"></path>
//               </svg>
//             </div>
//             <input
//               type="text"
//               id="table-search"
//               class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search for items"
//             />
//           </div>
//         </div>

//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 No
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Nom
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 MATRICULE FISCALE
//               </th>

//               <th scope="col" className="px-6 py-3">
//                 Mobile
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Adresse
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Crédit
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Total
//               </th>
//             </tr>
//           </thead>
//           <tbody className="">
//             {clients.map((client, index) => (
//               <tr
//                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 key={client._id}>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {index + 1}
//                 </td>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {" "}
//                   <Link to={`/clients/client/${client._id}`}>
//                     {client.clientName}
//                   </Link>
//                 </td>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {client.matricule}
//                 </td>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {client.email}
//                 </td>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {client.mobile}
//                 </td>

//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {client.credit}
//                 </td>
//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   {client.achatTotale}
//                 </td>

//                 <td
//                   className="border px-6 py-4 text-black font-mono

// ">
//                   <Link to={`/clients/edit-client/${client._id}`}>
//                     <EditOutlined />
//                   </Link>

//                   <button onClick={(e) => handleDelete(client._id, e)}>
//                     <DeleteOutlined />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Input,
  Button,
} from "@material-tailwind/react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const ClientsTable = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3050/clients").then((res) => {
      setClients(res.data);
    });
  }, []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    Axios.delete(`http://localhost:3050/delete-client/${deleteItemId}`)
      .then(() => {
        setShowDeleteModal(false);

        Axios.get("http://localhost:3050/clients")
          .then((res) => {
            setCommandes(res.data);
          })
          .catch((error) => {
            console.error("Error fetching updated client:", error);
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
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="green" className="mb-8 p-6">
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
            <div className=" items-center gap-x-2 lg:flex">
              <div className="relative flex w-full gap-2 md:w-max text-white">
                <Input
                  type="search"
                  placeholder="Search"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className=" !border-teal-50	 pl-9 placeholder:text-white-300 focus:!border-blue-gray-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="!absolute left-3 top-[13px]">
                  <svg
                    width="13"
                    height="14"
                    className="text-white"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                      fill="#fff"
                    />
                    <path
                      d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <Button size="md" className="rounded-lg  bg-white text-black">
                Search
              </Button>
            </div>
            <Typography
              as="a"
              href="#"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5">
              <Link
                to="/ajouterClient"
                path="/ajouterClient"
                className="bg-white text-gray-800 p-2 rounded-md	">
                Ajouter Client
              </Link>
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    No
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Nom
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    MATRICULE FISCALE
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Mobile
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Adresse
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Crédit
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Total
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400">
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client._id}
                  className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    index === clients.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {index + 1}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link to={`/clients/client/${client._id}`}>
                      {client.clientName}
                    </Link>
                  </td>

                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {client.matricule}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {client.mobile}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {client.Adresse}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {client.credit}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    {client.achatTotale}
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Link
                      to={`/clients/edit-client/${client._id}`}
                      className="pr-2 antialiased font-sans text-xs font-semibold text-blue-gray-600">
                      <EditOutlined />
                    </Link>
                    <button onClick={() => handleDelete(client._id)}>
                      <DeleteOutlined />
                    </button>
                    {showDeleteModal && deleteItemId === client._id && (
                      <div
                        id="deleteModal"
                        tabIndex="-1"
                        className="your-modal-classes">
                        <button
                          onClick={confirmDelete}
                          type="submit"
                          className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                          Oui
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
        </CardBody>
      </Card>
    </div>
  );
};

export default ClientsTable;

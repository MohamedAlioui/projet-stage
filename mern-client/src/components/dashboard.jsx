import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalAchat, setTotalAchat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch client data
        const clientResponse = await fetch("http://localhost:3050/clients");
        const clients = await clientResponse.json();
        setClientCount(clients.length);

        // Fetch order data for today
        const today = new Date().toISOString().split("T")[0]; // Get today's date
        const orderResponse = await fetch(
          `http://localhost:3050/client/commandes?date=${today}`
        );
        const orders = await orderResponse.json();
        setOrderCount(orders.length);

        // Fetch product data
        const productResponse = await fetch("http://localhost:3050/produits");
        const products = await productResponse.json();
        setProductCount(products.length);

        // Calculate total achat for today's orders
        const totalAchat = orders.reduce(
          (total, order) => total + order.prixTotal,
          0
        );
        const totalCredits = clients.reduce(
          (total, credit) => total + credit.credit,
          0
        );
        setCredits(totalCredits);
        setTotalAchat(totalAchat);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Add a loading indicator
  }

  const renderStatCard = (icon, title, value, percentage, color) => (
    <div className="relative flex flex-col bg-clip-border   rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
      <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
        {icon}
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
          {title}
        </p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
          {value}
        </h4>
      </div>
    </div>
  );

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative flex flex-col bg-clip-border   rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
          <div className="bg-clip-border  mt-4 mx-4 rounded-xl overflow-hidden bg-green-600 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-green-600">
              Achat Totale
            </p>
            <h4 className="block antialiased  tracking-normal font-sans text-2xl font-semibold leading-snug text-green-600">
              {totalAchat}
              <sup className="text-xs font-sans">
                <i>DT</i>
              </sup>
            </h4>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border   rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
          <div className="bg-clip-border  mt-4 mx-4 rounded-xl overflow-hidden bg-gray-900 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-600">
              Commandes
            </p>
            <h4 className="block antialiased  tracking-normal font-sans text-2xl font-semibold leading-snug text-gray-900">
              {orderCount}
            </h4>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border   rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
          <div className="bg-clip-border  mt-4 mx-4 rounded-xl overflow-hidden bg-gray-900 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-gray-600">
              Clients
            </p>
            <h4 className="block antialiased  tracking-normal font-sans text-2xl font-semibold leading-snug text-gray-900">
              {clientCount}
            </h4>
          </div>
        </div>
        <div className="relative flex flex-col bg-clip-border   rounded-xl bg-white text-gray-700 border border-blue-gray-100 shadow-sm">
          <div className="bg-clip-border  mt-4 mx-4 rounded-xl overflow-hidden bg-red-600 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-6 h-6 text-white">
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"></path>
              <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block  antialiased font-sans text-sm leading-normal font-normal text-red-600">
              Crédit Total
            </p>
            <h4 className="block antialiased  tracking-normal font-sans text-2xl font-semibold leading-snug text-red-700">
              {credits}
              <sup className="text-xs font-sans">
                <i>DT</i>
              </sup>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

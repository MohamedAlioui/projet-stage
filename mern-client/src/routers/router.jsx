import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/dashboard";
import ClientsTable from "../components/ClientsTable";
import Fournisseurs from "../components/Fournisseurs";
import AjouterClient from "../components/AjouterClient";
import EditClient from "../components/EditClient";
import CommandeClient from "../components/CommandeClient";
import HistoriqueCommande from "../components/HistoriqueCommande";
import AjouterProduit from "../components/AjouterProduit";
import Client from "../components/Client";
// import Dashboard from "../Dashboard/dashboard";
import Produit from "../components/Produits";
import EditProduit from "../components/Editproduit";
import EditCommande from "../components/EditCommande";
import Signin from "../components/signin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/clients",
        element: <ClientsTable />,
      },
      {
        path: "/fournisseurs",
        element: <Fournisseurs />,
      },
      {
        path: "/ajouterClient",
        element: <AjouterClient />,
      },
      {
        path: "/clients/edit-client/:id",
        element: <EditClient />,
        loader: ({ params }) =>
          fetch(`http://localhost:3050/clients/${params.id}`),
      },
      {
        path: "/produits/edit-produit/:id", // Add the path for editing a product
        element: <EditProduit />, // Replace EditProduit with the component for editing a product
        loader: ({ params }) =>
          fetch(`http://localhost:3050/produits/${params.id}`),
      },
      {
        path: "/clients/client/:id",
        element: <Client />,
        loader: ({ params }) =>
          fetch(`http://localhost:3050/commandes/${params.id}`),
      },
      {
        path: "/edit-commande/:id",
        element: <EditCommande />,
        loader: ({ params }) =>
          fetch(`http://localhost:3050/commandes/${params.id}`),
      },

      {
        path: "/commandes/clients/ajouter-commande/",
        element: <CommandeClient />,
      },
      {
        path: "/commandes",
        element: <HistoriqueCommande />,
      },
      {
        path: "/produits/ajouterProduit",
        element: <AjouterProduit />,
      },
      {
        path: "/produits",
        element: <AjouterProduit />,
      },
      {
        path: "/produit",
        element: <Produit />,
      },
      {
        path: "auth/sign-in",
        element: <Signin />,
      },
    ],
  },
]);

export default router;

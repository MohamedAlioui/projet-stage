import { UserCircle, Home, Users, Boxes, UsersRound } from "lucide-react";

import { Link } from "react-router-dom";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
// import { SidebarItem } from './components/MenuList'
// import Sidebar from './components/MenuList'
import MenuList from "./components/MenuList";
import { Navbar } from "./components/Navbar";
// import { Sidebar } from "./components/Sidebar";
import Signin from "./components/signin";

function App() {
  return (
    // <>
    //   <Signin />
    // </>
    <div className="min-h-screen bg-blue-gray-50/50 ">
      <div className="bg-white shadow-sm -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
        <MenuList />
      </div>

      <div className="p-4 xl:ml-80" id="main-content">
        <div className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
          <Navbar />
        </div>
        <div className="px2 pt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;

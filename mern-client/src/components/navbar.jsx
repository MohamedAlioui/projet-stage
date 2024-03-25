import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
} from "@material-tailwind/react";

export function Navbar({ brandName, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <MTNavbar className="p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            variant="small"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
            Systeme de Gestion d'une Fromagerie
          </Typography>
        </Link>

        {React.cloneElement(action, {
          className: "hidden lg:inline-block",
        })}
        <button
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? "Close" : "Open"}
        </button>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="capitalize">
              <Link
                to="/link1"
                className="flex items-center gap-1 p-1 font-normal">
                Link 1
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="small"
              color="blue-gray"
              className="capitalize">
              <Link
                to="/link2"
                className="flex items-center gap-1 p-1 font-normal">
                Link 2
              </Link>
            </Typography>
          </ul>
          {React.cloneElement(action, {
            className: "w-full block lg:hidden",
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Material Tailwind React",
  action: (
    <a target="_blank" className="bg-orange-600">
      <Button variant="gradient" size="sm" fullWidth className="!bg-orange-600">
        se déconnecter
      </Button>
    </a>
  ),
};
Navbar.propTypes = {
  brandName: PropTypes.string,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;

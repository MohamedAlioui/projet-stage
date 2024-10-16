import React from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import logoImage from "../assets/login.png";
const Signin = () => {
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Admin
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal">
            Entrez votre Nom d'utilisateur et votre mot de passe pour vous
            connecter.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium">
              Nom d'utilisateur
            </Typography>
            <Input
              size="lg"
              placeholder="admin1"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium">
              Mot de passe
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="text-red">
            Vérifier votre Mot de passe ou Nom d'utilisateur
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src={logoImage}
          className=" w-full object-cover rounded-2xl"
          style={{ marginRight: "8px", height: "90vh" }}
        />
      </div>
    </section>
  );
};

export default Signin;

import React from "react";
import "@/css/style.css";
import Image from "next/image";
import { Metadata } from "next";
import Connexion from "@/components/Authentification/Connexion";

export const metadata: Metadata = {
  title: "SamUnity",
};

const Login: React.FC = () => {
  return (
  
      <div className="rounded-[10px] dark:bg-gray-dark dark:shadow-card connexion">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-1.5 xl:p-10">
              <Connexion />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              
              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
              <div className="mt-26">
                <Image
                  src={"/images/logo2.jpeg"}
                  alt="Logo"
                  width={405}
                  height={25}
                  className="mx-auto dark:opacity-30 rounded-full"
                />
              </div>
              </h1>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default Login;

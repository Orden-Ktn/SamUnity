import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Inscription from "@/components/Authentification/Inscription";

export const metadata: Metadata = {
  title: "SamUnity",

};

const SignIn: React.FC = () => {
  return (
  
      <div className="rounded-[10px] dark:bg-gray-dark dark:shadow-card connexion">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-1.5 xl:p-10">
              <Inscription />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">

              <div className="mt-31">
              <Image
                  src={"/images/logo2.jpeg"}
                  alt="Logo"
                  width={405}
                  height={25}
                  className="mx-auto dark:opacity-30 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default SignIn;

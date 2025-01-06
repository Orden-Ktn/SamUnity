"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonDefault from "../Authentification/Buttons/ButtonDefault";


const Index: React.FC = () => {
  return (
    <>

<div className="overflow-hidden rounded-[10px] dark:bg-gray-dark dark:shadow-card">
      <div className="relative z-20 h-35 md:h-65"></div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              <Image
                src="/images/logo2.jpeg"
                width={3000}
                height={3000}
                className="overflow-hidden rounded-full"
                alt="profile"
              />
            </div>
          </div>

        
            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <span className="font-medium text-dark dark:text-white">
                <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
                  Mouvement des Servants de Messe PSBSHD
                </h3>
              </span>
            </div>

            <div className="mx-auto max-w-[720px]">
              <p className="mt-4">
              A l'ère du digital, SamUnity est un progiciel conçu pour permettre aux animateurs de numériser et 
              d'automatiser les différentes tâches du groupe de manière très simple et éfficace.
              </p>
            </div>

            <div className="mt-4.5">
              <h4 className="mb-3.5 font-medium text-dark dark:text-white">
                Parle Seigneur, ton serviteur écoute!
              </h4>
              <div className="flex items-center justify-center gap-3.5">
              <ButtonDefault
              label="Connexion"
              // link="/Tresorier/dashboard"
              link="/Authentification/connexion"
              customClasses="border border-green text-green rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10"
            />
              </div>
            </div>

          </div>
        </div>

    </>
  );
};

export default Index;

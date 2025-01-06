import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Ajout_ancien_solde from "@/components/Tresorier/Etat_caisse/Ajout_ancien_solde";


export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_depensePage = () => {
  return (
    <DefaultLayout>
      <Ajout_ancien_solde/>
    </DefaultLayout>
  );
};

export default ajout_depensePage;

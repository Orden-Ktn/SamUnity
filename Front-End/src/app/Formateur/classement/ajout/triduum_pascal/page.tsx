import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Triduum_pascal from "@/components/Commun/Classement/Ajout/Triduum_pascal";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Triduum_pascal/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

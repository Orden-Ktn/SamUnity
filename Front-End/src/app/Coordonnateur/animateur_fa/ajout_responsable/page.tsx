import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
import Ajout_responsable from "@/components/Coordonnateur/Animateur_FA/Ajout_fa";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_responsablePage = () => {
  return (
    <DefaultLayout>
      <Ajout_responsable/>
    </DefaultLayout>
  );
};

export default ajout_responsablePage;

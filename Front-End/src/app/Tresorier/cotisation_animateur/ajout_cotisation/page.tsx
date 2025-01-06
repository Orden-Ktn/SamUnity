import React from "react";
import { Metadata } from "next";

import Ajout_cotisation from "@/components/Tresorier/Cotisation_Animateur/Ajout_cotisation";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_cotisationPage = () => {
  return (
    <DefaultLayout>
      <Ajout_cotisation/>
    </DefaultLayout>
  );
};

export default ajout_cotisationPage;

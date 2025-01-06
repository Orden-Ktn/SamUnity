import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
import Ajout_annee_pastorale from "@/components/Coordonnateur/Annee_pastorale/Ajout_annee_pastorale";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_annee_pastoralePage = () => {
  return (
    <DefaultLayout>
      <Ajout_annee_pastorale/>
    </DefaultLayout>
  );
};

export default ajout_annee_pastoralePage;

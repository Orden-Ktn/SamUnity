import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Fetes from "@/components/Commun/Classement/Ajout/Fetes";




export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Fetes/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

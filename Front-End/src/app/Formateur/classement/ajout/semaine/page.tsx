import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Semaine from "@/components/Commun/Classement/Ajout/Semaine";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Semaine/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

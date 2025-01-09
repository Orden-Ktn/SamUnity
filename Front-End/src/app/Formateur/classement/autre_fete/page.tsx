import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Autre_fete from "@/components/Formateur/Classement/Autre_fete";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Autre_fete/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Reveillons from "@/components/Formateur/Classement/Ajout/Reveillons";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Reveillons/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

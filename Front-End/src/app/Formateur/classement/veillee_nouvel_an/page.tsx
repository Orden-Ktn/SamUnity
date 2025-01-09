import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Veillee_nouvel_an from "@/components/Formateur/Classement/Veillee_nouvel_an";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Veillee_nouvel_an/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

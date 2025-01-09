import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Veillee_noel from "@/components/Formateur/Classement/Veillee_noel";



export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_classementPage = () => {
  return (
    <DefaultLayout>
      <Veillee_noel/>
    </DefaultLayout>
  );
};

export default ajout_classementPage;

import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Epreuve_recue from "@/components/Formateur/Epreuves/all_epreuve";


export const metadata: Metadata = {
  title: "SamUnity",
};

const depot_epreuvePage = () => {
  return (
    <DefaultLayout>
      <Epreuve_recue/>
    </DefaultLayout>
  );
};

export default depot_epreuvePage;

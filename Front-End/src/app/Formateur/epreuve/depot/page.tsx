import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Depot_epreuve from "@/components/Formateur/Epreuves/depot";



export const metadata: Metadata = {
  title: "SamUnity",
};

const depot_epreuvePage = () => {
  return (
    <DefaultLayout>
      <Depot_epreuve/>
    </DefaultLayout>
  );
};

export default depot_epreuvePage;

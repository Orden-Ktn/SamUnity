import React from "react";
import { Metadata } from "next";
import Ajout_benefice from "@/components/Tresorier/Benefice/Ajout_benefice";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_beneficePage = () => {
  return (
    <DefaultLayout>
      <Ajout_benefice/>
    </DefaultLayout>
  );
};

export default ajout_beneficePage;

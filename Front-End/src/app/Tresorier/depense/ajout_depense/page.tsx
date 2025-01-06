import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Ajout_depense from "@/components/Tresorier/Depense/Ajout_depense";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_depensePage = () => {
  return (
    <DefaultLayout>
      <Ajout_depense/>
    </DefaultLayout>
  );
};

export default ajout_depensePage;

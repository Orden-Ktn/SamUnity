import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Depot_epreuve from "@/components/Commun/Depot_epreuve";

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

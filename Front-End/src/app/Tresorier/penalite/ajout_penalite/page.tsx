import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Ajout_penalite from "@/components/Tresorier/Penalite/Ajout_penalite";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_penalitePage = () => {
  return (
    <DefaultLayout>
      <Ajout_penalite/>
    </DefaultLayout>
  );
};

export default ajout_penalitePage;

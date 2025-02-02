import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Ajout_enfant_samuel from "@/components/Commun/Enfant_samuel/Ajout_enfant_samuel";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_enfant_samuelPage = () => {
  return (
    <DefaultLayout>
      <Ajout_enfant_samuel/>
    </DefaultLayout>
  );
};

export default ajout_enfant_samuelPage;

import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Organisateur/Layouts/DefaultLaout";
import Ajout_activite from "@/components/Organisateur/Activites/Ajout_activite";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_activitePage = () => {
  return (
    <DefaultLayout>
      <Ajout_activite/>
    </DefaultLayout>
  );
};

export default ajout_activitePage;

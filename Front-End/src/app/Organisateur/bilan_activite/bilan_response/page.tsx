import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Organisateur/Layouts/DefaultLaout";
import Bilan_response from "@/components/Organisateur/Bilan_activite/bilan_response";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_bilan_responsePage = () => {
  return (
    <DefaultLayout>
      <Bilan_response/>
    </DefaultLayout>
  );
};

export default ajout_bilan_responsePage;

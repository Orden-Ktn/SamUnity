import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Ajout_participant from "@/components/Secretaire/Activites/Ajout_participant";


export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_participantPage = () => {
  return (
    <DefaultLayout>
      <Ajout_participant/>
    </DefaultLayout>
  );
};

export default ajout_participantPage;

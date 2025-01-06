import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
import Objectifs from "@/components/Coordonnateur/Objectifs/";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_objectifPage = () => {
  return (
    <DefaultLayout>
      <Objectifs/>
    </DefaultLayout>
  );
};

export default ajout_objectifPage;

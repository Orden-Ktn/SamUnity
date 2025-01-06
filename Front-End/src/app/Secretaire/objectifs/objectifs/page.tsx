import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Objectifs from "@/components/Secretaire/Objectifs/objectifs";

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

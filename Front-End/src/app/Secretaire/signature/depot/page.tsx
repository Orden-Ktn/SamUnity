import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Depot from "@/components/Secretaire/Signature/depot";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ajout_objectifPage = () => {
  return (
    <DefaultLayout>
      <Depot/>
    </DefaultLayout>
  );
};

export default ajout_objectifPage;

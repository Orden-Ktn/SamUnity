import DataStatsOne from "@/components/Coordonnateur/DataStats/DataStatsOne";
import ECommerce from "@/components/Formateur/Dashboard/E-commerce";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title:
    "SamUnity",

};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <DataStatsOne /> <br /><br />
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

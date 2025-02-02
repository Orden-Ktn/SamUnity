import ECommerce from "@/components/Coordonnateur/Dashboard/E-commerce";
import DataStatsOne from "@/components/Commun/DataStats/DataStatsOne";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
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

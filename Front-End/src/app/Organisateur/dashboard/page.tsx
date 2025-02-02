import DataStatsOne from "@/components/Commun/DataStats/DataStatsOne";
import ECommerce from "@/components/Organisateur/Dashboard/E-commerce";
import DefaultLayout from "@/components/Organisateur/Layouts/DefaultLaout";
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

import ECommerce from "@/components/Animateur/Dashboard/E-commerce";
import DefaultLayout from "@/components/Animateur/Layouts/DefaultLaout";
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
     
        <ECommerce />
      </DefaultLayout>
    </>
  );
}

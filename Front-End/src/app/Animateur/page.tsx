import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ECommerce from "@/components/Animateur/Dashboard/E-commerce";
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

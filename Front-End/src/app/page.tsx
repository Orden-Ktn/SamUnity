import Index from "@/components/Dashboard";
import { Metadata } from "next";
import React from "react";
<link rel="icon" href="/favicon.ico" />
export const metadata: Metadata = {
  title:
    "SamUnity",

};

export default function Home() {
  return (
    <>
        <Index />
    </>
  );
}

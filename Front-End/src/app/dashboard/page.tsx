"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";


const Index: React.FC = () => {
  return (
    <>
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />
        <Index />
      </div>
    </DefaultLayout>
    </>
  );
};

export default Index;


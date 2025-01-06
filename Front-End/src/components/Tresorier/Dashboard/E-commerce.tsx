"use client";
import React from "react";
import Image from "next/image";

const ECommerce: React.FC = () => {
  return (
    <>
      <Image
        src={"/images/logo2.jpeg"}
        alt="Logo"
        width={270}
        height={15}
        className="mx-auto rounded-full dark:opacity-30"
      />
    </>
  );
};

export default ECommerce;

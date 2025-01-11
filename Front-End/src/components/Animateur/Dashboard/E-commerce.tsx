"use client";
import React from "react";
import Image from "next/image";

const ECommerce: React.FC = () => {
  return (
    <><br />
    <Image
        src={"/images/logo2.jpeg"}
        alt="Logo"
        width={450}
        height={15}
        className="mx-auto dark:opacity-30 rounded-full"
      />            
    </>
  );
};

export default ECommerce;

import React from "react";
import Link from "next/link";
import { ButtonPropTypes } from "@/types/package";

const ButtonDefault: React.FC<ButtonPropTypes> = ({ label, link, customClasses, onClick }) => {
  return link ? (
    <Link href={link}>
      <a className={`${customClasses}`} onClick={onClick}>
        {label}
      </a>
    </Link>
  ) : (
    <button className={`${customClasses}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonDefault;

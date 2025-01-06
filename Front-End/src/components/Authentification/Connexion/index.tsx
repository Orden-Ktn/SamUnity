 "use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../Signin";

export default function Connexion() {
  return (
    <>
      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Vous n'avez pas de compte?{" "}
          <Link href="/Authentification/inscription" className="text-primary">
            Créez un compte
          </Link>
        </p>
      </div>
    </>
  );
}

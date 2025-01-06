"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ECommerce: React.FC = () => {
  const [activeYear, setActiveYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Appeler l'API Django pour récupérer l'année active
    const fetchActiveYear = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/app/annee-active/");
        if (!response.ok) {
          throw new Error("Erreur de récupération de l'année active");
        }
        const data = await response.json();
        setActiveYear(data.annee || "Non définie"); // Assurez-vous d'afficher 'Non définie' si l'année n'est pas trouvée
      } catch (error) {
        setError("Erreur lors de la récupération de l'année active");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchActiveYear();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Image
        src={"/images/logo2.jpeg"}
        alt="Logo"
        width={270}
        height={15}
        className="mx-auto dark:opacity-30 rounded-full"
      />
    </>
  );
};

export default ECommerce;

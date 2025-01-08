"use client";
import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
  niveau: string;
}

const Table = () => {
  const [enfant, setEnfant] = useState<Enfant[]>([]); // Stocker les résultats récupérés
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [erreurs, setErrors] = useState(""); // Pour afficher les erreurs
  const tableRef = useRef();

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const options = {
      margin: 10,
      filename: "liste_generale.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    const fetchEnfant = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_enfant/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data: Enfant[] = await response.json();
          console.log("Enfants récupérés :", data);
          setEnfant(data); // Stocker les enfants récupérés
        } else {
          setErrors("Erreur lors de la récupération des enfants.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchEnfant();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div
            ref={tableRef}
            className="flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1"
          >
            <h2 className="text-center text-lg font-semibold text-black">
              Paroisse Sainte Bernadette Soubirous de Hêvié Dodji <br />
              Liste Générale des Servants de Messe
            </h2>
            {loading ? (
              <p className="text-center text-dark">Chargement...</p>
            ) : erreurs ? (
              <p className="text-center text-red-500">{erreurs}</p>
            ) : enfant.length > 0 ? (
              <div>
                <table className="w-full border-collapse border border-[#ddd]">
                  <thead>
                    <tr className="">
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        N°
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Nom
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Prénom
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enfant
                      .sort((a, b) => {
                        // Trier d'abord par niveau, puis par nom
                        if (a.niveau < b.niveau) return -1;
                        if (a.niveau > b.niveau) return 1;
                        return a.nom.localeCompare(b.nom);
                      })
                      .map((item, index, array) => {
                        const isNewLevel =
                          index === 0 ||
                          item.niveau !== array[index - 1].niveau;

                        return (
                          <React.Fragment key={item.id}>
                            {/* Ajouter une ligne séparatrice si le niveau change */}
                            {isNewLevel && (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="border bg-blue-400 px-4 py-2 text-center text-black"
                                >
                                  {item.niveau}
                                </td>
                              </tr>
                            )}

                            {/* Ligne d'enfant */}
                            <tr>
                              <td className="border px-4 py-2 text-center text-black">
                                {index + 1}
                              </td>
                              <td className="border px-4 py-2 text-center text-black">
                                {item.nom}
                              </td>
                              <td className="border px-4 py-2 text-center text-black">
                                {item.prenom}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-dark">Aucune donnée trouvée.</p>
            )}

            <Image
              src={"/images/cachet_sg.png"}
              alt="Logo"
              width={250}
              height={5}
              className="mx-auto dark:opacity-30"
            />
          </div>

          <div className="flex flex-col">
            <button
              onClick={handleDownloadPDF}
              className="rounded-full bg-green px-10 py-3.5 text-white lg:px-8 xl:px-10"
            >
              Obtenir la version PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

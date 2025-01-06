"use client";
import React, { useState, useEffect } from "react";

type Annee = {
  id: number;
  annee: string;
  statut: string;
};

export default function Table() {
  const [annees, setAnnees] = useState<Annee[]>([]);

  useEffect(() => {
    fetchAnnees();
  }, []);

  const fetchAnnees = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/app/all_annees_pastorales/");
      const data = await response.json();
      setAnnees(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des années :", error);
    }
  };

  const activerAnnee = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/app/activer_annee_pastorale/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Année activée avec succès !");
        fetchAnnees();  // Rafraîchir la liste après activation
      } else {
        const data = await response.json();
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'activation :", error);
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="px-4 py-4 font-medium text-dark dark:text-white">Année pastorale</th>
              <th className="px-4 py-4 font-medium text-dark dark:text-white">Statut</th>
              <th className="px-4 py-4 font-medium text-dark dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {annees.map((annee) => (
              <tr key={annee.id}>
                <td className="px-4 py-4">{annee.annee}</td>
                <td className="px-4 py-4">
                  {annee.statut === "actif" ? (
                    <span className="rounded-[10px] px-10 py-3.5 text-green border border-green">Actif</span>
                  ) : (
                    <span className="rounded-[10px] px-10 py-3.5 text-red border border-red">Inactif</span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {annee.statut === "inactif" && (
                    <button
                      onClick={() => activerAnnee(annee.id)}
                      className="bg-green text-white rounded-[50px] px-10 py-3.5"
                    >
                      Activer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

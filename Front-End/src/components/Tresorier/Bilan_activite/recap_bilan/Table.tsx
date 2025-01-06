"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

interface Activite {
  id: number;
  intitule: string;
}

export default function Ajout_bilan() {
  const [formData, setFormData] = useState({
    activite: "",
    effectif: "",
    montant: "",
    benefice: "",
    perte: "",
  });
  const [erreurs, setErrors] = useState("");
  const [succès, setSuccess] = useState(false);
  const [activite, setActivite] = useState<Activite[]>([]);
  const [savedData, setSavedData] = useState<any[]>([]);

  useEffect(() => {
    fetchObjectifs();
  }, []);

  const fetchObjectifs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/app/all_point_activite/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedData(data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du contenu du point :",
        error,
      );
    }
  };
  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Activité
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Effectif
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Montant récolté
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Montant dépensé
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Bénéfice
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                  Perte
                </th>
              </tr>
            </thead>
            <tbody>
              {savedData.map((item) => (
                <tr key={item.id}>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">{item.activite}</h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">
                      {item.effectif}
                    </h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">
                      {item.montantrecolte}
                    </h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">
                      {item.montantdepense}
                    </h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">
                      {item.benefice}
                    </h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">
                      {item.perte}
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {savedData.length === 0 && (
            <p className="mt-4 text-center">Aucun point enregistré.</p>
          )}
        </div>
      </div>
    </>
  );
}

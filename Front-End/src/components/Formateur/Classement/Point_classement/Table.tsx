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
    nom: "",
    prenom: "",
    niveau: "",
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
        "http://localhost:8000/api/app/all_participant/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedData(data);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du contenu des participants :",
        error,
      );
    }
  };
  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-[#ddd] dark:border-dark-3">
  <thead>
    <tr className="bg-[#5b99f6] text-left dark:bg-dark-2">
      <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5"></th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
        Journée d'Excellence Vicariale
      </th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white"></th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white"></th>
    </tr>
  </thead>
  <thead>
    <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
      <th className="min-w-[220px] px-4 py-4 font-medium text-dark text-center dark:text-white xl:pl-7.5 border border-[#ddd] dark:border-dark-3">
        N°
      </th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark text-center dark:text-white border border-[#ddd] dark:border-dark-3">
        Nom
      </th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark text-center dark:text-white border border-[#ddd] dark:border-dark-3">
        Prénom
      </th>
      <th className="min-w-[120px] px-4 py-4 font-medium text-dark text-center dark:text-white border border-[#ddd] dark:border-dark-3">
        Niveau
      </th>
    </tr>
  </thead>
  <tbody>
  {savedData.map((item, index) => (
    <tr key={index} className="border-b border-[#ddd] dark:border-dark-3">
      <td className="px-4 py-4 xl:pl-7.5 border border-[#ddd] dark:border-dark-3">
        <h5 className="text-dark text-center dark:text-white">{index + 1}</h5>  {/* Incrément de 1 */}
      </td>
      <td className="px-4 py-4 xl:pl-7.5 border border-[#ddd] dark:border-dark-3">
        <h5 className="text-dark text-center dark:text-white">{item.nom}</h5>
      </td>
      <td className="px-4 py-4 xl:pl-7.5 border border-[#ddd] dark:border-dark-3">
        <h5 className="text-dark text-center dark:text-white">{item.prenom}</h5>
      </td>
      <td className="px-4 py-4 xl:pl-7.5 border border-[#ddd] dark:border-dark-3">
        <h5 className="text-dark text-center dark:text-white">{item.niveau}</h5>
      </td>
    </tr>
  ))}
</tbody>

</table>

          {savedData.length === 0 && (
            <p className="mt-4 text-center">Aucun participant enregistré.</p>
          )}
        </div>
      </div>
    </>
  );
}

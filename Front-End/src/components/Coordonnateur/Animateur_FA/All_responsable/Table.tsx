"use client";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [responsables, setresponsables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchresponsables = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/liste_responsable/",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setresponsables(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchresponsables();
  }, []);

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Nom & Prénom
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center">
                  Chargement...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="2" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : (
              responsables.map((resp, index) => (
                <tr key={index}>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">{resp.nom}</h5>
                  </td>

                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5`}
                  >
                    <h5 className="text-dark dark:text-white">{resp.statut}</h5>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {responsables.length === 0 && (
          <p className="mt-4 text-center">Aucun responsable enregistré.</p>
        )}
      </div>
    </div>
  );
};

export default Table;

"use client";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [benefice, setBenefice] = useState([]);
  const [totalBenefices, setTotalBenefices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBenefice = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/point-benefice/"
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        
        // Mise à jour des états
        setBenefice(data.benefices);  // Liste des pénalités
        setTotalBenefices(data.total_benefices);  // Total renvoyé par l'API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefice();
  }, []);

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Date
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Motif
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Montant (FCFA)
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Chargement...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : (
              benefice.map((benef, index) => (
                <tr key={index}>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                    <h5 className="text-dark dark:text-white">{benef.date}</h5>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                    <h5 className="text-dark dark:text-white">{benef.motif}</h5>
                  </td>
                  <td className="border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5">
                    <h5 className="text-dark dark:text-white">{benef.montant}</h5>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr className="bg-[#2ef52e] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Total des bénéfices
              </th>
              <th className="min-w-[220px] px-4 py-4"></th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                {totalBenefices.toLocaleString()} (FCFA)
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;

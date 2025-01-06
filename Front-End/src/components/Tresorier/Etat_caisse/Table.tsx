"use client";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";

const Table = () => {
  const [date, setDate] = useState("");
  const [montants, setMontant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const tableRef = useRef();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchdepenses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_montant/",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des montants");
        }
        const data = await response.json();
        setMontant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchdepenses();
  }, []);

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const options = {
      margin: 10,
      filename: 'rapport_financier.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div ref={tableRef} className="max-w-full overflow-x-auto">
      <h5 className="text-lg font-semibold text-center"> Etat de la caisse du&nbsp;{date}</h5><br />
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                Ancien solde 
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                Total des cotisations
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Total des bénéfices
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Total des pénalités
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Total des dépenses
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
                Nouveau solde
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Chargement...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : (
              montants.map((montant, index) => (
                <tr key={index}>
                  <td className={`bg-[orange] text-center dark:bg-dark-2 p-4`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.ancien_solde} FCFA
                    </h6>
                  </td>
                  <td className={`bg-[skyblue] text-center dark:bg-dark-2`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.total_cotisations} FCFA
                    </h6>
                  </td>
                  <td className={`bg-[yellow] text-center dark:bg-dark-2`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.total_benefices} FCFA
                    </h6>
                  </td>
                  <td className={`bg-[violet] text-center dark:bg-dark-2`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.total_penalites} FCFA
                    </h6>
                  </td>
                  <td className={`bg-[#f53131] text-center dark:bg-dark-2`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.total_depenses} FCFA
                    </h6>
                  </td>
                  <td className={`bg-[lawngreen] text-center dark:bg-dark-2`}>
                    <h6 className="text-dark dark:text-white">
                      {montant.nouveau_solde} FCFA
                    </h6>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <br />
        <Image
          src={"/images/cachet_tg.png"}
          alt="Logo"
          width={250}
          height={5}
          className="mx-auto dark:opacity-30"
        />
        
      </div>
      <div className="flex flex-col">
          <button
            onClick={handleDownloadPDF}
            className="bg-green text-white rounded-full px-10 py-3.5 lg:px-8 xl:px-10"
          >
            Télécharger PDF
          </button>
      </div>
    </div>
  );
};

export default Table;

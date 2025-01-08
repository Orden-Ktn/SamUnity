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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
      filename: "rapport_financier.pdf",
      image: { type: "jpeg, png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
      <div
        ref={tableRef}
        className="max-w-full overflow-x-auto rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5"
      >
        <h5 className="text-center text-lg font-semibold">
          {" "}
          Etat de la caisse du&nbsp;{date}
        </h5>
        <br />
        <table className="w-full table-auto">
          <div className="flex gap-6 ">
            <tbody className="w-1/2">
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
                    <tr>
                      <th className="min-w-[220px] bg-[orange] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Ancien <br /> solde
                      </th>
                      <td
                        className={`bg-[orange] p-4 dark:bg-dark-2`}
                      >
                        <h6 className="text-dark text-left dark:text-white">
                          {montant.ancien_solde} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <th className="min-w-[220px] bg-[skyblue] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Total des <br /> cotisations
                      </th>
                      <td className={`bg-[skyblue] dark:bg-dark-2`}>
                        <h6 className="text-dark text-left dark:text-white">
                          {montant.total_cotisations} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                  </tr>
                ))
              )}
            </tbody>

            <tbody className="w-1/2">
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
                    <tr>
                      <th className="min-w-[220px] bg-[#fbfb3acc] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Total des <br /> bénéfices
                      </th>
                      <td
                        className={`bg-[#fbfb3acc] p-4 text-left dark:bg-dark-2`}
                      >
                        <h6 className="text-dark  dark:text-white">
                          {montant.total_benefices} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <th className="min-w-[220px] bg-[violet] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Total des <br /> pénalités
                      </th>
                      <td className={`bg-[violet] text-center dark:bg-dark-2`}>
                        <h6 className="text-dark text-left dark:text-white">
                          {montant.total_penalites} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                  </tr>
                ))
              )}
            </tbody>

            <tbody className="w-1/2">
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
                    <tr>
                      <th className="min-w-[220px] bg-[#eb5353] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Total des <br /> dépenses
                      </th>
                      <td
                        className={`bg-[#eb5353] p-4 text-left dark:bg-dark-2`}
                      >
                        <h6 className="text-dark dark:text-white">
                          {montant.total_depenses} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <th className="min-w-[220px] bg-[lawngreen] px-4 py-4 font-medium text-dark text-left dark:text-white xl:pl-7.5">
                        Nouveau <br /> solde
                      </th>
                      <td
                        className={`bg-[lawngreen] text-left dark:bg-dark-2`}
                      >
                        <h6 className="text-dark dark:text-white">
                          {montant.nouveau_solde} <br /> FCFA
                        </h6>
                      </td>
                    </tr>
                  </tr>
                ))
              )}
            </tbody>
          </div>
        </table>
        <br />
        <Image
          src={"/images/cachet_tg.png"}
          alt="Logo"
          width={230}
          height={5}
          className="mx-auto dark:opacity-30"
        />
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleDownloadPDF}
          className="rounded-full bg-green px-10 py-3.5 text-white lg:px-8 xl:px-10"
        >
          Télécharger PDF
        </button>
      </div>
    </>
  );
};

export default Table;

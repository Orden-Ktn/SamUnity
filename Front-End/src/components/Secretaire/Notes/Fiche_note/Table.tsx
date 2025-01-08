"use client";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";

const Table = () => {
  const [niveau, setNiveau] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/app/voir_notes/?niveau=${niveau}`,
      );
      const data = await response.json();
      setResults(data); // Les résultats incluent directement les notes
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const options = {
      margin: 10,
      filename: "fiche_notes.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div className="flex flex-col gap-9">
        <form onSubmit={handleSearch}>
          <div className="rounded-[10px] border border-stroke bg-white shadow-1">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="relative">
                <label className="mb-3 block text-body-sm font-medium text-dark">
                  Etape/Grade
                </label>
                <select
                  name="niveau"
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className="w-full rounded-lg border border-stroke py-[13px] pl-6"
                >
                  <option value="">Sélectionnez l'étape ou le grade</option>
                  <option value="Postulat">Postulat</option>
                  <option value="Stage">Stage</option>
                  <option value="Acolytat">Acolytat</option>
                  <option value="Porte-bénitier">Porte-bénitier</option>
                  <option value="Céroféraire">Céroféraire</option>
                  <option value="Porte-Croix">Porte-Croix</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green p-2 text-white"
              >
                Vérifier
              </button>
            </div>
          </div>
        </form>

        <div ref={tableRef} className="rounded-[10px] border bg-white p-6.5">
          {loading ? (
            <p className="text-center text-dark">Chargement...</p>
          ) : results.length > 0 ? (
            <div>
              <h2 className="text-center text-lg font-semibold text-black">
                Paroisse Sainte Bernadette Soubirous de Hêvié Dodji <br />
                Fiche de notes {niveau}
              </h2>
              <br />
              <table className="w-full border-collapse border border-[#ddd]">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2 text-dark">Nom</th>
                    <th className="border px-4 py-2 text-dark">Prénom</th>
                    <th className="border px-4 py-2 text-dark">Option</th>
                    <th className="border px-4 py-2 text-dark">Notes</th>
                    <th className="border px-4 py-2 text-dark">Moyenne</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id}>
                      <td className="border px-4 py-2 text-center text-dark">
                        {result.nom}
                      </td>
                      <td className="border px-4 py-2 text-center text-dark">
                        {result.prenom}
                      </td>
                      <td className="border px-4 py-2 text-center text-dark">
                        {result.notes && result.notes.length > 0 ? (
                          <ul>
                            {result.notes.map((note, i) => (
                              <li key={i}>{note.option}</li>
                            ))}
                          </ul>
                        ) : (
                          "Aucune note"
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center text-dark">
                        {result.notes && result.notes.length > 0 ? (
                          <ul>
                            {result.notes.map((note, i) => (
                              <li key={i}>{note.note}</li>
                            ))}
                          </ul>
                        ) : (
                          "Aucune note"
                        )}
                      </td>
                      <td className="border px-4 py-2 text-center text-dark">
                        Interros :{" "}
                        <em className="font-bold">
                          {" "}
                          {result.moyenne_interro
                            ? result.moyenne_interro.toFixed(2)
                            : "N/A"}{" "}
                        </em>{" "}
                        <br />
                        Générale:{" "}
                        <em className="font-bold">
                          {" "}
                          {result.moyenne_generale
                            ? result.moyenne_generale.toFixed(2)
                            : "N/A"}{" "}
                        </em>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br />
              <p>
                NB: La moyenne des interrrogations est calculée avec les deux
                fortes notes d'interrogation.
              </p>
            </div>
          ) : (
            <p className="text-center text-dark">Aucune donnée trouvée.</p>
          )}

          <br />
          <Image
            src={"/images/cachet_formateur.png"}
            alt="Logo"
            width={250}
            height={5}
            className="mx-auto dark:opacity-30"
          />
        </div>

        <button
          onClick={handleDownloadPDF}
          className="rounded-full bg-green px-10 py-3.5 text-white"
        >
          Obtenir la version PDF
        </button>
      </div>
    </div>
  );
};

export default Table;

"use client";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

const Choice = () => {
  const [niveau, setNiveau] = useState(""); // Activité sélectionnée
  const [results, setResults] = useState([]); // Stocker les résultats
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const tableRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    console.log("Le bouton a été cliqué"); // Ajoutez un log pour confirmer l'appel de la fonction
    console.log(niveau); // Vérifiez la valeur de l'activité avant d'envoyer la requête
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/app/search_niveau/?niveau=${niveau}`,
      );
      const data = await response.json();
      console.log(data); // Vérifiez les résultats de l'API
      setResults(data);
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
      filename: "liste_enfants.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <form onSubmit={handleSearch}>
            {" "}
            {/* Utilisation de handleSearch pour la soumission du formulaire */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="relative">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Etape/Grade
                  </label>
                  <select
                    name="niveau"
                    value={niveau}
                    onChange={(e) => {
                      setNiveau(e.target.value);
                      console.log("Valeur sélectionnée :", e.target.value); // Vérifiez que la valeur est mise à jour
                    }}
                    className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 pr-100 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Sélectionnez l'étape ou le grade</option>
                    <option value="Postulat">Postulat</option>
                    <option value="Stage">Stage</option>
                    <option value="Acolytat">Acolytat</option>
                    <option value="Porte-Bénitier">Porte-Bénitier</option>
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

          {/* Affichage des résultats */}
          <div
            ref={tableRef}
            className="flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1"
          >
            {loading ? (
              <p className="text-center text-dark">Chargement...</p>
            ) : results.length > 0 ? (
              <div>
                <h2 className="text-center text-lg font-semibold text-black">
                  Paroisse Sainte Bernadette Soubirous de Hêvié Dodji{" "}
                </h2>
                <h5 className="text-center text-lg font-semibold text-black">
                  Liste des enfants {niveau}{" "}
                </h5>
                <br />
                <table className="w-full border-collapse border border-[#ddd]">
                  <thead>
                    <tr className="bg-gray-200">
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
                    {results.map((item, index) => (
                      <tr key={item.id}>
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
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-dark">
                Aucune donnée trouvée pour l'étape/grade.
              </p>
            )}
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

export default Choice;

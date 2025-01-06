"use client";
import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

interface Activite {
  id: number;
  intitule: string;
}

const Choice = () => {
  const [activity, setActivity] = useState(""); // Activité sélectionnée
  const [results, setResults] = useState([]); // Stocker les résultats
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [activite, setActivite] = useState<Activite[]>([]);
  const [erreurs, setErrors] = useState("");
  const [totalParticipants, setTotalParticipants] = useState<number>(0);  // Total comme nombre
  const [error, setError] = useState("");
  const tableRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/app/search/?activity=${activity}`
      );
      const data = await response.json();
      setResults(data);
      setTotalParticipants(data.length);  // Mettre à jour le total des participants
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
      filename: "liste_participants.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    const fetchActivite = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_activite/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data: Activite[] = await response.json();
          setActivite(data);
        } else {
          setErrors("Erreur lors de la récupération des activités.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      }
    };

    fetchActivite();
  }, []);

  // Recharger les participants lorsqu'une activité est sélectionnée
  useEffect(() => {
    if (!activity) return;
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/app/all_participant/?activity=${activity}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des participants");
        }
        const data = await response.json();
        setResults(data);
        setTotalParticipants(data.length);  // Calcul du total des participants
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [activity]);

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <form onSubmit={handleSearch}>
            <div className="rounded-[10px] border bg-white shadow-1">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="relative">
                  <label className="mb-3 block font-medium">
                    Activité
                  </label>
                  <select
                    name="activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full rounded-lg border bg-transparent py-[13px] pl-6 pr-10"
                  >
                    <option value="">Sélectionnez une activité</option>
                    {activite.map((activites) => (
                      <option key={activites.id} value={activites.intitule}>
                        {activites.intitule}
                      </option>
                    ))}
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
            className="flex flex-col gap-5.5 rounded-[10px] border bg-white p-6.5 shadow-1"
          >
            {loading ? (
              <p className="text-center">Chargement...</p>
            ) : results.length > 0 ? (
              <div>
                <h2 className="text-center text-dark text-lg font-semibold">
                  Paroisse Sainte Bernadette Soubirous de Hêvié Dodji <br />
                  Liste des participants {activity} <br />
                </h2>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2 text-dark">N°</th>
                      <th className="border px-4 py-2 text-dark">Nom</th>
                      <th className="border px-4 py-2 text-dark">Prénom</th>
                      <th className="border px-4 py-2 text-dark">Niveau</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border px-4 py-2 text-dark-900">{index + 1}</td>
                        <td className="border px-4 py-2 text-dark-900">{item.nom}</td>
                        <td className="border px-4 py-2 text-dark-900">{item.prenom}</td>
                        <td className="border px-4 py-2 text-dark-900">{item.niveau}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-center font-semibold py-2 text-dark">
                        Effectif Total : {totalParticipants}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-center">Aucune donnée trouvée.</p>
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

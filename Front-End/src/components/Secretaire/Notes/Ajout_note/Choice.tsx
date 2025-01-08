"use client";
import { useState, useRef } from "react";

const Choice = () => {
  const [niveau, setNiveau] = useState(""); // Activité sélectionnée
  const [results, setResults] = useState([]); // Stocker les résultats
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [notes, setNotes] = useState({}); // Stocker les notes par ligne
  const [options, setOptions] = useState({}); // Stocker les options par ligne
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleAdd = async (item, index) => {
    const selectedNote = notes[item.id] || "";
    const selectedOption = options[item.id] || "";

    if (!selectedOption || !selectedNote) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/app/ajout_note/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enfant_id: item.id,
            niveau: niveau,
            option: selectedOption,
            note: selectedNote,
          }),
        },
      );

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        console.log("Erreur de réponse du serveur :", data); // Ajoutez cette ligne
        setErrors(data.nom || "Erreur lors de l'ajout de la note.");
      }
    } catch (error) {
      setErrors(
        "Erreur de connexion au serveur. Veuillez réessayer plus tard.",
      );
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        {success && (
          <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5.5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-green">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-1 font-bold leading-[40px] text-[#004434] dark:text-[#34D399]">
                Note inscrite avec succès !
              </h5>
            </div>
          </div>
        )}

        {errors && (
          <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
            <div className="mr-5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-red-light">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.79566 0.722904L1.7963 0.723542L5.49396 4.43004L9.20434 0.737509L9.55768 1.09128L9.20498 0.736873L9.20473 0.737119C9.50233 0.440303 9.97913 0.440433 10.2766 0.737509C10.5745 1.03505 10.5745 1.51262 10.2766 1.81016L10.2759 1.81079L6.56578 5.5031L10.262 9.2081C10.2621 9.2082 10.2622 9.20831 10.2623 9.20841C10.5599 9.50598 10.5597 9.98331 10.262 10.2807L9.90861 9.92698L10.2619 10.2807C10.1232 10.4193 9.92253 10.5 9.73314 10.5C9.54375 10.5 9.34309 10.4193 9.20434 10.2807L9.55768 9.92698L9.20434 10.2807L5.49333 6.57425L1.7963 10.2801L1.79566 10.2808C1.65691 10.4193 1.45624 10.5 1.26686 10.5C1.07746 10.5 0.876797 10.4193 0.738054 10.2808L1.09139 9.92698L0.73805 10.2807C0.440426 9.98348 0.440145 9.50654 0.737209 9.20894C0.737489 9.20866 0.737769 9.20838 0.73805 9.2081L4.4215 5.50246L0.723428 1.79555C0.723302 1.79543 0.723176 1.7953 0.72305 1.79518Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </div>
            <div className="w-full">
              <h5 className="mb-2 font-bold leading-[22px] text-[#BC1C21]">
                Erreur lors de l'ajout de la note.
              </h5>
              <ul>
                <li className="text-[#CD5D5D]">{errors}</li>
              </ul>
            </div>
          </div>
        )}

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
          <div className="flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1">
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
                        Nom
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Prénom
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Option
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Note obtenue
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border px-4 py-2 text-center text-black">
                          {item.nom}
                        </td>
                        <td className="border px-4 py-2 text-center text-black">
                          {item.prenom}
                        </td>
                        <td className="border px-4 py-2 text-center text-black">
                          <select
                            name="niveau"
                            value={options[item.id] || ""}
                            onChange={(e) =>
                              setOptions({
                                ...options,
                                [item.id]: e.target.value,
                              })
                            }
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-2.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          >
                            <option value="">Options</option>
                            <option value="Interro 1">Interro 1</option>
                            <option value="Interro 2">Interro 2</option>
                            <option value="Interro 3">Interro 3</option>
                            <option value="Interro 4">Intero 4</option>
                            <option value="Interro 5">Interro 5</option>
                            <option value="Test 1">Test 1</option>
                            <option value="Test 2">Test 2</option>
                          </select>
                        </td>
                        <td className="border px-4 py-2 text-center text-black">
                          <input
                            type="number"
                            placeholder=""
                            name="note"
                            max={20}
                            min={0}
                            value={notes[item.id] || ""}
                            onChange={(e) =>
                              setNotes({ ...notes, [item.id]: e.target.value })
                            }
                            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-2.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                          />
                        </td>
                        <td className="border px-4 py-2 text-center text-black">
                          <button
                            onClick={() => handleAdd(item, index)}
                            className="w-full rounded-lg bg-orange-400 p-4 text-white"
                          >
                            Ajouter
                          </button>
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
        </div>
      </div>
    </>
  );
};

export default Choice;

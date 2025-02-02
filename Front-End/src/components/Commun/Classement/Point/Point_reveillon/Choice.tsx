"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

const Choice = () => {
  const [reveillon, setReveillon] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]); // Stocker les résultats
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Stocker les erreurs

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!reveillon || !date) {
      alert("Veuillez sélectionner les deux dates.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(
        `http://localhost:8000/api/app/search_classement_reveillon/?reveillon=${reveillon}&date=${date}`,
      );

      if (!response.ok) {
        throw new Error(
          await response.json().then((res) => res.error || "Erreur API"),
        );
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureImage = () => {
    const element = document.querySelector(".capture-section"); // La classe ou ID du div à capturer
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.download = "classement_reveillon.png"; // Nom du fichier
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <form onSubmit={handleSearch}>
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Réveillon
                    </label>
                    <select
                     name="reveillon"
                     value={reveillon}
                     onChange={(e) => setReveillon(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 pr-100 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Sélectionnez le réveillon</option>
                      <option value="De Noël">De Noël</option>
                      <option value="Du Nouvel An">Du Nouvel An</option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 pr-100 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
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
          <div className="capture-section flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1">
            {loading && <p className="text-center text-dark">Chargement...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            {results.length > 0 && (
              <div>
                <h2 className="text-center text-lg font-semibold text-black">
                  Paroisse Sainte Bernadette Soubirous de Hêvié Dodji <br />
                  Classement du Réveillon <span>{reveillon}</span> (<span>{date}</span>)
                </h2> <br />
                <div className="sm:p-7.5 max-w-full overflow-x-auto">
                <table className="w-full border-collapse border border-[#ddd] table-auto">
                  <thead>
                    <tr className="bg-blue-300">
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Heures
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Acolyte Principal
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Acolyte Secondaire
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Céroféraire 1
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Céroféraire 2
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Porte-Croix
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Thuriféraire
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Naviculaire
                      </th>
                    </tr>
                  </thead>
                  <tbody className="justify-center items-center">
                    {results.map((item, index) => (
                      <>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            {item.heure1}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap1}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as1} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ce1_1} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ce1_2} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc1}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.th1} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.na1} 
                          </td>
                        </tr>
                   
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            {item.heure2}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap2}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as2} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ce1_2} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ce2_2} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc2}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.th2} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.na2} 
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                </div>
                <br />
                <p className=" text-center text-lg font-thin text-black" style={{ fontFamily: "'Pacifico', cursive" }}>
                  <em>Parle Seigneur, ton serviteur écoute.</em>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              onClick={handleCaptureImage} // Ajout de l'événement pour capturer l'image
              className="rounded-full bg-green px-10 py-3.5 text-white lg:px-8 xl:px-10"
            >
              Télécharger en version image
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Choice;

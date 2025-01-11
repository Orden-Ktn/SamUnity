"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

const Choice = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [results, setResults] = useState([]); // Stocker les résultats
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Stocker les erreurs

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!date1 || !date2) {
      alert("Veuillez sélectionner les deux dates.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(
        `http://localhost:8000/api/app/search_classement_semaine/?date_debut=${date1}&date_fin=${date2}`,
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
        link.download = "classement_semaine.png"; // Nom du fichier
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
                      Période du
                    </label>
                    <input
                      type="date"
                      name="date1"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 pr-100 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Au
                    </label>
                    <input
                      type="date"
                      name="date2"
                      value={date2}
                      onChange={(e) => setDate2(e.target.value)}
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
                  Classement de la semaine du <span>{date1}</span> au <span>{date2}</span>
                </h2> <br />
                <table className="w-full border-collapse border border-[#ddd]">
                  <thead>
                    <tr className="bg-blue-300">
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Jours et Heures
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Acolyte Principal
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Acolyte Secondaire
                      </th>
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Porte-Croix
                      </th>
                    </tr>
                  </thead>
                  <tbody className="justify-center items-center">
                    {results.map((item, index) => (
                      <>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Lundi 6h30
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_lun_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_lun_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Lundi 19h00
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_lun_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_lun_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Mardi {item.mar_heure}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_mar}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_mar}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Mercredi {item.mer_heure}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_mer}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_mer}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Jeudi 6h30
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_jeu_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                             {item.as_jeu_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Vendredi {item.ven_heure}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_ven}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_ven}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Samedi 6h30
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_sam_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_sam_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            -
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Samedi 19h00
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_sam_19h00} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_sam_19h00}  
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc_sam_19h00}
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Dimanche 6h30
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_dim_6h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_dim_6h30} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc_dim_6h30}
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Dimanche 8h00
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_dim_8h00}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_dim_8h00} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc_dim_8h00}
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Dimanche 9h30
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_dim_9h30}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_dim_9h30} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc_dim_9h30}
                          </td>
                        </tr>
                        <tr key={item.id}>
                          <td className="bg-blue-300 font-bold border px-4 py-2 text-center text-black">
                            Dimanche 18h00
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.ap_dim_18h00}
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.as_dim_18h00} 
                          </td>
                          <td className="border px-4 py-2 text-center text-black">
                            {item.pc_dim_18h00}
                          </td>
                        </tr>
                        
                      </>
                    ))}
                  </tbody>
                </table>
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

"use client";
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

interface JeudiSaint {
  id: number;
  jeudi_saint_heure1: string;
  ap1_jeudi_saint: string;
  as1_jeudi_saint: string;
  pc1_jeudi_saint: string;
  ce1_jeudi_saint1: string;
  ce2_jeudi_saint1: string;
  th1_jeudi_saint: string;
  na1_jeudi_saint: string;
  jeudi_saint_heure2: string;
  ap2_jeudi_saint: string;
  as2_jeudi_saint: string;
  pc2_jeudi_saint: string;
  ce1_jeudi_saint2: string;
  ce2_jeudi_saint2: string;
  th2_jeudi_saint: string;
  na2_jeudi_saint: string;
}

interface VendrediSaint {
  id: number;
  ap_vendredi_saint: string;
  as_vendredi_saint: string;
  ce1_vendredi_saint: string;
  ce2_vendredi_saint: string;
}

interface SamediSaint {
  id: number;
  samedi_saint_heure: string;
  ap_samedi_saint: string;
  as_samedi_saint: string;
  pc_samedi_saint: string;
  pb_samedi_saint: string;
  ce1_samedi_saint: string;
  ce2_samedi_saint: string;
  th_samedi_saint: string;
  na_samedi_saint: string;
}

const Table = () => {
  const [jeudisaint, setJeudisaint] = useState<JeudiSaint[]>([]);
  const [samedisaint, setSamedisaint] = useState<SamediSaint[]>([]);
  const [vendredisaint, setVendredisaint] = useState<VendrediSaint[]>([]);
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [erreurs, setErrors] = useState(""); // Pour afficher les erreurs
  const tableRef = useRef();

  useEffect(() => {
    const fetchEnfant = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/search_classement_triduum/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data: JeudiSaint[] = await response.json();
          console.log("Infos récupérées :", data);
          setJeudisaint(data); // Stocker les enfants récupérés
        } else {
          setErrors("Erreur lors de la récupération des informations.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchEnfant();
  }, []);

  useEffect(() => {
    const fetchEnfant = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/search_classement_triduum/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data: SamediSaint[] = await response.json();
          console.log("Infos récupérées :", data);
          setSamedisaint(data); // Stocker les enfants récupérés
        } else {
          setErrors("Erreur lors de la récupération des informations.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchEnfant();
  }, []);

  useEffect(() => {
    const fetchEnfant = async () => {
      setLoading(true); // Démarrer le chargement
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/search_classement_triduum/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data: VendrediSaint[] = await response.json();
          console.log("Infos récupérées :", data);
          setVendredisaint(data); // Stocker les enfants récupérés
        } else {
          setErrors("Erreur lors de la récupération des informations.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchEnfant();
  }, []);

  const handleCaptureImage = () => {
    const element = document.querySelector(".capture-section"); // La classe ou ID du div à capturer
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.download = "classement_triduum_pascal.png"; // Nom du fichier
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="capture-section flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1">
            <h2 className="text-center text-lg font-semibold text-black">
              Paroisse Sainte Bernadette Soubirous de Hêvié Dodji <br />
              Classement du Triduum Pascal
            </h2>

            {/* Jeudi Saint */}
            {loading ? (
              <p className="text-center text-dark">Chargement...</p>
            ) : erreurs ? (
              <p className="text-center text-red-500">{erreurs}</p>
            ) : jeudisaint.length > 0 ? (
              <div>
              <div className="sm:p-7.5 max-w-full overflow-x-auto">
                <table className="w-full border-collapse border border-[#ddd] table-auto">
                  <thead>
                    <td
                      className="border border-[#ddd] bg-sky-300 px-4 py-2 text-center text-black"
                      colSpan={8}
                    >
                      Jeudi Saint
                    </td>
                  </thead>
                  <thead>
                    <tr className="">
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
                  <tbody>
                    {jeudisaint.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.jeudi_saint_heure1}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ap1_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.as1_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.pc1_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce1_jeudi_saint1}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce2_jeudi_saint1}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.th1_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.na1_jeudi_saint}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tbody>
                    {jeudisaint.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.jeudi_saint_heure1}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ap2_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.as2_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.pc2_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce1_jeudi_saint2}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce2_jeudi_saint2}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.th2_jeudi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.na2_jeudi_saint}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              </div>
            ) : (
              <p className="text-center text-dark">
                Aucune donnée trouvée le Jeudi Saint.
              </p>
            )}

            {/* Vendredi Saint */}
            {loading ? (
              <p className="text-center text-dark">Chargement...</p>
            ) : erreurs ? (
              <p className="text-center text-red-500">{erreurs}</p>
            ) : vendredisaint.length > 0 ? (
              <div>
                <div className="sm:p-7.5 max-w-full overflow-x-auto">
                <table className="w-full border-collapse border border-[#ddd table-auto]">
                  <thead>
                    <td
                      className="border border-[#ddd] bg-sky-300 px-4 py-2 text-center text-black"
                      colSpan={4}
                    >
                      Vendredi Saint
                    </td>
                  </thead>
                  <thead>
                    <tr className="">
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
                    </tr>
                  </thead>
                  <tbody>
                    {vendredisaint.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ap_vendredi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.as_vendredi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce1_vendredi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce2_vendredi_saint}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            ) : (
              <p className="text-center text-dark">
                Aucune donnée trouvée le Vendredi Saint.
              </p>
            )}

            {/* Samedi Saint */}
            {loading ? (
              <p className="text-center text-dark">Chargement...</p>
            ) : erreurs ? (
              <p className="text-center text-red-500">{erreurs}</p>
            ) : samedisaint.length > 0 ? (
              <div>
                <div className="sm:p-7.5 max-w-full overflow-x-auto">
                <table className="w-full border-collapse border border-[#ddd table-auto]">
                  <thead>
                    <td
                      className="border border-[#ddd] bg-sky-300 px-4 py-2 text-center text-black"
                      colSpan={9}
                    >
                      Samedi Saint
                    </td>
                  </thead>
                  <thead>
                    <tr className="">
                      <th className="border border-[#ddd] px-4 py-2 text-center text-black">
                        Heure
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
                        Porte-Bénitier
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
                  <tbody>
                    {samedisaint.map((item) => {
                      return (
                        <>
                          <tr>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.samedi_saint_heure}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ap_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.as_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.pb_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.pc_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce1_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.ce2_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.th_samedi_saint}
                            </td>
                            <td className="border px-4 py-2 text-center text-black">
                              {item.na_samedi_saint}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            ) : (
              <p className="text-center text-dark">
                Aucune donnée trouvée pour le Samedi Saint.
              </p>
            )}

            <p
              className=" text-center text-lg font-thin text-black"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              <em>Parle Seigneur, ton serviteur écoute.</em>
            </p>
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

export default Table;

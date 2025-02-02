"use client";
import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import Image from "next/image";

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
}

interface SG {
  id: number;
  nom: string;
}

const Choice = () => {
  const [enfant, setEnfant] = useState<Enfant[]>([]);
  const [sg, setSG] = useState<SG | null>(null); // SG est un objet unique
  const [selectedEnfant, setSelectedEnfant] = useState<string>(""); // Nom sélectionné
  const [error, setError] = useState<string>("");
  const tableRef = useRef();

  // Récupération des enfants
  useEffect(() => {
    const fetchEnfant = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_cathecumene/",
        );
        if (response.ok) {
          const data: Enfant[] = await response.json();
          setEnfant(data);
        } else {
          setError("Erreur lors de la récupération des enfants.");
        }
      } catch (error) {
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchEnfant();
  }, []);

  // Récupération du SG
  useEffect(() => {
    const fetchSG = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/app/sg/");
        if (response.ok) {
          const data: SG[] = await response.json();
          if (data.length > 0) {
            setSG(data[0]); // On suppose qu'il y a un seul SG actif
          }
        } else {
          setError("Erreur lors de la récupération du SG.");
        }
      } catch (error) {
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchSG();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEnfant(e.target.value);
  };

  const handleDownloadPDF = () => {
    const element = tableRef.current;
    const options = {
      margin: 10,
      filename: "attestation.pdf",
      image: { type: "jpeg", quality: 1.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div className="flex flex-col gap-9">
        {/* Formulaire */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="relative">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Nom & Prénom
              </label>
              <select
                name="nom"
                onChange={handleSelect}
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              >
                <option value="">Choisissez un enfant</option>
                {enfant.length > 0 ? (
                  enfant.map((enfants) => (
                    <option
                      key={enfants.id}
                      value={`${enfants.nom} ${enfants.prenom}`}
                    >
                      {enfants.nom} {enfants.prenom}
                    </option>
                  ))
                ) : (
                  <option value="">Aucun enfant enregistré</option>
                )}
              </select>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-5.5 rounded-[10px] bg-white p-6.5 shadow-1"
          ref={tableRef}
        >
          {selectedEnfant ? (
            <>
              <h2 className="text-center text-lg font-extralight text-dark">    
                <p
                  className="text-center text-lg font-semibold text-dark underline"
                  style={{ marginTop: "-30px", fontSize: "22px" }}
                >
                  <em>Attestation d'appartenance</em>
                </p>
              </h2>
              <p className="text-center text-dark" style={{ marginTop: "-10px"}}>
                Je soussigné
                <strong>
                  <em> {sg ? `${sg.nom}` : "SG"}</em>
                </strong>
                , Secrétaire Général du groupe des Samuel, atteste que le nommé{" "}
                <strong>
                  <em>{selectedEnfant}</em>
                </strong>{" "}
                est membre dudit groupe et prend part régulièrement aux
                activités. En foi de quoi, cette attestation lui est délivrée
                pour servir et valoir ce que de droit.
              </p>
            </>
          ) : (
            <p className="text-center text-dark">Aucun enfant sélectionné.</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="flex items-center justify-center space-x-70">
            <Image
              src={"/images/cachet_bureau.png"}
              alt="Logo"
              width={145}
              height={5}
              className="dark:opacity-30"
            />
            <strong>
              <em className="text-red">COMPOSITION 1</em>
            </strong>
          </div>
          <hr className="border-t-2 border-blue-500" />

          {selectedEnfant ? (
            <>
              <h2 className="text-center text-lg font-extralight text-dark">    
                <p
                  className="text-center text-lg font-semibold text-dark underline"
                  style={{ marginTop: "-22px", fontSize: "22px" }}
                >
                  <em>Attestation d'appartenance</em>
                </p>
              </h2>
              <p className="text-center text-dark" style={{ marginTop: "-10px"}}>
                Je soussigné
                <strong>
                  <em> {sg ? `${sg.nom}` : "SG"}</em>
                </strong>
                , Secrétaire Général du groupe des Samuel, atteste que le nommé{" "}
                <strong>
                  <em>{selectedEnfant}</em>
                </strong>{" "}
                est membre dudit groupe et prend part régulièrement aux
                activités. En foi de quoi, cette attestation lui est délivrée
                pour servir et valoir ce que de droit.
              </p>
            </>
          ) : (
            <p className="text-center text-dark">Aucun enfant sélectionné.</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="flex items-center justify-center space-x-70">
            <Image
              src={"/images/cachet_bureau.png"}
              alt="Logo"
              width={145}
              height={5}
              className="dark:opacity-30"
            />
            <strong>
              <em className="text-red">COMPOSITION 2</em>
            </strong>
          </div>
          <hr className="border-t-2 border-blue-500" />

          {selectedEnfant ? (
            <>
              <h2 className="text-center text-lg font-extralight text-dark">    
                <p
                  className="text-center text-lg font-semibold text-dark underline"
                  style={{ marginTop: "-22px", fontSize: "22px" }}
                >
                  <em>Attestation d'appartenance</em>
                </p>
              </h2>
              <p className="text-center text-dark" style={{ marginTop: "-10px"}}>
                Je soussigné
                <strong>
                  <em> {sg ? `${sg.nom}` : "SG"}</em>
                </strong>
                , Secrétaire Général du groupe des Samuel, atteste que le nommé{" "}
                <strong>
                  <em>{selectedEnfant}</em>
                </strong>{" "}
                est membre dudit groupe et prend part régulièrement aux
                activités. En foi de quoi, cette attestation lui est délivrée
                pour servir et valoir ce que de droit.
              </p>
            </>
          ) : (
            <p className="text-center text-dark">Aucun enfant sélectionné.</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="flex items-center justify-center space-x-70">
            <Image
              src={"/images/cachet_bureau.png"}
              alt="Logo"
              width={145}
              height={5}
              className="dark:opacity-30"
            />
            <strong>
              <em className="text-red">COMPOSITION 3</em>
            </strong>
          </div>
        </div>
        

        <div className="flex flex-col">
          <button
            onClick={handleDownloadPDF}
            className="rounded-full bg-green px-10 py-3.5 text-white lg:px-8 xl:px-10"
          >
            Télécharger en version PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choice;

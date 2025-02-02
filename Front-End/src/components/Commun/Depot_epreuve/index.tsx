"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";


// Exemple de définition des propriétés pour le bouton
type ButtonPropTypes = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customClasses: string;
};

const ButtonDefault: React.FC<ButtonPropTypes> = ({
  label,
  onClick,
  customClasses,
}) => {
  return (
    <button onClick={onClick} className={customClasses}>
      {label}
    </button>
  );
};

const Depot_epreuve = () => {
  const [formData, setFormData] = useState({
    epreuve: null,
    corrigeType: null,
    niveau: "",
    test: "",
  });
  const [message, setMessage] = useState(null);
  const [epreuves, setEpreuves] = useState([]);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);

  // Récupérer les fichiers enregistrés
  useEffect(() => {
    const fetchEpreuves = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_epreuves/",
        );
        if (response.ok) {
          const data = await response.json();
          setEpreuves(data);
        } else {
          console.error("Erreur lors de la récupération des épreuves.");
        }
      } catch (error) {
        console.error("Erreur serveur :", error);
      }
    };

    fetchEpreuves();
  }, []);

  const handleFileChange = (event, field) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFormData({ ...formData, [field]: files[0] });
    } else {
      setMessage({ type: "error", text: "Aucun fichier sélectionné." });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.epreuve || !formData.corrigeType) {
      setMessage({
        type: "error",
        text: "Veuillez sélectionner tous les fichiers.",
      });
      return;
    }

    const data = new FormData();
    data.append("epreuve", formData.epreuve);
    data.append("corrige_type", formData.corrigeType);
    data.append("niveau", formData.niveau);
    data.append("test", formData.test);

    try {
      const response = await fetch(
        "http://localhost:8000/api/app/depot_epreuve/",
        {
          method: "POST",
          body: data,
        },
      );

      if (response.ok) {
        setMessage({ type: "success", text: "Dépôt effectué avec succès!" });
        setSuccess(true);
        setFormData({ epreuve: null, corrigeType: null, niveau: "", test: "" });

        // Actualiser la liste des épreuves après l'ajout
        const updatedEpreuves = await fetch(
          "http://localhost:8000/api/app/all_epreuves/",
        );
        const newData = await updatedEpreuves.json();
        setEpreuves(newData);
      } else {
        const result = await response.json();
        setMessage({
          type: "error",
          text: "Erreur lors du dépôt.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur serveur." });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  

  return (
    <>
      <Breadcrumb pageName="Dépot d'épreuve" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-col gap-5.5 p-6.5">
              {message && (
                <div
                  className={`flex w-full rounded-[10px] border-l-6 ${
                    message.type === "success"
                      ? "border-green bg-green-light-7"
                      : "border-red-light bg-red-light-5"
                  } px-7 py-8`}
                >
                  <div className="mr-5.5 mt-[5px] flex h-8 w-8 items-center justify-center rounded-md bg-green">
                    {message.type === "success" ? "✔️" : "❌"}
                  </div>
                  <div className="w-full">
                    <h5
                      className={`mb-1 font-bold ${message.type === "success" ? "text-[#004434]" : "text-[#BC1C21]"}`}
                    >
                      {message.text}
                    </h5>
                  </div>
                </div>
              )}

              <div className="flex gap-6">
                <div className="w-1/2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Epreuve
                  </label>
                  <input
                    type="file"
                    name="epreuve"
                    onChange={(e) => handleFileChange(e, "epreuve")}
                    accept=".docx, .xlsx, .pdf"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-1/2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Corrigé-Type
                  </label>
                  <input
                    type="file"
                    name="corrige_type"
                    onChange={(e) => handleFileChange(e, "corrigeType")}
                    accept=".docx, .xlsx, .pdf"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="w-1/2">
                  <label
                    htmlFor="niveau"
                    className="mb-0.5 block font-medium text-dark dark:text-white"
                  >
                    Niveau
                  </label>
                  <select
                    name="niveau"
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Sélectionner le niveau</option>
                    <option value="Postulat">Postulat</option>
                    <option value="Stage">Stage</option>
                    <option value="Acolytat">Acolytat</option>
                    <option value="Porte-Bénitier">Porte-Bénitier</option>
                    <option value="Céroféraire">Céroféraire</option>
                    <option value="Porte-Croix">Porte-Croix</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="niveau"
                    className="mb-0.5 block font-medium text-dark dark:text-white"
                  >
                    Test
                  </label>
                  <select
                    name="test"
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Sélectionner le test</option>
                    <option value="1er Test">1er Test</option>
                    <option value="2nd Test">2nd Test</option>
                  </select>
                </div>
              </div>

              <ButtonDefault
                label="Valider"
                onClick={(e) => handleSubmit(e)}
                customClasses="bg-green text-white rounded-[5px] px-10 py-3.5 lg:px-8 xl:px-10"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Depot_epreuve;

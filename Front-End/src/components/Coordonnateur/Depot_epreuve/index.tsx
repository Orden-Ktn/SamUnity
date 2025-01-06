'use client';
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

// Exemple de définition des propriétés pour le bouton
type ButtonPropTypes = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customClasses: string;
};

const ButtonDefault: React.FC<ButtonPropTypes> = ({ label, onClick, customClasses }) => {
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
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFormData({ ...formData, [field]: files[0] });
    } else {
      setMessage({ type: 'error', text: "Aucun fichier sélectionné." });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, niveau: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.epreuve || !formData.corrigeType) {
      setMessage({ type: 'error', text: "Veuillez sélectionner tous les fichiers." });
      return;
    }

    const data = new FormData();
    data.append("epreuve", formData.epreuve);
    data.append("corrige_type", formData.corrigeType);
    data.append("niveau", formData.niveau);

    try {
      const response = await fetch("http://localhost:8000/api/app/depot_epreuve/", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: "Epreuve ajoutée avec succès!" });
        setFormData({ epreuve: null, corrigeType: null, niveau: "" }); // Reset du formulaire
      } else {
        const result = await response.json();
        console.error(result);
        setMessage({ type: 'error', text: "Erreur lors de l'ajout de l'épreuve." });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      setMessage({ type: 'error', text: "Erreur serveur." });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Dépot d'épreuve" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-col gap-5.5 p-6.5">
              {message && (
                <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                </div>
              )}

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Epreuve</label>
                <input
                  type="file"
                  name="epreuve"
                  onChange={(e) => handleFileChange(e, "epreuve")}
                  accept=".docx, .xlsx, .pdf"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Corrigé-Type</label>
                <input
                  type="file"
                  name="corrige_type"
                  onChange={(e) => handleFileChange(e, "corrigeType")}
                  accept=".docx, .xlsx, .pdf"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="niveau" className="mb-0.5 block font-medium text-dark dark:text-white">Niveau</label>
                <select
                  name="niveau"
                  onChange={handleSelectChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                >
                  <option value="">Sélectionner</option>
                  <option value="Postulat">Postulat</option>
                  <option value="Stage">Stage</option>
                  <option value="Acolytat">Acolytat</option>
                </select>
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
      
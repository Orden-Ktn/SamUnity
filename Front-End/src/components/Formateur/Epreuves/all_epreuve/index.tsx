"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

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

const Epreuve_recue = () => {
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
      <Breadcrumb pageName="Epreuves reçues" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
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

            {/* Section pour afficher les fichiers enregistrés */}
            <div className="flex flex-col gap-5.5 p-6.5">
              {epreuves.length > 0 ? (
                <table className="mt-4 w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-3">
                      <th className="border border-gray-300 px-4 py-2 text-center text-dark">
                        Niveau
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-dark">
                        Test
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-dark">
                        Épreuves
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-center text-dark">
                        Corrigés-types
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {epreuves.map((epreuve) => (
                      <tr key={epreuve.id}>
                        <td className="border border-gray-300 px-4 py-2 text-center text-dark">
                          {epreuve.niveau}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-dark">
                          {epreuve.test}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <a
                            href={`http://localhost:8000/api/app${epreuve.epreuve}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {epreuve.epreuve.split("/").pop()}
                          </a>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {epreuve.corrige_type ? (
                            <a
                              href={`http://localhost:8000/api/app${epreuve.corrige_type}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 underline"
                            >
                              {epreuve.corrige_type.split("/").pop()}
                            </a>
                          ) : (
                            <span className="text-gray-500">
                              Non disponible
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-dark">
                  Aucun fichier enregistré pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Epreuve_recue;

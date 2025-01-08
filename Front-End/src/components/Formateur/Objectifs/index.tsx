"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

export default function Ajout_objectif() {
  const [formData, setFormData] = useState({ objectif: "" });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [savedData, setSavedData] = useState<any[]>([]);

  useEffect(() => {
    fetchObjectifs();
  }, []);

  const fetchObjectifs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/app/all_objectifs_formation/");
      if (response.ok) {
        const data = await response.json();
        setSavedData(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs :", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/api/app/ajout_objectif_formation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ objectif: "" });
        fetchObjectifs();  // Rafraîchir la liste après ajout
      } else {
        const data = await response.json();
        setErrors(data.objectif || "Erreur lors de l'ajout des objectifs.");
      }
    } catch (error) {
      setErrors("Erreur de connexion au serveur.");
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajout Objectifs" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {success && (
            <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8">
              <h5 className="mb-1 font-bold text-[#004434]">
                Les objectifs ont été enregistrés !
              </h5>
            </div>
          )}

          {errors && (
            <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8">
              <h5 className="mb-2 font-bold text-[#BC1C21]">
                Erreur lors de l'ajout des objectifs.
              </h5>
              <p className="text-[#CD5D5D]">{errors}</p>
            </div>
          )}

          <div className="rounded-[10px] border border-stroke bg-white shadow-1">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark">
                    Contenu
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Saisissez votre objectif"
                    name="objectif"
                    value={formData.objectif}
                    onChange={handleChange}
                    className="w-full rounded-[7px] border-[1.5px] px-5.5 py-3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-green p-4 text-white"
                >
                  Ajouter
                </button>
              </div>
            </form>
            </div>


          {/* Tableau des objectifs */}
          <div className="flex flex-col gap-5.5 p-6.5 rounded-[10px] border border-stroke bg-white shadow-1">
            <h5 className="text-lg font-semibold">Objectifs enregistrés </h5>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-gray-300 px-4 py-2">Contenu des Objectifs</th>
                  </tr>
                </thead>
                <tbody>
                  {savedData.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">{item.objectif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {savedData.length === 0 && (
                <p className="mt-4 text-center">Aucun objectif enregistré.</p>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

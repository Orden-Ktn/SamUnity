"use client";

import React, { FormEvent, useState } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setErrors(""); // Réinitialise les erreurs si une nouvelle image est sélectionnée
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setErrors("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8000/api/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setErrors(""); // Réinitialise les erreurs
        alert("Signature téléchargée et enregistrée avec succès !");
      } else {
        const data = await response.json();
        setErrors(data.message || "Erreur inconnue lors du téléchargement.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la signature :", error);
      setErrors("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpload();
  };

  return (
    <>
      <Breadcrumb pageName="Dépôt de signature" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {success && (
            <div className="flex w-full rounded-[10px] border-l-6 border-green bg-green-light-7 px-7 py-8">
              <h5 className="mb-1 font-bold text-[#004434]">
                La signature a été enregistrée !
              </h5>
            </div>
          )}

          {errors && (
            <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8">
              <h5 className="mb-2 font-bold text-[#BC1C21]">
                Erreur lors du dépôt de la signature.
              </h5>
              <p className="text-[#CD5D5D]">{errors}</p>
            </div>
          )}

          <div className="rounded-[10px] border border-stroke bg-white shadow-1">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Signature
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUpload}
                  className="w-full rounded-lg bg-green p-4 text-white"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

"use client";
import React, { useState } from "react";

export default function SigninWithPassword() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    poste: "",
    mandature: "",
    password: "",
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/app/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setErrors(null);
        setFormData({
          nom: "",
          email: "",
          poste: "",
          mandature: "",
          password: "",
        });
      } else {
        const data = await response.json();
        setSuccess(false);
        setErrors(data.message || "Un problème est survenu");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
      setSuccess(false);
      setErrors("Erreur de connexion au serveur. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit px-3 text-center font-medium dark:bg-gray-dark">
          CRÉATION DE COMPTE
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

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
              Compte créée avec succès !
            </h5>
          </div>
        </div>
      )}

      {errors && (
        <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-red-light">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.79566 0.722904L1.7963 0.723542L5.49396 4.43004L9.20434 0.737509L9.55768 1.09128L9.20498 0.736873L9.20473 0.737119C9.50233 0.440303 9.97913 0.440433 10.2766 0.737509C10.5745 1.03505 10.5745 1.51262 10.2766 1.81016L10.2759 1.81079L6.56578 5.5031L10.262 9.2081C10.2621 9.2082 10.2622 9.20831 10.2623 9.20841C10.5599 9.50598 10.5597 9.98331 10.262 10.2807L9.90861 9.92698L10.2619 10.2807C10.1232 10.4193 9.92253 10.5 9.73314 10.5C9.54375 10.5 9.34309 10.4193 9.20434 10.2807L9.55768 9.92698L9.20434 10.2807L5.49333 6.57425L1.7963 10.2801L1.79566 10.2808C1.65691 10.4193 1.45624 10.5 1.26686 10.5C1.07746 10.5 0.876797 10.4193 0.738054 10.2808L1.09139 9.92698L0.73805 10.2807C0.440426 9.98348 0.440145 9.50654 0.737209 9.20894Z" fill="white" stroke="white" />
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-2 font-bold leading-[22px] text-[#BC1C21]">Erreur lors de l'inscription.</h5>
            <ul>
              <li className="text-[#CD5D5D]">{errors}</li>
            </ul>
          </div>
        </div>
      )}
<br />
      <div className="mb-4">

        <label className="mb-0.5 block font-medium text-dark dark:text-white">
          Nom & Prénom
        </label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Entrez votre nom et prénom"
          className="w-full rounded-lg border border-stroke py-[15px] pl-6 pr-11"
        />
      </div>

      <div className="mb-4">
        <label className="mb-0.5 block font-medium text-dark dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
          className="w-full rounded-lg border border-stroke py-[15px] pl-6 pr-11"
        />
      </div>

      <div className="mb-4">
        <label className="mb-0.5 block font-medium text-dark dark:text-white">
          Poste
        </label>
        <select
          name="poste"
          value={formData.poste}
          onChange={handleChange}
          className="w-full rounded-lg border border-stroke py-[15px] pl-6 pr-11"
        >
          <option value="">Sélectionnez votre poste</option>
          <option value="Coordonnateur">Coordonnateur</option>
          <option value="Formateur">Formateur</option>
          <option value="Secrétaire">Secrétaire</option>
          <option value="Initiateur">Initiateur</option>
          <option value="Trésorier">Trésorier</option>
          <option value="Organisateur">Organisateur</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-0.5 block font-medium text-dark dark:text-white">
          Mandature
        </label>
        <select
          name="mandature"
          value={formData.mandature}
          onChange={handleChange}
          className="w-full rounded-lg border border-stroke py-[15px] pl-6 pr-11"
        >
          <option value="">Sélectionnez votre mandature</option>
          <option value="2023-2025">2023-2025</option>
          <option value="2025-2027">2025-2027</option>
          <option value="2027-2029">2027-2029</option>
          <option value="2029-2031">2029-2031</option>
          <option value="2031-2033">2031-2033</option>
          <option value="2033-2035">2033-2035</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-dark dark:text-white">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
          className="w-full rounded-lg border border-stroke py-[15px] pl-6 pr-11"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary p-4 text-white"
      >
        S'inscrire
      </button>
    </form>
  );
}




"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React, { useState, useEffect } from "react";

interface Activite {
  id: number;
  intitule: string;
}

interface Enfant {
  id: number;
  nom: string;
  prenom: string;
}

export default function Ajout_bilan() {
  const [formData, setFormData] = useState({
    reveillon: "",
    date: "",
    heure1: "",
    ap1: "",
    as1: "",
    pc1: "",
    th1: "",
    na1: "",
    heure2: "",
    ap2: "",
    as2: "",
    pc2: "",
    th2: "",
    na2: "",
    ce1_1: "",
    ce2_1: "",
    ce1_2: "",
    ce2_2: "",
  });
  const [erreurs, setErrors] = useState("");
  const [succès, setSuccess] = useState(false);
  const [activite, setActivite] = useState<Activite[]>([]);
  const [enfant, setEnfant] = useState<Enfant[]>([]);

  useEffect(() => {
    const fetchEnfant = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_servant/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.ok) {
          const data: Enfant[] = await response.json();
          console.log("Enfants récupérés :", data);
          setEnfant(data);
        } else {
          setErrors("Erreur lors de la récupération des servants.");
        }
      } catch (error) {
        setErrors("Erreur de connexion au serveur.");
      }
    };

    fetchEnfant();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "nom") {
      const [nom, prenom] = value.split(","); // Divise la valeur en nom et prénom
      setFormData({ ...formData, nom, prenom }); // Met à jour séparément
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Soumission du formulaire :", formData); // Pour le débogage
    setErrors("");
    setSuccess(false);

    // Validation des champs
    if (!formData.date) {
      setErrors("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/app/ajout_classement_reveillons/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setSuccess(true);
        setFormData({
          reveillon: "",
          date: "",
          heure1: "",
          ap1: "",
          as1: "",
          pc1: "",
          heure2: "",
          ap2: "",
          as2: "",
          pc2: "",
          th1: "",
          na1: "",
          th2: "",
          na2: "",
          ce1_1: "",
          ce2_1: "",
          ce1_2: "",
          ce2_2: "",
        });
      } else {
        const data = await response.json();
        console.error("Réponse API :", data);
        setErrors(
          data.message ||
            JSON.stringify(data) ||
            "Erreur lors de l'ajout du classement.",
        );
      }
    } catch (error) {
      setErrors("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajout Classement du Réveillon" />

      {succès && (
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
              Classement enregistré !
            </h5>
          </div>
        </div>
      )}

      {erreurs && (
        <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-red-light">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.79566 0.722904L1.7963 0.723542L5.49396 4.43004L9.20434 0.737509L9.55768 1.09128L9.20498 0.736873L9.20473 0.737119C9.50233 0.440303 9.97913 0.440433 10.2766 0.737509C10.5745 1.03505 10.5745 1.51262 10.2766 1.81016L10.2759 1.81079L6.56578 5.5031L10.262 9.2081C10.2621 9.2082 10.2622 9.20831 10.2623 9.20841C10.5599 9.50598 10.5597 9.98331 10.262 10.2807L9.90861 9.92698L10.2619 10.2807C10.1232 10.4193 9.92253 10.5 9.73314 10.5C9.54375 10.5 9.34309 10.4193 9.20434 10.2807L9.55768 9.92698L9.20434 10.2807L5.49333 6.57425L1.7963 10.2801L1.79566 10.2808C1.65691 10.4193 1.45624 10.5 1.26686 10.5C1.07746 10.5 0.876797 10.4193 0.738054 10.2808L1.09139 9.92698L0.73805 10.2807C0.440426 9.98348 0.440145 9.50654 0.737209 9.20894C0.737489 9.20866 0.737769 9.20838 0.73805 9.2081L4.4215 5.50246L0.723428 1.79555C0.723302 1.79543 0.723176 1.7953 0.72305 1.79518Z"
                fill="white"
                stroke="white"
              />
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-2 font-bold leading-[22px] text-[#BC1C21]">
              Erreur lors de l'ajout du classement.
            </h5>
            <ul>
              <li className="text-[#CD5D5D]">{erreurs}</li>
            </ul>
          </div>
        </div>
      )}
      <br />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="flex gap-6">
                  <div className="w-1/2 ">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Réveillon
                    </label>
                    <select
                      name="reveillon"
                      value={formData.reveillon}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 pr-93 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Sélectionnez le réveillon</option>
                      <option value="De Noël">De Noël</option>
                      <option value="Du Nouvel An">Du Nouvel An</option>
                    </select>
                  </div>
                  <div className="w-1/2 ">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Date
                    </label>
                    <input
                      type="date"
                      placeholder=""
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <p className="block justify-center text-body-sm font-medium text-dark dark:text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-center">Messe de </span>
                    <div className="w-1/8">
                      <select
                        name="heure1"
                        value={formData.heure1}
                        onChange={handleChange}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-2 py-1 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      >
                        <option value=""> Heure</option>
                        <option value="19h00">19h00</option>
                        <option value="19h30">19h30</option>
                        <option value="20h00">20h00</option>
                      </select>
                    </div>
                  </div>
                </p>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <select
                      name="ap1"
                      value={formData.ap1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez l'AP</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <select
                      name="as1"
                      value={formData.as1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez l'AS</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <select
                      name="pc1"
                      value={formData.pc1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le PC</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Céroféraire 1
                    </label>
                    <select
                      name="ce1_1"
                      value={formData.ce1_1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le CE1</option>
                      <option value="-">-</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Céroféraire 2
                    </label>
                    <select
                      name="ce2_1"
                      value={formData.ce2_1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le CE2</option>
                      <option value="-">-</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Thuriféraire
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="th1"
                      value={formData.th1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Naviculaire
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="na1"
                      value={formData.na1}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <br />

                <p className="block justify-center text-body-sm font-medium text-dark dark:text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-center">Messe de </span>
                    <div className="w-1/8">
                      <select
                        name="heure2"
                        value={formData.heure2}
                        onChange={handleChange}
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-2 py-1 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      >
                        <option value="">Heure</option>
                        <option value="21h00">21h00</option>
                        <option value="21h30">21h30</option>
                        <option value="22h00">22h00</option>
                      </select>
                    </div>
                  </div>
                </p>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <select
                      name="ap2"
                      value={formData.ap2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez l'AP</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <select
                      name="as2"
                      value={formData.as2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez l'AS</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <select
                      name="pc2"
                      value={formData.pc2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le PC</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Céroféraire 1
                    </label>
                    <select
                      name="ce1_2"
                      value={formData.ce1_2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le CE1</option>
                      <option value="-">-</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Céroféraire 2
                    </label>
                    <select
                      name="ce2_2"
                      value={formData.ce2_2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Choisissez le CE2</option>
                      <option value="-">-</option>
                      {enfant.length > 0 ? (
                        enfant.map((enfants) => (
                          <option
                            key={enfants.id}
                            value={`${enfants.nom} ${enfants.prenom}`}
                          >
                            {enfants.nom} {enfants.prenom}{" "}
                          </option>
                        ))
                      ) : (
                        <option value="">Aucun enfant enregistré</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Thuriféraire
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="th2"
                      value={formData.th2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Naviculaire
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="na2"
                      value={formData.na2}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-green p-2 text-white"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

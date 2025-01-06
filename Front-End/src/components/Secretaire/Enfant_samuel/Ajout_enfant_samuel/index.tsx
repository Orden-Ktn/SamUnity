"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

export default function Ajout_bilan() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    niveau: "",
    niveau_etude: "",
    catechese: "",
  });
  const [erreurs, setErrors] = useState("");
  const [succès, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Soumission du formulaire :", formData); // Pour le débogage
    setErrors("");
    setSuccess(false);

    // Validation des champs
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.age ||
      !formData.niveau ||
      !formData.niveau_etude ||
      !formData.catechese
    ) {
      setErrors("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/app/ajout_enfant/",
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
          nom: "",
          prenom: "",
          age: "",
          niveau: "",
          niveau_etude: "",
          catechese: "",
        });
      } else {
        const data = await response.json();
        console.error("Réponse API :", data);
        setErrors(
          data.message ||
            JSON.stringify(data) ||
            "Erreur lors de l'ajout de l'enfant.",
        );
      }
    } catch (error) {
      setErrors("Erreur de connexion au serveur.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajout Enfant" />

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
              Enfant enregistré !
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
              Erreur lors de l'ajout de l'enfant.
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
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Nom
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Prénom
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Age
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Niveau d'étude
                    </label>
                    <select
                      name="niveau_etude"
                      value={formData.niveau_etude}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6  font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Sélectionnez un niveau d'étude</option>
                      <option
                        value="CE1"
                        className="text-body dark:text-bodydark"
                      >
                        CE1
                      </option>
                      <option
                        value="CE2"
                        className="text-body dark:text-bodydark"
                      >
                        CE2
                      </option>
                      <option
                        value="CM1"
                        className="text-body dark:text-bodydark"
                      >
                        CM1
                      </option>
                      <option
                        value="CM2"
                        className="text-body dark:text-bodydark"
                      >
                        CM2
                      </option>
                      <option
                        value="6ème"
                        className="text-body dark:text-bodydark"
                      >
                        6ème
                      </option>
                      <option
                        value="5ème"
                        className="text-body dark:text-bodydark"
                      >
                        5ème
                      </option>
                      <option
                        value="4ème"
                        className="text-body dark:text-bodydark"
                      >
                        4ème
                      </option>
                      <option
                        value="3ème"
                        className="text-body dark:text-bodydark"
                      >
                        3ème
                      </option>
                      <option
                        value="2nde"
                        className="text-body dark:text-bodydark"
                      >
                        2nde
                      </option>
                      <option
                        value="1ère"
                        className="text-body dark:text-bodydark"
                      >
                        1ère
                      </option>
                      <option
                        value="Tle"
                        className="text-body dark:text-bodydark"
                      >
                        Tle
                      </option>
                      <option
                        value="1ère année Université"
                        className="text-body dark:text-bodydark"
                      >
                        1ère année Université
                      </option>
                      <option
                        value="2ème année Université"
                        className="text-body dark:text-bodydark"
                      >
                        2ème année Université
                      </option>
                      <option
                        value="3ème année Université"
                        className="text-body dark:text-bodydark"
                      >
                        3ème année Université
                      </option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Etape/Grade
                    </label>
                    <select
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6  font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Sélectionnez un niveau</option>
                      <option
                        value="Postulat"
                        className="text-body dark:text-bodydark"
                      >
                        Postulat
                      </option>
                      <option
                        value="Stage"
                        className="text-body dark:text-bodydark"
                      >
                        Stage
                      </option>
                      <option
                        value="Acolytat"
                        className="text-body dark:text-bodydark"
                      >
                        Acolytat
                      </option>
                      <option
                        value="Porte-bénitier"
                        className="text-body dark:text-bodydark"
                      >
                        Porte-bénitier
                      </option>
                      <option
                        value="Céroféraire"
                        className="text-body dark:text-bodydark"
                      >
                        Céroféraire
                      </option>
                      <option
                        value="Porte-Croix"
                        className="text-body dark:text-bodydark"
                      >
                        Porte-Croix
                      </option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      En année de catéchèse?
                    </label>
                    <select
                      name="catechese"
                      value={formData.catechese}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6  font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Sélectionnez une réponse</option>
                      <option
                        value="Oui"
                        className="text-body dark:text-bodydark"
                      >
                        Oui
                      </option>
                      <option
                        value="Non"
                        className="text-body dark:text-bodydark"
                      >
                        Non
                      </option>
                    </select>
                  </div>
                </div>
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
      </form>
    </>
  );
}

// "use client";
// import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
// import ButtonDefault from "../../Buttons/ButtonDefault";
// import InputGroup from "../../InputGroup";

// const Ajout_enfant_samuel = () => {
//   return (
//     <>
//       <Breadcrumb pageName="Ajout Enfant" />

//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
//         <div className="flex flex-col gap-9">
//           <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
//             <div className="row gy-3">
//               <div className="p-6.5">
//                 <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
//                   <InputGroup
//                     label="Nom"
//                     type="text"
//                     placeholder=""
//                     customClasses="w-full xl:w-1/2"
//                   />

//                   <InputGroup
//                     label="Prénoms"
//                     type="text"
//                     placeholder=""
//                     customClasses="w-full xl:w-1/2"
//                   />
//                 </div>

//                 <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
//                   <InputGroup
//                     label="Niveau d'étude"
//                     type="text"
//                     placeholder=""
//                     customClasses="w-full xl:w-1/2"
//                   />

//                   <div className="relative">
//                     <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//                       Etape/Grade
//                     </label>
//                     <select
//                       name="name"
//                       className="w-full rounded-lg border border-stroke bg-transparent py-[13px] pl-6 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
//                     >
//                       <option
//                         value="Postulat"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Postulat
//                       </option>
//                       <option
//                         value="Stage"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Stage
//                       </option>
//                       <option
//                         value="Acolytat"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Acolytat
//                       </option>
//                       <option
//                         value="Porte-bénitier"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Porte-bénitier
//                       </option>
//                       <option
//                         value="Céroféraire"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Céroféraire
//                       </option>
//                       <option
//                         value="Porte-Croix"
//                         className="text-body dark:text-bodydark"
//                       >
//                         Porte-Croix
//                       </option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
//                   <InputGroup
//                     label="Age"
//                     type="text"
//                     placeholder=""
//                     customClasses="w-full xl:w-1/2"
//                   />

//                   <InputGroup
//                     label="Contact WhatsApp Parent(s)"
//                     type="tel"
//                     placeholder=""
//                     customClasses="w-full xl:w-1/2"
//                   />
//                 </div>

//                 <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
//                   <div className="col-md-6 w-full xl:w-1/2">
// <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
//   En année de catéchèse?
// </label>
// <label className="flex items-center space-x-2">
//   <input
//     type="radio"
//     name="catechese"
//     value="oui"
//     className="h-5 w-5 rounded-full border-stroke bg-transparent text-primary focus:ring-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:ring-primary"
//   />
//   <span className="text-dark dark:text-white">Oui</span>

//   <input
//     type="radio"
//     name="catechese"
//     value="non"
//     className="h-5 w-5 rounded-full border-stroke bg-transparent text-primary focus:ring-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:ring-primary"
//   />
//   <span className="text-dark dark:text-white">Non</span>
// </label>
//                   </div>
//                   <ButtonDefault
//                     label="Valider"
//                     link="#"
//                     customClasses="bg-green text-white px-10 py-3.5 lg:px-8 xl:px-10 w-full xl:w-1/2"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Ajout_enfant_samuel;

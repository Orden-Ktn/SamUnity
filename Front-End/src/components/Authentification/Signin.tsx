import React, { useState, useEffect } from "react";

export default function SigninWithPassword() {
  const [data, setData] = useState({ nom: '', poste: '', mandature: '', password: '' });
  const [erreurs, setErrors] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/app/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        setErrors("");  // Réinitialisation des erreurs
        switch (result.poste) {
          case "Coordonnateur":
            window.location.href = "/Coordonnateur/dashboard";
            break;
          case "Formateur":
            window.location.href = "/Formateur/dashboard";
            break;
          case "Secrétaire":
            window.location.href = "/Secretaire/dashboard";
            break;
          case "Initiateur":
            window.location.href = "/Formateur/dashboard";
            break;
          case "Trésorier":
            window.location.href = "/Tresorier/dashboard";
            break;
          case "Organisateur":
            window.location.href = "/Organisateur/dashboard";
            break;
          default:
            window.location.href = "/dashboard";
        }
      } else {
        setErrors(result.detail || "Échec de la connexion. Les identifiants ne sont pas corrects.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setErrors("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-6 flex items-center justify-center">
        
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit px-3 text-center font-medium dark:bg-dark-gray">
          CONNEXION
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
      {erreurs && (
        <div className="flex w-full rounded-[10px] border-l-6 border-red-light bg-red-light-5 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="mr-5 mt-[5px] flex h-8 w-8 items-center justify-center rounded-md bg-red-light">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.79566 0.722904L5.49396 4.43004L9.20434 0.737509L10.2766 1.81016L6.56578 5.5031L10.262 9.2081L9.20434 10.2807L5.49333 6.57425L1.79566 10.2808L0.738054 9.2081L4.4215 5.50246L0.723428 1.79555L1.79566 0.722904Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="w-full">
            <h5 className="mb-2 font-bold leading-[15px] text-[#BC1C21]">Echec de la connexion</h5>
            <ul>
              <li className="text-[#CD5D5D]">{erreurs}</li>
            </ul>
          </div>
        </div>
      )}
<br />
      <div className="mb-4">
        <label htmlFor="nom" className="mb-0.5 block font-medium text-dark dark:text-white">
          Nom & Prénom
        </label>
        <input
          type="text"
          placeholder="Entrez votre nom"
          name="nom"
          className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          onChange={(e) => setData({ ...data, nom: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="poste" className="mb-0.5 block font-medium text-dark dark:text-white">
          Poste
        </label>
        <div className="relative">
          <select
            name="poste"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setData({ ...data, poste: e.target.value })}
          >
            <option >Sélectionnez votre poste</option>
            <option value="Coordonnateur">Coordonnateur</option>
            <option value="Formateur">Formateur</option>
            <option value="Secrétaire">Secrétaire</option>
            <option value="Initiateur">Initiateur</option>
            <option value="Trésorier">Trésorier</option>
            <option value="Organisateur">Organisateur</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="poste" className="mb-0.5 block font-medium text-dark dark:text-white">
          Mandature
        </label>
        <div className="relative">
          <select
            name="mandature"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            onChange={(e) => setData({ ...data, mandature: e.target.value })}
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
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="mb-0.5 block font-medium text-dark dark:text-white">
          Mot de passe
        </label>
        <input
          type="password"
          placeholder="Entrez votre mot de passe"
          name="password"
          className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green p-4 font-medium text-white transition hover:bg-opacity-90"
      >
        Se Connecter
      </button>
    </form>
  );
}
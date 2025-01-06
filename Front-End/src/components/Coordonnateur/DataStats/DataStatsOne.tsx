"use client";
import { useEffect, useState } from "react";

const Table = () => {
  const [date, setDate] = useState("");
  const [montants, setMontant] = useState([]);
  const [enfants, setEnfant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalEnfants, setTotalEnfants] = useState(0); // État pour stocker le total
  const [totalFA, setTotalFA] = useState(0);
  const [activeYear, setActiveYear] = useState<string>("");


  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const fetchDepenses = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_montant/",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des montants");
        }
        const data = await response.json();
        setMontant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepenses();
  }, []);

  useEffect(() => {
    const fetchEnfants = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/app/all_enfant/",
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des enfants");
        }
        const data = await response.json();
        setEnfant(data);
        setTotalEnfants(data.length); // Calcul du total des enfants
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnfants(); 
  }, []);

  useEffect(() => {
    const fetchFA = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/app/all_fa/");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des FA");
        }
        const data = await response.json();

        setTotalFA(data.length); // Compte le nombre de FA
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFA();
  }, []);
  
    useEffect(() => {
      // Appeler l'API Django pour récupérer l'année active
      const fetchActiveYear = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/api/app/annee-active/",
          );
          if (!response.ok) {
            throw new Error("Erreur de récupération de l'année active");
          }
          const data = await response.json();
          setActiveYear(data.annee || "Non définie"); // Assurez-vous d'afficher 'Non définie' si l'année n'est pas trouvée
        } catch (error) {
          setError("Erreur lors de la récupération de l'année active");
        } finally {
          setLoading(false); // Fin du chargement
        }
      };
  
      fetchActiveYear();
    }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="bg-yellow-400">
          <div className="mt-6 flex items-end justify-between">
            {loading ? (
              <h6 className="text-dark dark:text-white">Chargement...</h6>
            ) : error ? (
              <h6 className="text-red-500 dark:text-white">{error}</h6>
            ) : (
              <h6 className="text-center text-dark dark:text-white sm:p-10.5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <h5 className="text-center text-heading-6 font-semibold">
                  Année Pastorale
                </h5>
                <br />
                <em> {activeYear} </em>
              </h6>
            )}
          </div>
        </div>

        <div className="bg-gray-400">
          <div className="mt-6 flex items-end justify-between">
            {loading ? (
              <h6 className="text-dark dark:text-white">Chargement...</h6>
            ) : error ? (
              <h6 className="text-red-500 dark:text-white">{error}</h6>
            ) : (
              <h6 className="text-center text-dark dark:text-white sm:p-10.5 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <h5 className="text-center text-heading-6 font-semibold">
                  Effectif enfants
                </h5>
                <br />
                <em> {totalEnfants} </em>
              </h6>
            )}
          </div>
        </div>

        <div className="bg-green-400">
          <div className="mt-6 flex items-end justify-between">
            {loading ? (
              <h6 className="text-dark dark:text-white">Chargement...</h6>
            ) : error ? (
              <h6 className="text-red-500 dark:text-white">{error}</h6>
            ) : (
              montants.map((montant, _index) => (
                <h6
                  key={_index}
                  className="text-center text-dark dark:text-white sm:p-10.5"
                >
                  <h5 className="text-center text-heading-6 font-semibold">
                    Nombre de FA
                  </h5>
                  <br />
                  <em> {totalFA} </em>
                </h6>
              ))
            )}
          </div>
        </div>

        <div className="bg-orange-400">
          <div className="mt-6 flex items-end justify-between">
            {loading ? (
              <h6 className="text-dark dark:text-white">Chargement...</h6>
            ) : error ? (
              <h6 className="text-red-500 dark:text-white">{error}</h6>
            ) : (
              montants.map((montant, _index) => (
                <h6
                  key={_index}
                  className="text-center text-dark dark:text-white sm:p-10.5"
                >
                  <h5 className="text-center text-heading-6 font-semibold">
                    Solde Courant
                  </h5>
                  <br />
                  <em> {montant.nouveau_solde} FCFA </em>
                </h6>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";

export default function Ajout_objectif() {
  const [formData, setFormData] = useState({ objectif: "" });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState(false);
  const [savedDataTG, setSavedDataTG] = useState<any[]>([]);
  const [savedDataOG, setSavedDataOG] = useState<any[]>([]);
  const [savedDataSG, setSavedDataSG] = useState<any[]>([]);
  const [savedDataFO, setSavedDataFO] = useState<any[]>([]);

  useEffect(() => {
    fetchObjectifsTG();
    fetchObjectifsOG();
    fetchObjectifsSG();
    fetchObjectifsFO();
  }, []);

  const fetchObjectifsOG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/app/all_objectifs_organisation/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedDataOG(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs de l'organisation:", error);
    }
  };

  const fetchObjectifsFO = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/app/all_objectifs_formation/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedDataFO(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs de la formation:", error);
    }
  };

  const fetchObjectifsSG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/app/all_objectifs_secretariat/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedDataSG(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs du secrétariat:", error);
    }
  };

  const fetchObjectifsTG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/app/all_objectifs_tresorerie/",
      );
      if (response.ok) {
        const data = await response.json();
        setSavedDataTG(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des objectifs de la trésorerie:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Les Objectifs de l'Année Pastorale" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* Tableau des objectifs */}

          <div className="flex flex-col gap-5.5 rounded-[10px] border border-stroke bg-white p-6.5 shadow-1">
          <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Contenu des Objectifs de la Formation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedDataFO.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.objectif}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {savedDataFO.length === 0 && (
                <p className="mt-4 text-center">Aucun objectif enregistré.</p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Contenu des Objectifs du Secrétariat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedDataSG.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.objectif}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {savedDataSG.length === 0 && (
                <p className="mt-4 text-center">Aucun objectif enregistré.</p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Contenu des Objectifs de la Trésorerie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedDataTG.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.objectif}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {savedDataTG.length === 0 && (
                <p className="mt-4 text-center">Aucun objectif enregistré.</p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border border-gray-300 px-4 py-2">
                      Contenu des Objectifs de l'Organisation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedDataOG.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.objectif}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {savedDataOG.length === 0 && (
                <p className="mt-4 text-center">Aucun objectif enregistré.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "../ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg
            className="text- fill-current text-dark-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00009 17.2498C8.58588 17.2498 8.25009 17.5856 8.25009 17.9998C8.25009 18.414 8.58588 18.7498 9.00009 18.7498H15.0001C15.4143 18.7498 15.7501 18.414 15.7501 17.9998C15.7501 17.5856 15.4143 17.2498 15.0001 17.2498H9.00009Z"
              fill=""
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 1.25C11.2749 1.25 10.6134 1.44911 9.88928 1.7871C9.18832 2.11428 8.37772 2.59716 7.36183 3.20233L5.90622 4.06943C4.78711 4.73606 3.89535 5.26727 3.22015 5.77524C2.52314 6.29963 1.99999 6.8396 1.65907 7.55072C1.31799 8.26219 1.22554 9.0068 1.25519 9.87584C1.2839 10.717 1.43105 11.7397 1.61556 13.0219L1.90792 15.0537C2.14531 16.7036 2.33368 18.0128 2.61512 19.0322C2.90523 20.0829 3.31686 20.9169 4.05965 21.5565C4.80184 22.1956 5.68984 22.4814 6.77634 22.6177C7.83154 22.75 9.16281 22.75 10.8423 22.75H13.1577C14.8372 22.75 16.1685 22.75 17.2237 22.6177C18.3102 22.4814 19.1982 22.1956 19.9404 21.5565C20.6831 20.9169 21.0948 20.0829 21.3849 19.0322C21.6663 18.0129 21.8547 16.7036 22.0921 15.0537L22.3844 13.0219C22.569 11.7396 22.7161 10.717 22.7448 9.87584C22.7745 9.0068 22.682 8.26219 22.3409 7.55072C22 6.8396 21.4769 6.29963 20.7799 5.77524C20.1047 5.26727 19.2129 4.73606 18.0938 4.06943L16.6382 3.20233C15.6223 2.59716 14.8117 2.11428 14.1107 1.7871C13.3866 1.44911 12.7251 1.25 12 1.25ZM8.09558 4.51121C9.15309 3.88126 9.89923 3.43781 10.5237 3.14633C11.1328 2.86203 11.5708 2.75 12 2.75C12.4293 2.75 12.8672 2.86203 13.4763 3.14633C14.1008 3.43781 14.8469 3.88126 15.9044 4.51121L17.2893 5.33615C18.4536 6.02973 19.2752 6.52034 19.8781 6.9739C20.4665 7.41662 20.7888 7.78294 20.9883 8.19917C21.1877 8.61505 21.2706 9.09337 21.2457 9.82469C21.2201 10.5745 21.0856 11.5163 20.8936 12.8511L20.6148 14.7884C20.3683 16.5016 20.1921 17.7162 19.939 18.633C19.6916 19.5289 19.3939 20.0476 18.9616 20.4198C18.5287 20.7926 17.9676 21.0127 17.037 21.1294C16.086 21.2486 14.8488 21.25 13.1061 21.25H10.8939C9.15124 21.25 7.91405 21.2486 6.963 21.1294C6.03246 21.0127 5.47129 20.7926 5.03841 20.4198C4.60614 20.0476 4.30838 19.5289 4.06102 18.633C3.80791 17.7162 3.6317 16.5016 3.3852 14.7884L3.10643 12.851C2.91437 11.5163 2.77991 10.5745 2.75432 9.82469C2.72937 9.09337 2.81229 8.61505 3.01167 8.19917C3.21121 7.78294 3.53347 7.41662 4.12194 6.9739C4.72482 6.52034 5.54643 6.02973 6.71074 5.33615L8.09558 4.51121Z"
              fill=""
            />
          </svg>
        ),
        label: "Dashboard",
        route: "/Tresorier/dashboard",
      },
      {
        icon: (
          <svg
            className="fill-current text-yellow-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.75C6.61522 2.75 2.25 7.11522 2.25 12.5C2.25 17.8848 6.61522 22.25 12 22.25C17.3848 22.25 21.75 17.8848 21.75 12.5C21.75 7.11522 17.3848 2.75 12 2.75ZM12 20.75C7.61522 20.75 4.25 17.3848 4.25 12.5C4.25 7.61522 7.61522 4.25 12 4.25C16.3848 4.25 19.75 7.61522 19.75 12.5C19.75 17.3848 16.3848 20.75 12 20.75ZM12.75 8.5C12.75 8.08579 12.4142 7.75 12 7.75C11.5858 7.75 11.25 8.08579 11.25 8.5V11.25H8.5C8.08579 11.25 7.75 11.5858 7.75 12C7.75 12.4142 8.08579 12.75 8.5 12.75H11.25V15.5C11.25 15.9142 11.5858 16.25 12 16.25C12.4142 16.25 12.75 15.9142 12.75 15.5V12.75H15.5C15.9142 12.75 16.25 12.4142 16.25 12C16.25 11.5858 15.9142 11.25 15.5 11.25H12.75V8.5Z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Gestion des cotisation",
        route: "#",
        children: [
          {
            label: "Ajout cotisation Enfant",
            route: "/Tresorier/cotisation/ajout_cotisation",
          },
          {
            label: "Point des cotisations Enfant",
            route: "/Tresorier/cotisation/point_cotisation",
          },
          {
            label: "Ajout cotisation Animateur",
            route: "/Tresorier/cotisation_animateur/ajout_cotisation",
          },
          {
            label: "Point des cotisations Animateur",
            route: "/Tresorier/cotisation_animateur/point_cotisation",
          },
        ],
      },

      
      {
        icon: (
          <svg
          className="fill-current text-purple-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
   
          <circle cx="7" cy="8" r="2" fill="currentColor"/>
          <path d="M5 10.5c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v2H5v-2z" fill="currentColor"/>
          
          <circle cx="14" cy="8" r="2" fill="currentColor"/>
          <path d="M12 10.5c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v2h-4v-2z" fill="currentColor"/>

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 16.75c0-.414.336-.75.75-.75h10.69l-1.72-1.72a.75.75 0 011.06-1.06l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H4.75a.75.75 0 01-.75-.75z"
            fill="currentColor"
          />
        </svg>
        ),
        label: "Gestion des pénalités",
        route: "#",
        children: [
          {
            label: "Ajout pénalité",
            route: "/Tresorier/penalite/ajout_penalite",
          },
          {
            label: "Point des pénalités",
            route: "/Tresorier/penalite/point_penalite",
          },
        ],
      },

      {
        icon: (
          <svg
            className="fill-current text-green-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 3.75C4.41421 3.75 4.75 4.08579 4.75 4.5V18.25H19.5C19.9142 18.25 20.25 18.5858 20.25 19C20.25 19.4142 19.9142 19.75 19.5 19.75H4C3.58579 19.75 3.25 19.4142 3.25 19V4.5C3.25 4.08579 3.58579 3.75 4 3.75ZM19.5303 6.46967C19.8232 6.76256 19.8232 7.23744 19.5303 7.53033L14.5303 12.5303C14.3897 12.671 14.1989 12.75 14 12.75H11C10.5858 12.75 10.25 12.4142 10.25 12C10.25 11.5858 10.5858 11.25 11 11.25H13.6893L18.4697 6.46967C18.7626 6.17678 19.2374 6.17678 19.5303 6.46967Z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Gestion des bénéfices",
        route: "#",
        children: [
          {
            label: "Ajout bénéfice",
            route: "/Tresorier/benefice/ajout_benefice",
          },
          {
            label: "Point des bénéfices",
            route: "/Tresorier/benefice/point_benefice",
          },
        ],
      },

      {
        icon: (
          <svg
            className="fill-current text-red-500" // Rouge pour symboliser une dépense ou une diminution
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 3.75C20.4142 3.75 20.75 4.08579 20.75 4.5V19C20.75 19.4142 20.4142 19.75 20 19.75H4C3.58579 19.75 3.25 19.4142 3.25 19C3.25 18.5858 3.58579 18.25 4 18.25H19.25V4.5C19.25 4.08579 19.5858 3.75 20 3.75ZM10.4697 16.5303C10.1768 16.8232 9.7019 16.8232 9.40899 16.5303L5.40899 12.5303C5.1161 12.2374 5.1161 11.7626 5.40899 11.4697L9.40899 7.46967C9.7019 7.17678 10.1768 7.17678 10.4697 7.46967C10.7626 7.76256 10.7626 8.23744 10.4697 8.53033L7.93934 11.0607H16C16.4142 11.0607 16.75 11.3965 16.75 11.8107C16.75 12.2249 16.4142 12.5607 16 12.5607H7.93934L10.4697 15.4697C10.7626 15.7626 10.7626 16.2374 10.4697 16.5303Z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Gestion des dépenses",
        route: "#",
        children: [
          { label: "Ajout dépense", route: "/Tresorier/depense/ajout_depense" },
          {
            label: "Point des dépenses",
            route: "/Tresorier/depense/point_depense",
          },
        ],
      },

      {
        icon: (
          <svg
            className="fill-current text-teal-700"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 3.75C3.58579 3.75 3.25 4.08579 3.25 4.5V19.5C3.25 19.9142 3.58579 20.25 4 20.25H20C20.4142 20.25 20.75 19.9142 20.75 19.5V4.5C20.75 4.08579 20.4142 3.75 20 3.75H4ZM5.25 5.25H18.75V18.75H5.25V5.25ZM8 14C8 13.5858 8.33579 13.25 8.75 13.25H15.25C15.6642 13.25 16 13.5858 16 14C16 14.4142 15.6642 14.75 15.25 14.75H8.75C8.33579 14.75 8 14.4142 8 14ZM8 11C8 10.5858 8.33579 10.25 8.75 10.25H15.25C15.6642 10.25 16 10.5858 16 11C16 11.4142 15.6642 11.75 15.25 11.75H8.75C8.33579 11.75 8 11.4142 8 11ZM8 8C8 7.58579 8.33579 7.25 8.75 7.25H15.25C15.6642 7.25 16 7.58579 16 8C16 8.41421 15.6642 8.75 15.25 8.75H8.75C8.33579 8.75 8 8.41421 8 8Z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Bilan d'activité",
        route: "#",
        children: [
          {
            label: "Ajout du point",
            route: "/Tresorier/bilan_activite/bilan_response",
          },
          {
            label: "Récapitulatif",
            route: "/Tresorier/bilan_activite/recap_bilan",
          },
        ],
      },

      {
        icon: (
          <svg
            className="fill-current text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C7.03 2 3 4.13 3 6.5S7.03 11 12 11s9-2.13 9-4.5S16.97 2 12 2zm0 7c-3.87 0-7-1.57-7-2.5S8.13 4 12 4s7 1.57 7 2.5S15.87 9 12 9zm-9 4.5c0 1.95 3.58 4.5 9 4.5s9-2.55 9-4.5v-2c-1.5 1.3-4.5 2-9 2s-7.5-.7-9-2v2zm0 4c0 1.95 3.58 4.5 9 4.5s9-2.55 9-4.5v-2c-1.5 1.3-4.5 2-9 2s-7.5-.7-9-2v2z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Etat de la caisse",
        route: "#",
        children: [
          {
            label: "Ancien solde",
            route: "/Tresorier/etat_caisse/ajout_ancien_solde",
          },
          {
            label: "Solde courant",
            route: "/Tresorier/etat_caisse/nouveau_solde",
          },
        ],
      },
      
      {
        icon: (
          <svg
            className="fill-current text-pink-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.2544 1.36453C13.1584 1.05859 12.132 1.38932 11.4026 2.05955C10.6845 2.71939 10.25 3.70552 10.25 4.76063V11.4551C10.25 12.7226 11.2775 13.75 12.5449 13.75H19.2394C20.2945 13.75 21.2806 13.3156 21.9405 12.5974C22.6107 11.868 22.9414 10.8416 22.6355 9.74563C21.5034 5.69003 18.31 2.49663 14.2544 1.36453ZM11.75 4.76063C11.75 4.10931 12.0201 3.52918 12.4175 3.16407C12.8035 2.80935 13.3035 2.65643 13.8511 2.8093C17.4013 3.80031 20.1997 6.59875 21.1907 10.1489C21.3436 10.6965 21.1907 11.1965 20.8359 11.5825C20.4708 11.9799 19.8907 12.25 19.2394 12.25H12.5449C12.1059 12.25 11.75 11.8941 11.75 11.4551V4.76063Z"
              fill=""
            />
            <path
              d="M8.67232 4.71555C9.0675 4.59143 9.28724 4.17045 9.16312 3.77527C9.039 3.38009 8.61803 3.16036 8.22285 3.28447C4.18231 4.55353 1.25 8.32793 1.25 12.7892C1.25 18.2904 5.70962 22.75 11.2108 22.75C15.6721 22.75 19.4465 19.8177 20.7155 15.7772C20.8397 15.382 20.6199 14.961 20.2247 14.8369C19.8296 14.7128 19.4086 14.9325 19.2845 15.3277C18.2061 18.761 14.9982 21.25 11.2108 21.25C6.53805 21.25 2.75 17.462 2.75 12.7892C2.75 9.00185 5.23899 5.79389 8.67232 4.71555Z"
              fill=""
            />
          </svg>
        ),
        label: "Objectifs et perspectives",
        route: "/Tresorier/objectifs",
      },

      {
        icon: (
          <svg
            className="fill-current text-orange-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.25 7C2.25 6.58579 2.58579 6.25 3 6.25H13C13.4142 6.25 13.75 6.58579 13.75 7C13.75 7.41421 13.4142 7.75 13 7.75H3C2.58579 7.75 2.25 7.41421 2.25 7ZM16.5 6.25C16.7951 6.25 17.0628 6.42309 17.1839 6.69223L21.6839 16.6922C21.8539 17.07 21.6855 17.514 21.3078 17.6839C20.93 17.8539 20.486 17.6855 20.3161 17.3078L18.8787 14.1136H14.1213L12.6839 17.3078C12.514 17.6855 12.07 17.8539 11.6922 17.6839C11.3145 17.514 11.1461 17.07 11.3161 16.6922L15.8161 6.69223C15.9372 6.42309 16.2049 6.25 16.5 6.25ZM14.7963 12.6136H18.2037L16.5 8.82764L14.7963 12.6136ZM2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H10C10.4142 11.25 10.75 11.5858 10.75 12C10.75 12.4142 10.4142 12.75 10 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12ZM2.25 17C2.25 16.5858 2.58579 16.25 3 16.25H8C8.41421 16.25 8.75 16.5858 8.75 17C8.75 17.4142 8.41421 17.75 8 17.75H3C2.58579 17.75 2.25 17.4142 2.25 17Z"
              fill=""
            />
          </svg>
        ),
        label: "Dépôt d'épreuve",
        route: "/Tresorier/depot_epreuve",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [date, setDate] = useState("");

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

  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  const [activeYear, setActiveYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string>("");

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

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="rounded-[0px] border border-stroke text-center sm:p-1.5">
          {date}
        </div>
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-4">
          <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
            Année Pastorale {activeYear}
          </h1>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};


export default Sidebar;

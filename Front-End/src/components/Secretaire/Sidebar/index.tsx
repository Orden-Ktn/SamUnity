"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import ClickOutside from "../ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { useState, useEffect } from "react";

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
            className="text- fill-current text-purple-500"
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
        route: "/Secretaire/dashboard",
      },
      {
        icon: (
          <svg
            className="fill-current text-yellow-500"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0008 1.0415C7.81464 1.0415 6.04243 2.81371 6.04243 4.99984C6.04243 7.18596 7.81464 8.95817 10.0008 8.95817C12.1869 8.95817 13.9591 7.18596 13.9591 4.99984C13.9591 2.81371 12.1869 1.0415 10.0008 1.0415ZM7.29243 4.99984C7.29243 3.50407 8.50499 2.2915 10.0008 2.2915C11.4965 2.2915 12.7091 3.50407 12.7091 4.99984C12.7091 6.49561 11.4965 7.70817 10.0008 7.70817C8.50499 7.70817 7.29243 6.49561 7.29243 4.99984Z"
              fill=""
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.0008 10.2082C8.0728 10.2082 6.29653 10.6464 4.9803 11.3868C3.68367 12.1161 2.7091 13.2216 2.7091 14.5832L2.70904 14.6681C2.7081 15.6363 2.70692 16.8515 3.77277 17.7195C4.29733 18.1466 5.03116 18.4504 6.0226 18.6511C7.01681 18.8523 8.31262 18.9582 10.0008 18.9582C11.6889 18.9582 12.9847 18.8523 13.9789 18.6511C14.9704 18.4504 15.7042 18.1466 16.2288 17.7195C17.2946 16.8515 17.2934 15.6363 17.2925 14.6681L17.2924 14.5832C17.2924 13.2216 16.3179 12.1161 15.0212 11.3868C13.705 10.6464 11.9287 10.2082 10.0008 10.2082ZM3.9591 14.5832C3.9591 13.8737 4.47691 13.1041 5.59313 12.4763C6.68976 11.8594 8.24682 11.4582 10.0008 11.4582C11.7547 11.4582 13.3118 11.8594 14.4084 12.4763C15.5246 13.1041 16.0424 13.8737 16.0424 14.5832C16.0424 15.673 16.0088 16.2865 15.4394 16.7502C15.1307 17.0016 14.6145 17.2471 13.7309 17.4259C12.8501 17.6042 11.646 17.7082 10.0008 17.7082C8.35558 17.7082 7.15138 17.6042 6.27059 17.4259C5.38703 17.2471 4.87086 17.0016 4.56209 16.7502C3.99269 16.2865 3.9591 15.673 3.9591 14.5832Z"
              fill=""
            />
          </svg>
        ),
        label: "Enfant Samuel",
        route: "#",
        children: [
          {
            label: "Ajout enfant",
            route: "/Secretaire/enfant_samuel/ajout_enfant_samuel",
          },
          {
            label: "Liste des enfants",
            route: "/Secretaire/enfant_samuel/liste_grade",
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
        label: "Participation aux activités",
        route: "#",
        children: [
          {
            label: "Ajouter un participant",
            route: "/Secretaire/activites/ajout_participant",
          },
          {
            label: "Liste des participants",
            route: "/Secretaire/activites/point_participant",
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
            <path d="M3 21v-3l13.5-13.5 3 3L6 21H3z" fill="currentColor" />
            <path d="M14.5 4.5l3 3 1.5-1.5-3-3-1.5 1.5z" fill="currentColor" />
          </svg>
        ),
        label: "Notes",
        route: "#",
        children: [
        {
          label: "Insertion de note",
          route: "/Secretaire/note/ajout_note",
        },
        {
          label: "Fiche de note",
          route: "/Secretaire/note/fiche_note",
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
        route: "/Secretaire/objectifs/objectifs",
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
        route: "/Secretaire/depot_epreuve",
      },

      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            className="fill-current"
          >
            <path fill="#4285F4" d="M25.5 4L5.1 39.9 10 48h28l4.9-8.1L25.5 4z"/>
            <path fill="#34A853" d="M5.1 39.9L10 48h28l4.9-8.1H5.1z"/>
            <path fill="#FBBC05" d="M25.5 4L5.1 39.9h9.9l16.5-27L25.5 4z"/>
            <path fill="#EA4335" d="M35.5 39.9h9.9L25.5 4l-4.9 8.1L35.5 39.9z"/>
          </svg>
        ),
        
        label: "Dossier Drive",
        route: "#",
        children: [
        {
          label: "Secrétariat",
          route: "https://drive.google.com/drive/folders/13-t6pHkzrbAYQ-IEI0lLJJinD8GZP4-g?usp=sharing",
        },
        {
          label: "Audiovisuel",
          route: "https://drive.google.com/drive/folders/1bQklZsJm3AYwmuP3AAJqMN_1w7db6as5?usp=sharing",
        },
        ]
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

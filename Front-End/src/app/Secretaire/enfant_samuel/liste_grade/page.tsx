import Choice from "@/components/Commun/Enfant_samuel/Liste_grade/Choice";
import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste des enfants" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

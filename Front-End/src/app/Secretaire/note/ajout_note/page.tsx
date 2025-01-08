import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Choice from "@/components/Secretaire/Notes/Ajout_note/Choice";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Insertion de note" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

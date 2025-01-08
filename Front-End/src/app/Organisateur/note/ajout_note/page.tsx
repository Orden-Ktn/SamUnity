import Breadcrumb from "@/components/Organisateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Organisateur/Layouts/DefaultLaout";
import Choice from "@/components/Organisateur/Notes/Ajout_note/Choice";
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

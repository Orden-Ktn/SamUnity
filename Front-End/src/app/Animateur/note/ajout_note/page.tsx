import Breadcrumb from "@/components/Animateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Animateur/Layouts/DefaultLaout";
import Choice from "@/components/Commun/Notes/Ajout_note/Choice";
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

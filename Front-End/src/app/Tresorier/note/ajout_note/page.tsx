import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Choice from "@/components/Tresorier/Notes/Ajout_note/Choice";
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

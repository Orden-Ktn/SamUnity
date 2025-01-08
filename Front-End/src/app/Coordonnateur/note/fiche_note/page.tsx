import Breadcrumb from "@/components/Coordonnateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
import Table from "@/components/Coordonnateur/Notes/Fiche_note/Table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Fiche de notes" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

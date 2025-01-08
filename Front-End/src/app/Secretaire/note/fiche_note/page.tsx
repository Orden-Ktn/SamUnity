import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Table from "@/components/Secretaire/Notes/Fiche_note/Table";
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

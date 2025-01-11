import Breadcrumb from "@/components/Animateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Animateur/Layouts/DefaultLaout";
import Table from "@/components/Animateur/Notes/Fiche_note/Table";
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

import Table from "@/components/Coordonnateur/Annee_pastorale/All_annee_pastorale/Table";
import Breadcrumb from "@/components/Coordonnateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste des années pastorales" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablePage;

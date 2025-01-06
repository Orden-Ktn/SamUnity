import Table from "@/components/Organisateur/Bilan_activite/recap_bilan/Table";
import Breadcrumb from "@/components/Organisateur/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Organisateur/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Récapitulatif d'activité" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

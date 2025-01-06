import Table from "@/components/Tresorier/Bilan_activite/recap_bilan/Table";
import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
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

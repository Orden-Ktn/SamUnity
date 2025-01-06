import { Metadata } from "next";
import Table from "@/components/Tresorier/Cotisation_Animateur/Point_cotisation/Table";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Point des cotisations des animateurs" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

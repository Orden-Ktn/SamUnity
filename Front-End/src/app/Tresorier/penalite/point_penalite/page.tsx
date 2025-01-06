import { Metadata } from "next";
import Table from "@/components/Tresorier/Penalite/Point_penalite/Table";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Point des pénalités" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

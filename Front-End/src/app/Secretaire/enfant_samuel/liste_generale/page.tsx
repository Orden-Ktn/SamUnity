import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import Table from "@/components/Secretaire/Enfant_samuel/Liste_generale/Table";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste générale" />

      <div className="flex flex-col gap-10">
        <Table />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

import Breadcrumb from "@/components/Formateur/Breadcrumbs/Breadcrumb";
import Table from "@/components/Formateur/Enfant_samuel/Liste_generale/Table";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
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

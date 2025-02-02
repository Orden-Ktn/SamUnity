import Breadcrumb from "@/components/Formateur/Breadcrumbs/Breadcrumb";
import Choice from "@/components/Commun/Classement/Point/Point_reveillon/Choice";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Point classement de Réveillon" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

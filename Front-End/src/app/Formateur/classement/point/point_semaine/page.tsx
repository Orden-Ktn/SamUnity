import Breadcrumb from "@/components/Formateur/Breadcrumbs/Breadcrumb";
import Choice from "@/components/Formateur/Classement/Point/Point_semaine/Choice";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Point classement de la semaine" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

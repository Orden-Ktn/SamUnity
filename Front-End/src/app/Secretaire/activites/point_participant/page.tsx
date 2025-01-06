import { Metadata } from "next";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import Table from "@/components/Secretaire/Activites/Point_participant/Table";
import Choice from "@/components/Secretaire/Activites/Point_participant/Choice";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ChoicePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Liste des participants" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default ChoicePage;

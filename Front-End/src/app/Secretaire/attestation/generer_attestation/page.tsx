import Choice from "@/components/Secretaire/Attestation/Generer_attestation/Choice";
import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SamUnity",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Génération d'attestation" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;

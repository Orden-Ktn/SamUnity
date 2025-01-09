import { Metadata } from "next";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";
import Choice from "@/components/Tresorier/Bilan_activite/Point_participant/Choice";

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

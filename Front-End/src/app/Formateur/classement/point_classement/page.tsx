import { Metadata } from "next";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Formateur/Breadcrumbs/Breadcrumb";
import Choice from "@/components/Formateur/Classement/Point_classement/Choice";

export const metadata: Metadata = {
  title: "SamUnity",
};

const ChoicePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Point du classement" />

      <div className="flex flex-col gap-10">
        <Choice />
      </div>
    </DefaultLayout>
  );
};

export default ChoicePage;

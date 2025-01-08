import Breadcrumb from "@/components/Formateur/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import SettingBoxes from "@/components/Formateur/SettingBoxes";
import DefaultLayout from "@/components/Formateur/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "SamUnity",

};

const Settings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Informations personnelles" />

        <SettingBoxes />
      </div>
    </DefaultLayout>
  );
};

export default Settings;

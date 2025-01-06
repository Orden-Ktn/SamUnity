import Breadcrumb from "@/components/Coordonnateur/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import SettingBoxes from "@/components/Coordonnateur/SettingBoxes";
import DefaultLayout from "@/components/Coordonnateur/Layouts/DefaultLaout";

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

import Breadcrumb from "@/components/Secretaire/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import SettingBoxes from "@/components/Secretaire/SettingBoxes";
import DefaultLayout from "@/components/Secretaire/Layouts/DefaultLaout";

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

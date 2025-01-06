import Breadcrumb from "@/components/Tresorier/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

import SettingBoxes from "@/components/Tresorier/SettingBoxes";
import DefaultLayout from "@/components/Tresorier/Layouts/DefaultLaout";

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

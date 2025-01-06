import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProfileBox from "@/components/Coordonnateur/ProfileBox";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "SamUnity",

};

const Profile = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Profile" />

        <ProfileBox />
      </div>
    </DefaultLayout>
  );
};

export default Profile;

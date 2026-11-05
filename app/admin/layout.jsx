import { assets } from "@/Assets/assets";
import SideBar from "@/Components/adminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark"></ToastContainer>
         <SideBar/>
         <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
               <h3 className="font-medium">Admin pannel</h3>
               <Image className="rounded-full" src={assets.profile1} width={40} height={40} alt=""></Image>
            </div>
            {children}
         </div>
      </div>
    </>
  );
}

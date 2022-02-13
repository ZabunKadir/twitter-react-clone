import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
export default function UserModal({
  isOpen,
  onClose,
  name,
  photoUrl,
  userName,
}) {
  const router = useRouter();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    router.push("/");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex min-h-screen">
        <Dialog.Overlay className="fixed inset-0  opacity-0" />
        <div className="flex flex-col mt-[31%] ml-[7%] shadow-light z-10 rounded-xl bg-black min-w-[300px] max-h-[200px] ">
          <div className="flex text-white border-b border-secondaryHover">
            <div className="flex flex-row w-full h-full p-3">
              <div className="flex p-2 space-x-2">
                <div className="flex flex-col w-[40px] h-[40px] ">
                  <Image
                    layout="responsive"
                    alt="User"
                    className="object-cover rounded-full"
                    width={40}
                    height={40}
                    src={photoUrl}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start ml-1 my-auto">
                <div className="flex">{name}</div>
                <div className="flex">
                  <span className="text-third break-words ">
                    {"@" + userName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full text-white">
            <button className="flex p-4 text-[15px] hover:bg-secondary transition-all duration-200">
              Add an existing account
            </button>
            <button
              className="flex p-4 text-[15px] hover:bg-secondary transition-all duration-200"
              onClick={logout}
            >
              Log out {"@" + userName}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

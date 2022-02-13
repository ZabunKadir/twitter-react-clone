import { useState } from "react";
import { useRouter } from "next/router";
import { Dialog } from "@headlessui/react";

import {
  faApple,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Input from "./shared/input";
import { supabase } from "../utils/supabaseClient";

const initialState = {
  email: "",
  password: "",
};
export default function SignInModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialState);

  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({
        email: formData?.email,
        password: formData?.password,
      });
      if (user) router.push("/timeline");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-slate-800 opacity-100" />

        <div className="relative text-textColor bg-black overflow-auto overflow-x-hidden  min-h-[400px] max-w-[600px] max-h-[90vh] mx-auto rounded-xl">
          <div className="flex md:w-[600px] sm:w-[400px] h-[53px] p-[12px]">
            <button
              className="flex justify-center text-white hover:bg-[rgba(239,243,244,0.1)] hover:rounded-full w-[42px] h-[42px] items-center "
              onClick={onClose}
            >
              <FontAwesomeIcon className="m-[5px] text-[22px]" icon={faTimes} />
            </button>
            <FontAwesomeIcon className="m-auto text-[36px]" icon={faTwitter} />
          </div>
          <div className="mt-6">
            <div className="flex flex-col px-[32px] space-y-8 justify-center">
              <span className="flex w-1/2 mx-auto text-[24px] font-bold">
                Sign in on Twitter
              </span>
              <div className="w-2/3 mx-auto">
                <div>
                  <button className="py-2 px-6 bg-white text-black rounded-full w-full max-w-[400px] space-x-2">
                    <FontAwesomeIcon
                      className=""
                      icon={faGoogle}
                    ></FontAwesomeIcon>
                    <span className="text-black">Sign up with Google</span>
                  </button>
                </div>
                <div className=" mt-2">
                  <button className="py-2 px-6 bg-white text-black rounded-full w-full max-w-[400px] space-x-2 hover:bg-[rgb(230,230,230)] transition duration-200">
                    <FontAwesomeIcon
                      className="text-[20px]"
                      icon={faApple}
                    ></FontAwesomeIcon>
                    <span className="text-black font-bold">
                      Sign up with Apple
                    </span>
                  </button>
                </div>
                <div className="my-5 relative flex justify-center text-gray w-full max-w-[400px]">
                  <div className="w-full h-[15px] text-center border-b border-solid "></div>{" "}
                  <span className="absolute bg-#F3F5F6 m-auto w-[30px] text-center bg-black text-textColor">
                    or
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    name={"Email"}
                    type={"email"}
                    focus={isEmailFocus}
                    handle={handleChange}
                    setFocus={setIsEmailFocus}
                    data={formData?.email}
                  />
                  <Input
                    name={"Password"}
                    type={"password"}
                    focus={isPasswordFocus}
                    handle={handleChange}
                    setFocus={setIsPasswordFocus}
                    data={formData?.password}
                  />
                  <div className="py-[36px] px-[32px] ">
                    <button
                      className=" flex justify-center w-2/3 mx-auto py-2 px-6 bg-textColor text-black rounded-full font-bold  mb-[8px] border-[1px] border-gray  transition duration-200 hover:bg-[rgb(200,200,200)]"
                      disabled={
                        formData?.email && formData?.password ? false : true
                      }
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex w-1/2 justify-start mx-auto  mb-20">
              <span className="text-gray">Don{"'"}t have an account?</span>
              <a className="ml-2 text-primary hover:cursor-pointer hover:underline">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

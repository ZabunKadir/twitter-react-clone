import Image from "next/image";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import SignUpModal from "../components/signUpModal";
import SignInModal from "../components/signInModal";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) router.push("/timeline");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-[96vh] md:grid md:grid-cols-12 sm:flex sm:flex-col">
        <div className="md:col-span-7 relative sm:h-[128px] sm:max-h-[200px]">
          <Image
            layout="fill"
            src="/images/lohp_1302x955.png"
            alt="Twitter"
            className="object-cover"
          />
          <div className="flex absolute my-auto justify-center h-full w-full">
            <FontAwesomeIcon
              className=" flex h-full md:text-[340px] sm:text-[64px] text-white"
              icon={faTwitter}
            />
          </div>
        </div>
        <div className="md:col-span-5 px-8 flex bg-black ">
          <div className="flex flex-col justify-around">
            <FontAwesomeIcon
              className="text-textColor text-5xl sm:mt-10"
              icon={faTwitter}
            />
            <div>
              <h1 className="text-5xl font-bold text-textColor md:text-[64px] sm:[40px] tracking-tight sm:my-10">
                Happening Now
              </h1>
            </div>
            <div className="flex">
              <h2 className="text-3xl font-bold text-textColor sm:my-10">
                Join Twitter today.
              </h2>
            </div>
            <div className="flex flex-col h-auto">
              <div>
                <button className="py-2 px-6 bg-white text-black rounded-full w-[300px] max-w-[400px] space-x-2">
                  <FontAwesomeIcon
                    className=""
                    icon={faGoogle}
                  ></FontAwesomeIcon>
                  <span className="text-black">Sign up with Google</span>
                </button>
              </div>
              <div className=" mt-2">
                <button className="py-2 px-6 bg-white text-black rounded-full w-[300px] max-w-[400px] space-x-2 hover:bg-[rgb(230,230,230)] transition duration-200">
                  <FontAwesomeIcon
                    className="text-[20px]"
                    icon={faApple}
                  ></FontAwesomeIcon>
                  <span className="text-black font-bold">
                    Sign up with Apple
                  </span>
                </button>
              </div>
              <div className="my-5 relative flex justify-center text-gray w-[300px] max-w-[400px]">
                <div className="w-full h-[15px] text-center border-b border-solid "></div>{" "}
                <span className="absolute bg-#F3F5F6 m-auto w-[30px] text-center bg-black text-textColor">
                  or
                </span>
              </div>
              <div>
                <button
                  className="py-2 px-6 bg-primary text-white rounded-full font-bold w-[300px] max-w-[400px] hover:bg-[rgb(26,140,216)] transition duration-200"
                  onClick={() => setShowSignUpModal(true)}
                >
                  Sign up with phone or email
                </button>
              </div>

              <div className="text-gray text-[11px] w-[300px] max-w-[380px] mt-2">
                By signing up, you agree to the{" "}
                <a
                  className="text-primary hover:underline cursor-pointer"
                  href="https://twitter.com/en/tos"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  className="text-primary hover:underline cursor-pointer"
                  href="https://twitter.com/en/privacy"
                >
                  Privacy Policy
                </a>
                , including{" "}
                <a
                  className="text-primary hover:underline cursor-pointer"
                  href="https://help.twitter.com/tr/rules-and-policies/twitter-cookies"
                >
                  Cookie Use.
                </a>
              </div>
              <div className="mt-[40px]">
                <div className="mb-[20px]">
                  <span className="text-textColor text-[17px] font-bold ">
                    Already have an account?
                  </span>
                </div>
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="py-2 px-6 bg-black text-primary rounded-full font-bold w-[300px] max-w-[400px] mb-[8px] border-[1px] border-gray hover:bg-[rgba(29,155,240,0.1)] transition duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-gray">
        <nav className="flex container mx-auto px-4 py-2 justify-center items-center text-[13px] space-x-4 flex-wrap">
          <a className="hover:underline cursor-pointer">About</a>
          <a className="hover:underline cursor-pointer ">Help Center</a>
          <a className="hover:underline cursor-pointer">Terms of Service</a>
          <a className="hover:underline cursor-pointer">Privacy Policy</a>
          <a className="hover:underline cursor-pointer">Cookie Policy</a>
          <a className="hover:underline cursor-pointer">Imprint</a>
          <a className="hover:underline cursor-pointer">Accessibility</a>
          <a className="hover:underline cursor-pointer">Ads info</a>
          <a className="hover:underline cursor-pointer">Blog</a>
          <a className="hover:underline cursor-pointer">Status</a>
          <a className="hover:underline cursor-pointer">Careers</a>
          <a className="hover:underline cursor-pointer">Brand Resources</a>
          <a className="hover:underline cursor-pointer">Advertising</a>
          <a className="hover:underline cursor-pointer">Marketing</a>
          <a className="hover:underline cursor-pointer">Twitter for Business</a>
          <a className="hover:underline cursor-pointer">Developers</a>
          <a className="hover:underline cursor-pointer">Directory</a>
          <a className="hover:underline cursor-pointer">Settings</a>
          <div>© 2022 Twitter, Inc. {`"Example"`}</div>
        </nav>
      </footer>
      <SignUpModal
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
      />
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />
    </div>
  );
}

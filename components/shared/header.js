import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

import {
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faListAlt,
  faUser,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";

import TweetModal from "../tweetModal";
//Link Component
const Navlink = ({ url, label, icon }) => {
  return (
    <Link href={url} passHref>
      <a className="flex w-full  transition-all duration-200 items-center">
        <div className="flex p-3 rounded-3xl hover:bg-secondary">
          <FontAwesomeIcon
            className="max-w-full text-2xl my-auto inline-block"
            icon={icon}
          />
          <span className="ml-5 text-xl">{label}</span>
        </div>
      </a>
    </Link>
  );
};

const Navbar = () => {
  const [showTweetModal, setShowTweetModal] = useState(false);
  const user = supabase.auth.user();
  return (
    <div className="flex flex-col  space-y-4">
      <div className="flex flex-start mt-3 ml-3">
        <FontAwesomeIcon
          className="text-[30px] inline-block"
          icon={faTwitter}
        ></FontAwesomeIcon>
      </div>
      <nav className="flex flex-col space-y-1 items-start w-full">
        <Navlink url={"/timeline"} label={"Home"} icon={faHome} />
        <Navlink url={"/explore"} label={"Explore"} icon={faHashtag} />
        <Navlink url={"/notifications"} label={"Notifications"} icon={faBell} />
        <Navlink url={"/messages"} label={"Messages"} icon={faEnvelope} />
        <Navlink url={"/bookmarks"} label={"Bookmarks"} icon={faBookmark} />
        <Navlink url={"/lists"} label={"Lists"} icon={faListAlt} />
        <Navlink url={"/profile"} label={"Profile"} icon={faUser} />
        <button className="flex w-full  transition-all duration-200 items-center">
          <div className="flex p-3 hover:bg-secondary rounded-3xl">
            <FontAwesomeIcon
              className=" max-w-full text-2xl my-auto inline-block border rounded-2xl px-[4px] text-[24px]"
              icon={faEllipsisH}
            />
            <span className="ml-5 text-xl">More</span>
          </div>
        </button>
      </nav>
      <button
        className="py-4 px-6 bg-primary text-white rounded-full max-w-[210px] w-[210px] hover:bg-[rgb(26,140,216)] transition duration-200 font-bold"
        onClick={() => setShowTweetModal(true)}
      >
        Tweet
      </button>
      <TweetModal
        isOpen={showTweetModal}
        onClose={() => setShowTweetModal(false)}
        user={user}
        photoUrl={"/images/default_profile.png"}
      />
    </div>
  );
};
export default Navbar;

import { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faImage,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
import {
  faFilm,
  faGlobeAmericas,
  faMapMarkerAlt,
  faPollH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const initialState = {
  tweet: "",
};

const modalButton = (icon, titleLabel, isDisabled) => {
  return (
    <button
      className="flex rounded-full items-center hover:bg-secondary w-[32px] h-[32px] justify-center"
      disabled={isDisabled}
      title={titleLabel}
    >
      <FontAwesomeIcon
        className={`${
          isDisabled ? "text-[rgba(26,140,216,0.5)]" : "text-primary"
        } text-[18px] w-full h-full  mx-2`}
        icon={icon}
      />
    </button>
  );
};

export default function TweetModal({ isOpen, onClose, user, photoUrl }) {
  const [formData, setFormData] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      name: formData?.name,
    });
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
      <div className="flex justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(91,112,131,0.7)] opacity-50" />
        <div className="flex flex-col mt-[2%] max-w-[80vh] bg-black min-w-[600px] max-h-[90vh] mx-auto">
          <div className="flex w-full">
            <div className="flex items-center sticky top-0 h-[53px] px-[16px] bg-black w-full rounded-t-2xl">
              <button onClick={onClose}>
                <FontAwesomeIcon
                  className="text-textColor text-[20px]"
                  icon={faTimes}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-row pb-[4px] px-[16px] w-full h-[213px] sticky bg-black rounded-b-2xl">
            <div className="flex p-1">
              <div className="flex flex-col  w-[48px] h-[48px]">
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
            <div className="flex flex-col pt-5  w-full">
              <div className="flex w-full h-full">
                <textarea
                  placeholder="What's happening?"
                  id="tweet"
                  name="tweet"
                  className="flex w-full h-auto resize-none bg-transparent text-textColor text-[20px] ml-2 outline-none"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex w-full h-[36px] border-b border-secondaryHover">
                <div className="flex flex-row pl-2">
                  <button className="mb-4">
                    <FontAwesomeIcon
                      className="text-primary text-[14px]"
                      icon={faGlobeAmericas}
                    ></FontAwesomeIcon>
                    <span className="text-primary ml-1 font-bold text-[14px]">
                      Eveyone can reply
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-row w-full h-[48px] mb-1 mt-3 justify-between">
                <div className="flex flex-row space-x-1">
                  {modalButton(faImage, "Media")}
                  {modalButton(faFilm, "GIF")}
                  {modalButton(faPollH, "Poll")}
                  {modalButton(faSmile, "Emoji")}
                  {modalButton(faCalendarAlt, "Schedule")}
                  {modalButton(faMapMarkerAlt, "Locate", true)}
                </div>
                <div className="flex">
                  <button
                    className="py-2  bg-primary text-white rounded-full  max-w-[75px] w-[75px] hover:bg-[rgb(26,140,216)] transition duration-200 font-bold  disabled:bg-[rgba(26,140,216,0.4)] disabled:text-[rgba(255,255,255,0.4)]"
                    disabled={formData.tweet ? false : true}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

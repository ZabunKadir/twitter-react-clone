import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";
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
import { supabase } from "../../utils/supabaseClient";
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

const initialState = {
  tweet: "",
};
const TweetSend = ({ isModal, close, user, photoUrl }) => {
  const [formData, setFormData] = useState(initialState);
  const [isClicked, setIsClicked] = useState(false);
  const [click, setClick] = useState(false);
  const showHandler = () => {
    if (isModal) {
      setIsClicked(true);
    } else if (click && !isModal) {
      setIsClicked(true);
    } else if (!click && !isModal) {
      setIsClicked(false);
    }
  };
  useEffect(() => {
    showHandler();
  }, [click]);

  const sendTweet = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("tweets").insert({
      body: formData?.tweet,
    });
    if (error) {
      console.log(error);
    } else {
      formData.tweet = "";
      setTimeout(close, 0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      {isModal && (
        <div className="flex w-full">
          <div className="flex items-center sticky top-0 h-[53px] px-[16px] bg-black w-full rounded-t-2xl">
            <button onClick={close}>
              <FontAwesomeIcon
                className="text-textColor text-[20px]"
                icon={faTimes}
              />
            </button>
          </div>
        </div>
      )}

      <div
        className={`flex flex-row pb-[4px] px-[16px] w-full ${
          isModal ? "h-[213px]" : "h-auto"
        }  sticky bg-black rounded-b-2xl`}
      >
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
        <div className="flex flex-col pt-4 h-auto w-full">
          <div className={`flex w-full ${isClicked ? "h-full" : null}`}>
            <textarea
              onClick={() => setClick(true)}
              placeholder="What's happening?"
              id="tweet"
              name="tweet"
              className="flex w-full h-auto resize-none bg-transparent text-textColor text-[20px] ml-2 outline-none"
              onChange={handleChange}
              value={formData?.tweet}
            ></textarea>
          </div>
          {isClicked && (
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
          )}
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
                className="p-1 bg-primary justify-center items-center text-white rounded-full h-[36px] max-w-[75px] w-[75px] hover:bg-[rgb(26,140,216)] transition duration-200 font-bold  disabled:bg-[rgba(26,140,216,0.4)] disabled:text-[rgba(255,255,255,0.4)]"
                disabled={formData.tweet ? false : true}
                onClick={sendTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TweetSend;

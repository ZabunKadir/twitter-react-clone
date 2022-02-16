import Header from "../components/shared/header";
import UserComponent from "../components/user";
import Trend from "../components/shared/trend";
import Follow from "../components/follow";
import TweetSend from "../components/shared/tweetSend";
import Tweet from "../components/shared/tweet";

import moment from "moment";
moment.locale("en", {
  relativeTime: { m: "a minute", mm: "%dm", hh: "%dh" },
});
import { supabase } from "../utils/supabaseClient";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faEllipsisH,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const TimeLine = () => {
  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const user = supabase.auth.user();

  const getProfile = async () => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name,username")
      .eq("id", user?.id);
    setCurrentUser(profile);
  };

  useEffect(() => {
    (async () => {
      const { data: tweets, error } = await supabase
        .from("tweets")
        .select("*,profile:profile_id (name,username)")
        .order("created_at", { ascending: false });
      if (!error) {
        setTweets(tweets);
      }
    })();
    getProfile();
  }, [tweets]);

  return (
    <div className="flex min-h-screen bg-black text-textColor h-full">
      <div className="flex flex-row container  mx-auto min-h-[486px]">
        <header className="flex max-w-[400px] z-[3] justify-end relative">
          <div className="flex w-[400px] justify-end">
            <div className="flex flex-col justify-between overflow-y-auto overflow-x-hidden w-[275px] h-full px-3 fixed items-start ">
              <Header />
              <UserComponent
                photoUrl={"/images/default_profile.png"}
                name={currentUser[0]?.name}
                userName={currentUser[0]?.name}
              />
            </div>
          </div>
        </header>
        <main className="flex  w-full justify-between text-[15px]">
          <div className="flex flex-row max-w-[990px] w-[990px] relative">
            <div className="flex flex-col max-w-[600px] w-full border-r border-l mx-0 border-[rgb(47,51,54)]">
              <div className="flex w-full h-[53px] z-10 items-center">
                <div className="flex flex-row justify-between w-full p-4 bg-[rgba(0,0,0,.7)]  items-center fixed max-w-[600px]">
                  <span className="flex w-3/4 font-bold text-[20px] ">
                    Lastest Tweets
                  </span>

                  <button className="flex hover:bg-secondaryHover p-2 rounded-full">
                    <FontAwesomeIcon className="" icon={faStar} />
                  </button>
                </div>
              </div>
              <div className="flex mt-2 border-b-2 border-[rgb(47,51,54)]">
                <TweetSend photoUrl={"/images/default_profile.png"}></TweetSend>
              </div>
              <div>
                {tweets?.map((item) => (
                  <Tweet
                    key={item.id}
                    name={item.profile.name}
                    userName={item.profile.name}
                    time={moment(item.created_at).fromNow(true)}
                    content={item.body}
                    photoUrl={"/images/default_profile.png"}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[290px] lg:w-[350px]  ">
              <div className="flex  flex-row mt-1 justify-center items-center ">
                <div className="flex w-full items-center h-[53px]">
                  <div
                    className={`flex max-w-[290px] lg:max-w-[350px] w-full space-x-4 bg-secondary p-3 rounded-3xl text-left  fixed z-10 ${
                      isFocusSearch ? "border border-primary" : null
                    } items-center`}
                  >
                    <FontAwesomeIcon
                      className={`ml-2 text-[20px] ${
                        isFocusSearch ? "text-primary" : "text-secondaryHover"
                      }`}
                      icon={faSearch}
                    />
                    <input
                      className="flex w-full bg-transparent outline-none text-[15px] "
                      placeholder="Search Twitter"
                      type="text"
                      onFocus={() => setIsFocusSearch(true)}
                      onBlur={() => setIsFocusSearch(false)}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="flex  flex-col mt-4 items-center bg-secondary rounded-xl">
                <div className="flex w-full p-3 justify-between flex-row px-[16px]">
                  <div className="flex w-2/3">
                    <h2 className="flex text-[20px] font-bold">
                      Trends for you
                    </h2>
                  </div>

                  <button className="flex items-center">
                    <FontAwesomeIcon className="text-[18px]" icon={faCog} />
                  </button>
                </div>
                <div className="flex flex-col w-full">
                  <Trend
                    type={"Politics-Trending"}
                    subject={"Example"}
                    tweetCount={7.587}
                  />
                  <Trend
                    type={"Sport-Trending"}
                    subject={"Example"}
                    tweetCount={7.587}
                  />
                  <Trend
                    type={"Politics-Trending"}
                    subject={"#Example"}
                    tweetCount={287}
                  />
                  <Trend
                    type={"Politics-Trending"}
                    subject={"#Example"}
                    tweetCount={17.587}
                  />
                </div>
                <div className="flex justify-start w-full hover:bg-grayHover p-3">
                  <button className="flex w-full">
                    <span className="flex text-primary ml-2">Show More</span>
                  </button>
                </div>
              </div>
              <div className="flex  flex-col mt-4 items-center bg-secondary rounded-xl">
                <div className="flex w-full p-3 justify-between flex-row px-[16px]">
                  <div className="flex w-2/3">
                    <h2 className="flex text-[20px] font-bold">
                      Who to follow
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <Follow
                    photoUrl={"/images/default_profile.png"}
                    name={"Example"}
                    userName={"example"}
                  />
                  <Follow
                    photoUrl={"/images/default_profile.png"}
                    name={"Example"}
                    userName={"example"}
                  />
                </div>
                <div className="flex justify-start w-full hover:bg-grayHover p-3">
                  <button className="flex w-full">
                    <span className="flex text-primary ml-2">Show More</span>
                  </button>
                </div>
              </div>
              <div className="flex justify-start  flex-row flex-wrap mt-4 px-3 mb-4 space-y-1">
                <a
                  href="/tos"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Privacy Policy
                </a>
                <a
                  href="/cookie"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Cookie Policy
                </a>
                <a
                  href="/imprint"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Imprint
                </a>
                <a
                  href="/accessibillity"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Accessibillity
                </a>
                <a
                  href="/adsinfo"
                  className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center mr-3"
                >
                  Ads info
                </a>
                <button className="flex flex-row justify-center items-center">
                  <span className="flex text-gray hover:underline leading-4 text-[13px] items-center justify-center ">
                    More
                  </span>
                  <FontAwesomeIcon
                    className="flex ml-1 text-gray text-[11px]"
                    icon={faEllipsisH}
                  />
                </button>
                <span className="flex text-gray  leading-4 text-[13px] items-center justify-center mr-2">
                  © 2022 Twitter, Inc.
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default TimeLine;

import Header from "../components/shared/header";
import UserComponent from "../components/user";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";
import Trend from "../components/shared/trend";

const TimeLine = () => {
  const [isFocusSearch, setIsFocusSearch] = useState(false);
  const router = useRouter();
  const user = supabase.auth.user();

  return (
    <div className="flex min-h-screen bg-black text-textColor h-full">
      <div className="flex flex-row container  mx-auto min-h-[486px]">
        <header className="flex max-w-[400px]  z-[3] justify-end relative">
          <div className="flex w-[400px] justify-end">
            <div className="flex flex-col justify-between overflow-y-auto overflow-x-hidden w-[275px] h-full px-3 fixed items-start ">
              <Header />
              <UserComponent
                photoUrl={"/images/default_profile.png"}
                name={"Example"}
                userName={"example"}
              />
            </div>
          </div>
        </header>
        <main className="flex  w-full justify-between text-[15px]">
          <div className="flex flex-row max-w-[990px] w-[990px]">
            <div className="max-w-[600px] w-full border-r border-l mx-0 border-[rgb(47,51,54)]">
              Orta
            </div>
            <div className="flex flex-col justify-center p-2 w-[290px] lg:w-[350px]  ">
              <div className="flex  flex-row mt-1 justify-center items-center">
                <div
                  className={`flex w-full space-x-4 bg-secondary p-3 rounded-3xl text-left ${
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
              <div className="flex  flex-col mt-1 items-center bg-secondary rounded-xl">
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
                    subject={"Suleyman Soylu"}
                    tweetCount={7.587}
                  />
                  <Trend
                    type={"Politics-Trending"}
                    subject={"Suleyman Soylu"}
                    tweetCount={7.587}
                  />
                  <Trend
                    type={"Politics-Trending"}
                    subject={"Suleyman Soylu"}
                    tweetCount={7.587}
                  />
                  <Trend
                    type={"Politics-Trending"}
                    subject={"Suleyman Soylu"}
                    tweetCount={7.587}
                  />
                </div>
                <div className="flex justify-start w-full hover:bg-grayHover p-3">
                  <button className="flex w-full">
                    <span className="flex text-primary ml-2">Show More</span>
                  </button>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default TimeLine;

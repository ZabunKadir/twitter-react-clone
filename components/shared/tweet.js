import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faRetweet } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart,
  faShareSquare,
} from "@fortawesome/free-regular-svg-icons";
const actionButton = (icon, title, value, color) => {
  return (
    <div
      className={`flex items-center rounded-full p-1 text-gray ${color} `}
      title={title}
    >
      <button className="flex items-center  w-[34px] justify-centertext-gray text-[14px] space-x-3 p-2 ">
        <FontAwesomeIcon className="text-[18px]" icon={icon} />
        <span className="flex text-[13px] ">{value}</span>
      </button>
    </div>
  );
};
const Tweet = ({ photoUrl, name, userName, time, content }) => {
  return (
    <div className="flex flex-col border-b border-[rgb(47,51,54)] hover:bg-[rgba(255,255,255,0.03)]">
      <div className="flex p-4">
        <div className="flex p-1">
          <div className="flex flex-col  w-[48px] h-[48px]">
            <Image
              layout="responsive"
              alt="User"
              className="object-cover rounded-full"
              width={48}
              height={48}
              src={photoUrl}
            />
          </div>
        </div>
        <div className="flex w-full flex-col ml-2">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row space-x-1 items-center">
              <div className="flex">
                <a className="flex space-x-2">
                  <span className="font-bold hover:underline">{name}</span>
                  <span className="text-gray">{"@" + userName}</span>
                </a>
              </div>

              <div className="flex text-gray">·</div>
              <div className="flex text-gray hover:underline">{time}</div>
            </div>
            <div className="flex justify-end">
              <button
                title="More"
                className="flex rounded-2xl text-gray text-[14px] hover:bg-[rgba(29,155,240,0.1)] hover:text-[rgba(29,155,255,1)] p-2"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </div>
          </div>
          <div className="flex">{content}</div>
          <div className="flex flex-row justify-start space-x-24 mt-1">
            {actionButton(
              faComment,
              "Reply",
              5,
              "hover:text-[rgba(29,155,255,1)] hover:bg-[rgba(29,155,240,0.1)]"
            )}
            {actionButton(
              faRetweet,
              "Retweet",
              15,
              "hover:text-[rgba(0,186,124,1)] hover:bg-[rgba(0,186,124,0.1)]"
            )}
            {actionButton(
              faHeart,
              "Like",
              445,
              "hover:text-[rgba(249,24,128,1)] hover:bg-[rgba(249,24,128,0.1)]"
            )}
            <div
              className="flex items-center space-x-1  text-gray"
              title="Share"
            >
              <button className="flex hover:text-[rgba(29,155,255,1)] hover:bg-[rgba(29,155,240,0.1)] rounded-full p-3 items-center justify-center">
                <FontAwesomeIcon className="text-[18px]" icon={faShareSquare} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start w-full hover:bg-grayHover p-3">
        <button className="flex w-full">
          <span className="flex text-primary ml-16">Show this thread</span>
        </button>
      </div>
    </div>
  );
};

export default Tweet;

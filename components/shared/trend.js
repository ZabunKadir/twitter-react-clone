import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trend = ({ type, tweetCount, subject }) => {
  return (
    <div className="flex w-full justify-start h-auto hover:bg-grayHover ">
      <button className="flex flex-col w-3/4  ml-4 my-2">
        <div className="text-secondaryHover">
          <span className="text-[13px]">{type}</span>
        </div>
        <div className="text-textColor">
          <span className="font-bold text-[15px]">{subject}</span>
        </div>
        <div className="text-secondaryHover">
          <span className="text-[13px]">{tweetCount + " Tweets"}</span>
        </div>
      </button>
      <div className="flex w-1/4 items-start justify-end mr-4 mt-2 ">
        <button
          title="More"
          className="flex rounded-2xl text-gray text-[14px] hover:bg-[rgba(29,155,240,0.1)] hover:text-[rgba(29,155,255,1)] p-2"
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </button>
      </div>
    </div>
  );
};
export default Trend;

import Image from "next/image";

const Follow = ({ name, userName, photoUrl }) => {
  return (
    <div className="flex w-full items-center h-auto hover:bg-grayHover ">
      <button className="flex w-1/4 justify-center p-2">
        <div className="flex  flex-col w-[48px] h-[48px]  ">
          <Image
            layout="responsive"
            alt="User"
            className="rounded-full "
            width={48}
            height={48}
            src={photoUrl}
          />
        </div>
      </button>
      <div className="flex w-3/4 flex-row justify-between my-auto">
        <button className="">
          <div className="flex flex-col">
            <span className="flex font-bold hover:underline">{name}</span>
            <span className="text-third break-words hover:no-underline">
              {"@" + userName}
            </span>
          </div>
        </button>
        <div className="flex justify-center items-center mr-4">
          <button className="flex bg-white text-black p-2  rounded-full px-4 font-bold hover:bg-textColor">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
export default Follow;

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import UserModal from "./userModal";
const UserComponent = ({ photoUrl, name, userName }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  return (
    <div>
      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        photoUrl={photoUrl}
        name={name}
        userName={userName}
      ></UserModal>
      <button
        className="flex hover:bg-secondary rounded-full my-3 p-1 w-full "
        onClick={() => setShowUserModal(true)}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex p-2 space-x-2">
            <div className="flex flex-col w-[40px] h-[40px] ">
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
          <div className="flex flex-col justify-start ml-1 my-auto">
            <div className="flex">{name}</div>
            <div className="flex">
              <span className="text-third break-words ">{"@" + userName}</span>
            </div>
          </div>
          <div className="flex justify-end my-auto max-w-[97px] w-[97px]">
            <FontAwesomeIcon className="mr-1" icon={faEllipsisH} />
          </div>
        </div>
      </button>
    </div>
  );
};
export default UserComponent;

import { Dialog } from "@headlessui/react";
import TweetSend from "./shared/tweetSend";
export default function TweetModal({ isOpen, onClose, user, photoUrl }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-[rgba(91,112,131,0.7)] opacity-50" />
        <div className="flex flex-col mt-[2%] max-w-[80vh] min-w-[600px] max-h-[90vh] mx-auto">
          <TweetSend
            isModal={true}
            close={onClose}
            photoUrl={photoUrl}
          ></TweetSend>
        </div>
      </div>
    </Dialog>
  );
}

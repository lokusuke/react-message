import { MessageRoom } from "./room/MessageRoom";
import { MessageRoomList } from "./sidebar/MessageRoomList";
import { MessageTitle } from "./sidebar/MessageTitle";

export const MessageApp = () => {
  return (
    <>
      <aside className="w-80 flex flex-col border-r-2 border-purple-100 ">
        <MessageTitle />
        <MessageRoomList />
      </aside>
      <MessageRoom />
    </>
  );
};

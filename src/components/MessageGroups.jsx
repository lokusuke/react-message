import { useSetAtom, useAtomValue } from "jotai";
import {
  getMessageGroupsAtom,
  setMessageRoomAtom,
} from "../atoms/loginUserAtom";
import { format } from "date-fns";

export const MessageGroups = () => {
  const messageGroups = useAtomValue(getMessageGroupsAtom); // mock/data.jsのdummyChatsを取得
  const setActiveMessageRoom = useSetAtom(setMessageRoomAtom);

  const handleClick = (id) => {
    setActiveMessageRoom(Number(id));
  };

  console.log("MessageGroups Rendering!");

  return (
    <div className="flex-1 overflow-x-hidden bg-purple-50">
      <ul className="list-none">
        {messageGroups.map((messageGroup) => {
          // メッセージ送信時間
          const sendTime = format(messageGroup.lastMessage.timestamp, "HH:mm");

          return (
            <li key={messageGroup.id}>
              <button
                className="flex items-center min-w-0 w-full gap-4 border-b-2 border-purple-100 p-5 hover:bg-purple-100 text-left"
                onClick={() => handleClick(messageGroup.id)}
              >
                <div className="shrink-0">
                  {messageGroup.participants.map((participant) => (
                    <img
                      className="rounded-full h-15 w-15"
                      src={participant.avatar}
                      alt={`アイコン画像${participant}`}
                      key={Number(participant.id)}
                    />
                  ))}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-bold truncate">
                      {messageGroup.name}
                    </span>
                    <span className="text-gray-500">{sendTime}</span>
                  </div>
                  <span className="truncate  w-full">
                    {messageGroup.lastMessage.content}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

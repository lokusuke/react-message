import { useSetAtom, useAtomValue } from "jotai";
import {
  messageGroupsAtom,
  setMessageRoomAtom,
} from "../../atoms/messagesAtom";
import { Avatar } from "../utils/Avatar";
import { formatSendTime } from "../common/formatSendTime";

export const MessageRoomList = () => {
  const messageGroups = useAtomValue(messageGroupsAtom); // mock/data.jsのdummyChatsを取得
  const setActiveMessageRoom = useSetAtom(setMessageRoomAtom);

  const handleClick = (id) => {
    setActiveMessageRoom(String(id));
  };

  console.log("MessageGroups Rendering!");

  return (
    <div className="flex-1 overflow-x-hidden bg-purple-50">
      <ul className="list-none">
        {messageGroups.map((messageGroup) => {
          // メッセージ送信時間
          const sendTime = formatSendTime(messageGroup.lastMessage.timestamp);

          return (
            <li key={messageGroup.id}>
              <button
                className="flex items-center min-w-0 w-full gap-4 border-b-2 border-purple-100 p-5 hover:bg-purple-100 text-left"
                onClick={() => handleClick(messageGroup.id)}
              >
                <div className="shrink-0">
                  {messageGroup.participants.map((participant) => (
                    <Avatar
                      src={participant.avatar}
                      alt={`アイコン画像${participant}`}
                      size="md"
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

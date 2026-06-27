import { useSetAtom, useAtomValue } from "jotai";
import {
  friendListAtom,
  getMessageGroupsAtom,
  setMessageRoomAtom,
} from "../atoms/loginUserAtom";

export const MessageGroups = () => {
  const messageGroups = useAtomValue(getMessageGroupsAtom); // mock/data.jsのdummyChatsを取得
  const friendList = useAtomValue(friendListAtom); // mock/data.jsのdummyUsersを取得
  const setActiveMessageRoom = useSetAtom(setMessageRoomAtom);

  // console.log(messageGroups);
  // console.log(friendList);

  const handleClick = (id) => {
    setActiveMessageRoom(id);
  };

  return (
    <div className="flex-1 overflow-x-hidden bg-purple-50">
      <ul className="list-none">
        {messageGroups.map((message) => (
          <li key={message.id}>
            <button
              className="flex items-center min-w-0 w-full gap-4 border-b-2 border-purple-100 p-5 hover:bg-purple-100 text-left"
              onClick={() => handleClick(message.id)}
            >
              <div className="shrink-0">
                <img
                  className="rounded-full h-15 w-15"
                  src={
                    friendList.find((friend) => friend.name === message.name) // findメソッドでnameが一致するアバターを取得
                      ?.avatar // Userデータからavatarプロパティ値を取得
                  }
                  alt={`アイコン画像${message.id}`}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between">
                  <span className="font-bold truncate">{message.name}</span>
                  <span className="text-gray-500">★ここに時刻</span>
                </div>
                <span className="truncate  w-full">
                  {message.lastMessage.content}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

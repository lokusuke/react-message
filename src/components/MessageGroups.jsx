import { useAtomValue } from "jotai";
import { friendListAtom, getMessageGroupsAtom } from "../atoms/loginUserAtom";

export const MessageGroups = () => {
  const messageGroups = useAtomValue(getMessageGroupsAtom); // mock/data.jsのdummyChatsを取得
  const friendList = useAtomValue(friendListAtom);

  // console.log(messageGroups);
  // console.log(friendList);

  return (
    <div className="flex-1 overflow-x-hidden bg-purple-50">
      <ul className="list-none">
        {messageGroups.map((message) => (
          <li key={message.id}>
            <div className="flex items-center gap-4 border-b-2 border-purple-100 p-5 hover:bg-purple-100">
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
              <div className="flex flex-col min-w-0">
                <span className="font-bold truncate">{message.name}</span>
                <span className="truncate">{message.lastMessage.content}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useAtomValue } from "jotai";
import { getMessagesAtom, loginUserAtom } from "../atoms/loginUserAtom";
import { format } from "date-fns";

export const MessageRoom = () => {
  // 自分のユーザー情報を取得する
  const loginUser = useAtomValue(loginUserAtom);

  // クリックされているメッセージ部屋IDからメッセージ一覧を取得する
  const activeMessages = useAtomValue(getMessagesAtom);

  return (
    <ul className="list-none mx-10 my-10 flex-1 p-5">
      {activeMessages.map((message) => {
        // （メッセージの送信者が）自分であるかどうか
        const isMe = message.sender.name === loginUser.name;

        return (
          <li key={message.id}>
            <div
              className={`
                flex gap-5 p-5 items-center text-left 
                ${isMe ? "flex-row-reverse" : "flex-row"}`}
            >
              <div>
                <img
                  src={message.sender.avatar}
                  alt={`アイコン画像 ${message.sender}`}
                  className="rounded-full h-15 w-15"
                />
              </div>
              <div
                className={`
                  flex flex-col border rounded-2xl p-2 
                  ${isMe ? "border-pink-200 bg-pink-200" : "border-green-200 bg-green-200"}`}
              >
                <div className="flex justify-between">
                  <span>{message.sender.name}</span>
                  <span className="text-gray-500">
                    {format(message.timestamp, "HH:mm")}
                  </span>
                </div>
                <span>{message.content}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

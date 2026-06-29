import { useAtomValue } from "jotai";
import { loginUserAtom } from "../atoms/loginUserAtom";
import { format } from "date-fns";

export const MessageItem = ({ message }) => {
  // 自分のユーザー情報を取得する
  const loginUser = useAtomValue(loginUserAtom);

  // （メッセージの送信者が）自分であるかどうか
  const isMe = message.sender.name === loginUser.name;

  // メッセージ送信時間
  const sendTime = format(message.timestamp, "HH:mm");

  return (
    <li>
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
          <div className="flex justify-between gap-2">
            <span>{message.sender.name}</span>
            <span className="text-gray-500">{sendTime}</span>
          </div>
          <span>{message.content}</span>
        </div>
        {isMe && (
          <div>
            <button>&#x270f;&#xfe0f;</button>
          </div>
        )}
      </div>
    </li>
  );
};

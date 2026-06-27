import { useAtomValue } from "jotai";
import { getMessagesAtom, loginUserAtom } from "../atoms/loginUserAtom";

export const MessageRoom = () => {
  // 自分のユーザー情報を取得する
  const loginUser = useAtomValue(loginUserAtom);

  // クリックされているメッセージ部屋IDからメッセージ一覧を取得する
  const activeMessages = useAtomValue(getMessagesAtom);

  // console.log(activeMessageRoomId);
  // console.log(activeMessages);

  return (
    <ul className="list-none mx-10 my-10 flex-1">
      {activeMessages.map((message) =>
        message.sender.name === loginUser.name ? (
          <li key={message.id}>
            <div className="flex gap-5 p-5 items-center text-left">
              <div className="flex flex-col border border-green-300 bg-green-300 p-2 rounded-2xl">
                <div className="flex justify-between">
                  <span>{message.sender.name}</span>
                  <span className="text-gray-500">★ここに時刻</span>
                </div>
                <span>{message.content}</span>
              </div>
              <div>
                <img
                  src={message.sender.avatar}
                  alt={`アイコン画像 ${message.sender}`}
                  className="rounded-full h-15 w-15"
                />
              </div>
            </div>
          </li>
        ) : (
          <li key={message.id}>
            <div className="flex gap-5 p-5 items-center text-left">
              <div>
                <img
                  src={message.sender.avatar}
                  alt={`アイコン画像 ${message.sender}`}
                  className="rounded-full h-15 w-15"
                />
              </div>
              <div className="flex flex-col border border-green-300 bg-green-300 p-2 rounded-2xl">
                <div className="flex justify-between">
                  <span>{message.sender.name}</span>
                  <span className="text-gray-500">★ここに時刻</span>
                </div>
                <span>{message.content}</span>
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

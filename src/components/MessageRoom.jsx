import { useAtomValue, useSetAtom } from "jotai";
import {
  appendMessageAtom,
  getMessagesAtom,
  getParticipants,
  loginUserAtom,
  messageRoomAtom,
} from "../atoms/loginUserAtom";
import { format } from "date-fns";
import { useRef } from "react";

export const MessageRoom = () => {
  // 入力フォーム用
  const inputRef = useRef(null);

  // 自分のユーザー情報を取得する
  const loginUser = useAtomValue(loginUserAtom);

  // メッセージ部屋の参加者情報を取得する
  const participantsInfo = useAtomValue(getParticipants);

  // メッセージ部屋IDを取得する
  const activeRoomId = useAtomValue(messageRoomAtom);

  // メッセージ追加関数Atomを利用する
  const appendMessage = useSetAtom(appendMessageAtom);

  // 参加者情報から名前を連結する（タイトル用）
  const messageRoomTitle = participantsInfo
    .map((participantInfo) => participantInfo.name)
    .join(", ");

  // 参加者人数によって、ヘッダー表示を「個人チャット」または「グループチャット」とする条件を定義
  const isGroup = participantsInfo.length > 1;

  // クリックされているメッセージ部屋IDからメッセージ一覧を取得する
  const activeMessages = useAtomValue(getMessagesAtom);

  // チャット送信ボタン押下時にメッセージを追加する関数
  const handleSubmit = (e) => {
    e.preventDefault(); // formの仕様によるリロードを回避

    const trimmedText = inputRef.current.value.trim();

    if (!trimmedText) {
      alert("空欄では送信できません。");
      return;
    }

    appendMessage(activeRoomId, trimmedText);
    inputRef.current.value = ""; // 入力フォームをリセット
  };

  console.log("MessageRoom Rendering!");
  console.log(activeMessages);

  return (
    <div className="flex flex-col h-screen w-full">
      <header className="border-b-2 border-purple-100 flex flex-col h-30 items-start justify-center p-2 shadow-md">
        <h2 className="font-extrabold">{messageRoomTitle}</h2>
        <span className="text-gray-500">
          {isGroup ? "グループチャット" : "個人チャット"}
        </span>
      </header>
      <ul className="list-none mx-10 flex-1 p-5 overflow-y-scroll">
        {activeMessages.map((message) => {
          // （メッセージの送信者が）自分であるかどうか
          const isMe = message.sender.name === loginUser.name;

          // メッセージ送信時間
          const sendTime = format(message.timestamp, "HH:mm");

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
                  <div className="flex justify-between gap-2">
                    <span>{message.sender.name}</span>
                    <span className="text-gray-500">{sendTime}</span>
                  </div>
                  <span>{message.content}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <form
        className="flex gap-2 h-10 mx-2 items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border border-gray-200 rounded-lg p-1 shadow-md w-full"
          ref={inputRef}
        />
        <div className="rounded-full border-0 hover:bg-sky-500">
          <button type="submit" className="p-2">
            &#x2708;&#xfe0f;
          </button>
        </div>
      </form>
    </div>
  );
};

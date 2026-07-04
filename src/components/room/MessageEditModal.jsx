import { useAtomValue, useSetAtom } from "jotai";
import {
  activeRoomIdAtom,
  setEditingMessageAtom,
  updateMessageAtom,
} from "../../atoms/messagesAtom";
import { useRef } from "react";

export const MessageEditModal = ({ editingMessage }) => {
  // textareaの入力値の取得用
  const textareaRef = useRef(null);

  // メッセージ部屋IDを取得する
  const activeRoomId = useAtomValue(activeRoomIdAtom);

  // キャンセル時にeditingMessageを空にする用
  const setEditingMessage = useSetAtom(setEditingMessageAtom);

  // 送信時にメッセージを更新する関数
  const updateMessage = useSetAtom(updateMessageAtom);

  // 送信時のハンドラー
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = textareaRef.current.value.trim();

    if (!trimmedText) {
      alert("空欄のまま送信はできません");
      return;
    }
    updateMessage(activeRoomId, editingMessage.id, trimmedText);
    setEditingMessage(null);
  };
  return (
    <div className="flex fixed inset-0 items-center justify-center bg-black/50 z-999">
      <div className="bg-purple-100 flex flex-col rounded-2xl p-2 items-stretch w-120 m-10">
        <div className="flex p-2">
          <img
            className="rounded-full h-10 w-10"
            src={editingMessage.sender.avatar}
            alt={editingMessage.sender.name}
          />
          <p className="font-sans m-2 pb-1 text-sm  text-gray-700">
            &#x270f;&#xfe0f;メッセージを編集中...
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center"
        >
          <textarea
            ref={textareaRef}
            type="text"
            className="border border-gray-200 bg-white focus:outline-purple-400 p-5 rounded-lg resize-none  text-sm w-full"
            defaultValue={editingMessage.content}
          />
          <div className="flex gap-5 mt-2 justify-end w-full">
            <button
              type="submit"
              className="border-0 border-sky-300 bg-sky-300 hover:bg-sky-400 p-2 rounded-2xl shadow-md text-white w-fit"
            >
              送信
            </button>
            <button
              type="button"
              onClick={() => setEditingMessage(null)}
              className="border-0 border-red-300 bg-red-300 hover:bg-red-400 p-2 rounded-2xl shadow-md text-white w-fit"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

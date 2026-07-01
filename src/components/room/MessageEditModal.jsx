import { useAtomValue, useSetAtom } from "jotai";
import {
  messageRoomAtom,
  setEditingMessageAtom,
  updateMessageAtom,
} from "../../atoms/loginUserAtom";
import { useRef } from "react";

export const MessageEditModal = ({ editingMessage }) => {
  // textareaの入力値の取得用
  const textareaRef = useRef(null);

  // メッセージ部屋IDを取得する
  const activeRoomId = useAtomValue(messageRoomAtom);

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
      <div className="bg-purple-200 flex flex-col rounded-4xl p-2 items-stretch w-120 m-10">
        <p className="font-semibold font-sans m-2 pb-1 text-xl  ">
          メッセージを編集
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center"
        >
          <textarea
            ref={textareaRef}
            type="text"
            className="border border-gray-200 bg-white focus:outline-purple-400 p-5 rounded-lg resize-none shadow-md text-sm w-full"
            defaultValue={editingMessage.content}
          />
          <div className="flex gap-5 mt-2 justify-end w-full">
            <button
              type="submit"
              className="border-0 border-sky-500 bg-sky-500 hover:bg-sky-600 p-2 rounded-2xl shadow-md text-white w-fit"
            >
              送信
            </button>
            <button
              type="button"
              onClick={() => setEditingMessage(null)}
              className="border-0 border-red-500 bg-red-500 hover:bg-red-600 p-2 rounded-2xl shadow-md text-white w-fit"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

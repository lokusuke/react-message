import { useAtomValue, useSetAtom } from "jotai";
import {
  deleteMessageAtom,
  messageRoomAtom,
  setDeletingMessageAtom,
} from "../../atoms/loginUserAtom";

export const MessageDeleteModal = ({ deletingMessage }) => {
  // メッセージ部屋IDを取得する
  const activeRoomId = useAtomValue(messageRoomAtom);

  // キャンセル時にdeletingMessageを空にする用
  const setDeletingMessage = useSetAtom(setDeletingMessageAtom);

  // 送信時にメッセージを更新する関数
  const deleteMessage = useSetAtom(deleteMessageAtom);

  // 削除ボタンを押したときに実行する関数
  const handleDelete = () => {
    deleteMessage(activeRoomId, deletingMessage);
    setDeletingMessage(null);
  };

  return (
    <div className="flex fixed inset-0 items-center justify-center bg-black/50 z-999">
      <div className="bg-purple-100 flex flex-col rounded-2xl p-2  w-100 m-10">
        <div className="flex gap-2 p-2 items-center justify-center">
          <img
            className="rounded-full h-10 w-10"
            src={deletingMessage.sender.avatar}
            alt={deletingMessage.sender.name}
          />
          <span className="border border-gray-300 bg-gray-300 p-2 rounded-2xl">
            {deletingMessage.content}
          </span>
        </div>
        <p className="font-sans m-2 pb-1 text-sm  text-gray-700 text-center">
          このメッセージを削除します。よろしいでしょうか？
        </p>
        <div className="flex gap-5 mt-2 justify-end w-full">
          <button
            type="button"
            onClick={handleDelete}
            className="border-0 border-red-300 bg-red-300 hover:bg-red-400 p-2 rounded-2xl shadow-md text-white w-fit"
          >
            削除
          </button>
          <button
            type="button"
            onClick={() => setDeletingMessage(null)}
            className="border-0 border-gray-300 bg-gray-300 hover:bg-gray-400 p-2 rounded-2xl shadow-md text-white w-fit"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};
